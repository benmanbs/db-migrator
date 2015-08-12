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

var Command = function() {
    this.initialize.apply(this, arguments);
};

/**
 * No default initialize implementation, but allow the option for
 * implementations to have their own init calls.
 */
Command.prototype.initialize = function() {};

/**
 * This must be overridden by the implementor.
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