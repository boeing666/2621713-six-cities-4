#!/usr/bin/env node

import 'reflect-metadata';
import { CliApplication } from './cli/index.js';

(async () => {
  const cli = new CliApplication();
  const commands = await cli.loadCommands();

  cli.registerCommands(commands);
  cli.processCommand(process.argv);
})();
