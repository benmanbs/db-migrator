/**
 * A series of helpers around the migration database.
 *
 * @author bshai date 8/12/15.
 */

var mysqlHelpers = require('./MysqlHelpers');

var MigrationDatabseHelpers = {

    MIGRATION_TABLE: 'migration_versions',
    MIGRATION_TABLE_CREATE:
      "CREATE TABLE migration_versions ( " +
        "table_name VARCHAR(64) NOT NULL, " +
        "version INT NOT NULL DEFAULT 1, " +
        "PRIMARY KEY (table_name));",

    tableExists: function(connection) {
        return mysqlHelpers.convertQueryToPromise(connection, "SHOW TABLES LIKE '" + this.MIGRATION_TABLE + "'")
            .then(function(rows) {
                return !!rows.length;
            });
    },

    createMigrationTable: function(connection) {
        return mysqlHelpers.convertQueryToPromise(connection, this.MIGRATION_TABLE_CREATE);
    },

    insertMigrationVersion: function(connection, table, version) {
        var query = "INSERT INTO " + this.MIGRATION_TABLE + " (table_name" + (version ? ", version" : "") + ") VALUES ('" + table + (version ? "', '" + version : "") +"')";
        return mysqlHelpers.convertQueryToPromise(connection, query);
    }

};

module.exports = MigrationDatabseHelpers;