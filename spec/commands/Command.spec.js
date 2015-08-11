/**
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

var Command = require('../../src/commands/Command');
var _ = require('underscore');

describe('Command', function() {

    it('provides a Constructor', function() {
        expect(Command).to.be.a('function');
    });

    describe('when instantiated directly', function() {
        var command;

        beforeEach(function () {
            command = new Command();
        });

        it('errors on "run"', function () {
            var bound = _.bind(command.run, command);
            expect(bound).to.throw(Error);
        });

    });

    describe('when extended', function() {
        var command, MyCommand;

        beforeEach(function () {
            MyCommand = Command.extend({
                run: function() {
                    return "Hey! This ran!";
                }
            });
            command = new MyCommand();
        });

        it("doesn't error on 'run'", function () {
            expect(command.run()).to.equal("Hey! This ran!");
        });

    });
});