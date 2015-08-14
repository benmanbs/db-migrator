/**
 * A helper class for mysql related stuff.
 *
 * @author bshai date 8/14/15.
 */

var when = require('when');

var MysqlHelpers = {

    /**
     * Since we want to do everything as a promise, this utility will turn a sql query
     * into a promise.
     *
     * @param connection
     * @param query
     * @returns {*}
     */
    convertQueryToPromise: function(connection, query) {
        return when.promise(function(resolve, reject) {
            connection.query(query, function(err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
};

module.exports = MysqlHelpers;