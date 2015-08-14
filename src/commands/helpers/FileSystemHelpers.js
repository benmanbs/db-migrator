/**
 * A series of utilities to read/write to the file system.
 *
 * @author bshai date 8/14/15.
 */

var mkdirp = require('mkdirp');
var when = require('when');
var fs = require('fs');

var FileSystemHelpers = {

    createTableFolder: function(root, database, row) {
        return when.promise(function(resolve, reject) {
            mkdirp(root + '/' + database + '/' + row, function (err) {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    },

    createScriptFile: function(root, database, scriptName, createScript) {
        return when.promise(function(resolve, reject) {
            fs.writeFile(root + '/' + database + '/' + scriptName, createScript, function (err) {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

};

module.exports = FileSystemHelpers;
