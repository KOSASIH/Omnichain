import { Command } from 'commander';
import { deploy } from './commands/deploy';
import { query } from './commands/query';

const program = new Command();

program
  .version('1.0.0')
  .description('Omnichain CLI');

program
  .command('deploy <contract>')
  .description('Deploy a contract to the Omnichain network')
  .action(deploy);

program
  .command('query <contract> <function>')
  .description('Query a contract on the Omnichain network')
  .action(query);

program.parse(process.argv);
