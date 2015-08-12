/**
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

var commander = require('../../src/commander');

describe('commander', function() {

    it('says valid commands are valid', function() {
        expect(commander.isValid("setup")).to.equal(true);
        expect(commander.isValid("update")).to.equal(true);
        expect(commander.isValid("integration")).to.equal(true);
    });

    it('says invalid commands are invalid', function() {
        expect(commander.isValid("blarg")).to.equal(false);
        expect(commander.isValid("")).to.equal(false);
        expect(commander.isValid(undefined)).to.equal(false);
    });

    it('has the correct associated commands', function() {
        expect(commander.getCommand("setup")).to.equal(require('../../src/commands/SetupCommand'));
        expect(commander.getCommand("update")).to.equal(require('../../src/commands/UpdateCommand'));
        expect(commander.getCommand("integration")).to.equal(require('../../src/commands/IntegrationCommand'));
    });
});