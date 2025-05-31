import { Command } from './interface.js';
import chalk from 'chalk';

export default class HelpCommand implements Command {
  private static readonly DESCRIPTION = 'Программа для подготовки данных для REST API сервера.';
  private static readonly USAGE = 'cli [options]';
  private static readonly HEADER = `\nИспользование: ${chalk.bold(HelpCommand.USAGE)}\nОпции:`;
  private static readonly OPTIONS = [
    {
      flag: '--version',
      color: chalk.green,
      description: 'вывод номер версии',
    },
    {
      flag: '--import <filename> <database host> <login> <password> <port> <dbname> <salt>',
      color: chalk.yellow,
      description: 'импортирует данные из TSV',
    },
    {
      flag: '--generate <n> <filepath> <url>',
      color: chalk.magenta,
      description: 'генерирует произвольное количество тестовых данных',
    },
    {
      flag: '--help',
      color: chalk.cyan,
      description: 'отобразить справку',
    },
  ];

  public getName(): string {
    return '--help';
  }


  public execute(_parameters: string[]) {
    console.log(chalk.bold.blue(HelpCommand.DESCRIPTION));
    console.log(chalk.white(HelpCommand.HEADER));
    HelpCommand.OPTIONS.forEach((option) => {
      console.log(`  ${option.color(option.flag)} ${chalk.gray(option.description)}`);
    });
    console.log();
  }
}
