#!/usr/bin/env node

import clear from 'clear';
import program from 'commander';
clear();
console.log('metadata-extractor');

program
  .version('0.0.1')
  .description('An example CLI for indexing the Gutenberg project RDF files')
  .option('-i, --index [directory]', 'Root directory of the unzipped files downloaded from http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2')
  .parse(process.argv);

if (program.index) {
  // Do something
}
