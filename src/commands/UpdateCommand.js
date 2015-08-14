/**
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

// TODO flesh this out

// libs
var when = require('when');

// locals
var Command = require('./Command');

var UpdateCommand = Command.extend({
    run: function() {
        return when.promise(null);
    }
});

module.exports = UpdateCommand;