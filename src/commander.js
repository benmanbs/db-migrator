/**
 * This class registers the commands that can be used by the migrator.
 *
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

var registeredCommands = {
    setup : require('./commands/SetupCommand'),
    update : require('./commands/UpdateCommand'),
    integration : require('./commands/IntegrationCommand')
};

var getCommand = function(command) {
    return registeredCommands[command];
};

var isValid = function(command) {
    return !!getCommand(command);
};

module.exports = {
    getCommand: getCommand,
    isValid: isValid
};