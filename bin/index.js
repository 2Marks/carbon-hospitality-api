/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const { program } = require('commander');
const chalk = require('chalk');
const { seedHandler } = require('./dbOperations');

function promiser(fn, args) {
  return fn(args)
    .then(res => console.log(chalk.green(res)))
    .catch(err => console.log(chalk.red(err)))
    .finally(process.exit);
}

program
  .command('db:seed <fileName>')
  .description('seed a file')
  .action(fileName => promiser(seedHandler, fileName));

program.parse(process.argv);
