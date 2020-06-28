#!/usr/bin/env node

import clear from 'clear';
import program from 'commander';

import { parseRdfFile } from './services/extractor';
import { getFileList, saveBook } from './utils';
import { connection } from './connection';

clear();
console.log('metadata-extractor');

program
  .version('0.0.1')
  .description('An example CLI for indexing the Gutenberg project RDF files')
  .option('-i, --index [directory]', 'Root directory of the unzipped files downloaded from http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2')
  .parse(process.argv);

if (program.index) {
 connection()
  .then(async () => {
    const files = await getFileList(program.index);
    for (let i = 0; i < files.length; i++) {
      try {
        const book = await parseRdfFile(`${program.index}${files[i]}/pg${files[i]}.rdf`);
        await saveBook(book);
      } catch (error) {
        console.log(error);
      }
    }
  })
  .catch(console.error);
}
