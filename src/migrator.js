/**
 * This is the entry point for the database migrator.
 *
 * Run migrator help for more help.
 *
 * @author Benjamin Shai date 8/11/15.
 */

'use strict';

try {
    // Requirements
    var yargs = require('yargs');
    var commander = require('./commander');
    var _ = require('underscore');
} catch (err) {
    console.log("Hmm... seems we can't start up.  Try running 'npm install' migrator directory");
    process.exit(1);
}

var argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('setup', 'Set up a migrator for an existing database')
    .command('update', 'Bring a database up to date')
    .command('integration', 'Bring integration test databases up to date')
    .option('host', {
        alias: 'h',
        demand: false,
        describe: 'The host to migrate to',
        default: 'localhost'
    })
    .option('database', {
        alias: 'd',
        demand: false,
        describe: 'The database to migrate'
    })
    .option('user', {
        alias: 'u',
        demand: false,
        describe: 'The user to log in to the database with',
        default: 'root'
    })
    .option('password', {
        alias: 'w',
        demand: false,
        describe: 'The password to log in to the database with',
        default: ''
    })
    .option('port', {
        alias: 'p',
        demand: false,
        describe: 'The port to use',
        default: 3306
    })
    .option('root', {
        alias: 'r',
        demand: false,
        describe: 'The root directory the migrations live in',
        default: process.cwd()
    })
    .argv;

if (!argv._ || !argv._.length || !commander.isValid(argv._[0])) {
    console.log("Missing or invalid command. \n\n" + yargs.help());
    process.exit(1);
}

if (!argv.d) {
    console.log("Missing argument '-d'. \n\n" + yargs.help());
    process.exit(1);
}

try {
    var Command = commander.getCommand(argv._[0]);
    new Command(_.omit(argv, '_', '$0')).run();
    process.exit(0);
} catch (err) {
    console.log('Sorry -- an error occurred');
    console.log(err.toString());
    process.exit(1);
}