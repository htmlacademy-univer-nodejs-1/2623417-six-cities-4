import { Command } from './command.interface.js';
import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  public execute(...params: string[]): void {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const resultArray = fileReader.toArray();
      console.log(chalk.red(JSON.stringify(resultArray, null, 2)));
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error('Failed to import the file');
      console.error(`Error: ${error.message}`);
    }
  }
}
