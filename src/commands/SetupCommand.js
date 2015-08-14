/**
 * This command sets up database for use with the migrator.
 *
 * It will first check for the presence of a migration table. (If it has one,
 * it will defer to the update command).
 *
 * It then will call SHOW CREATE TABLE on every table in the database, and generate
 * a migration file from it.
 *
 * At the end of the command run, there will be a version 1 sql file for every table
 * in the database. These will be stored in the user provided root directory. There
 * will also be a migration table that records that every table is on version 1.
 *
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

// libs
var when = require('when');
var _ = require('underscore');

// locals
var Command = require('./Command');
var UpdateCommand = require('./UpdateCommand');

//helpers
var migrationHelpers = require('./helpers/MigrationDatabaseHelpers');
var mysqlHelpers = require('./helpers/MysqlHelpers');
var fileSystemHelpers = require('./helpers/FileSystemHelpers');

var SetupCommand = Command.extend({

    /**
     * Runs the command.
     *
     * @returns Promise that resolves if it succeeds.
     */
    run: function() {
        var self = this;
        return when.promise(function(resolve, reject) {
            // Make sure the connection worked
            self.connection.connect(function(err) {
                if (err) {
                    reject("Cannot connect to database. \n \n " + err);
                }
                console.log('Connected to database.');
                resolve();
            });
        }).then(function() {
            console.log('Checking if migration table already exist...');
            // Check if the migration table exists
            return migrationHelpers.tableExists(self.connection);
        }).then(function(exists) {
            if (exists) {
                console.log('Migration table already exists. \nDeferring to UpdateCommand.');
                return new UpdateCommand({connection: self.connection}).run();
            }
            else {
                console.log('Migration table does not exist');
                return self._setup();
            }
        });
    },

    /**
     * This method is pretty wild. It will first check that the
     * desired output location exists. It will then call show tables
     * for the given database, and script all of those to files.
     * Finally, it will add a migration database and fill it.
     *
     * @returns Promise that resolves if it succeeds.
     * @private
     */
    _setup: function() {
        var self = this;

        console.log('Creating migration table.');
        return migrationHelpers.createMigrationTable(self.connection)
            .then(function () {
                console.log('Getting list of tables in database to write migrations for.');
                return mysqlHelpers.convertQueryToPromise(self.connection, "show tables;");
            }).then(function (rows) {
                console.log('Parsing list of tables');
                return self._createMigrations(rows);
            });
    },

    /**
     * This is in its own method because it has some nasty promise munging.
     *
     * You'll see when you read the code.
     *
     * Go ahead, read it. It won't bite.
     *
     * @param rows
     * @private
     */
    _createMigrations: function(rows) {
        var self = this;

        // Since every row will have some async shit, it needs to be a when.all
        return when.all(
            _.map(rows, function(row) {
                // This looks a little funny. Since SHOW TABLES in sql returns them in a column with
                // the name "Tables_in_[database]", and since our database can change, let's turn
                // the object into an array of values (there should only be one) and take the first
                // (and only) value.
                row = _.first(_.values(row));
                console.log('Creating directory for table ' + row + '.');
                return fileSystemHelpers.createTableFolder(self.root, self.database, row)
                    .then(function() {
                        console.log('Getting create table script for table.');
                        return mysqlHelpers.convertQueryToPromise(self.connection, "SHOW CREATE TABLE " + row);
                    }).then(function(createScript) {
                        var scriptName = row + '/' + row + '.1.sql';
                        createScript = createScript[0]['Create Table'];
                        console.log('Writing create script to file called ' + scriptName);
                        return fileSystemHelpers.createScriptFile(self.root, self.database, scriptName, createScript);
                    }).then(function() {
                        console.log('Filling migration table with version for table.');
                        return migrationHelpers.insertMigrationVersion(self.connection, row);
                    });
            })
        );
    }
});

module.exports = SetupCommand;