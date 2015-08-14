/**
 * This is the rough skeleton of what a command should look like.
 *
 * If you come from a traditional Object Oriented background, think
 * of this as an abstract class.
 *
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

var Extend = require('backbone-helpers').extend;
var mysql = require('mysql');

var Command = function() {
    this.initialize.apply(this, arguments);
};

/**
 * Default implementation starts up a mysql connection.
 */
Command.prototype.initialize = function(options) {
    options = options || {};

    // Create the mysql connection if it's not passed in
    this.connection = options.connection || mysql.createConnection({
        host     : options.host,
        user     : options.user,
        password : options.password,
        database : options.database
    });

    this.root = options.root;
    this.database = options.database;
};

/**
 * This must be overridden by the implementor.
 *
 * As an aside, the implementation must return a promise.
 */
Command.prototype.run = function() {
    throw new Error("Class extending Command must override the run method.");
};

/**
 * Make sure we can do a pseudo-abstract class type of syntax. (Borrowed from
 * Backbone).
 *
 * @type {*|function(): child|exports}
 */
Command.extend = Extend;

module.exports = Command;