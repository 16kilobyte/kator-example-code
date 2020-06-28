import path from 'path';
import { expect } from 'chai';
import { parseRdfFile } from '../../src/services/extractor';
import 'mocha';

describe('Parse RDF service', () => {
  it('should parse sample rdf file correctly', async () => {
    const book = await parseRdfFile(
      path.join(__dirname, '../rdf-files/pg3.rdf'),
    );
    expect(book).to.be.an('object');
    expect(book.id).to.equal(3);
    expect(book.title).to.equal('John F. Kennedy\'s Inaugural Address');
    expect(book.language).to.equal('en');
    expect(book.publicationDate?.valueOf()).to.equal(new Date('1973-11-01').valueOf());
    expect(book.licenseRights).to.equal('Public domain in the USA.');
    expect(book.subjects).to.have.members([
      'Presidents -- United States -- Inaugural addresses',
      'United States -- Foreign relations -- 1961-1963',
      'E838',
    ]);
  });

  it('should return undefined for book without title', async () => {
    const book = await parseRdfFile(
      path.join(__dirname, '../rdf-files/pg4.rdf'),
    );
    expect(book).to.be.undefined;
  });
});
