import xml2js from 'xml2js';
import fs from 'fs';

import { Book } from '../entities';

const parser = new xml2js.Parser();

export const parseRdfFile = async (rdfPath: string) => {
    const rdfString = await fs.promises.readFile(rdfPath);
    const rootNode = await parser.parseStringPromise(rdfString);
    const ebookData = rootNode['rdf:RDF']['pgterms:ebook'][0];
    if (ebookData) {
      const id = extractBookID(ebookData.$);
      const title = extractTitle(ebookData['dcterms:title']);
      if (id && title) {
        const subjects = extractSubjects(ebookData['dcterms:subject']);
        const licenseRights = extractLicenseRights(ebookData['dcterms:rights']);
        const language = extractLanguage(ebookData['dcterms:language']);
        const authors = extractAuthors(ebookData['dcterms:creator']);
        const publicationDate = extractPublishedDate(ebookData['dcterms:issued']);

        const book = new Book();
        book.id = +id;
        book.title = title;
        book.authors = authors;
        book.language = language;
        book.publicationDate = publicationDate;
        book.licenseRights = licenseRights;
        book.subjects = subjects;
        return book;
      }
    }

    return undefined;
};

export const extractBookID = (aboutNode: any) => {
  try {
    return aboutNode['rdf:about'].split('/')[1];
  } catch (error) {
    return undefined;
  }
};

export const extractTitle = (titleNode: any) => {
  if (!Array.isArray(titleNode)) return undefined;
  return titleNode[0];
};

export const extractSubjects = (subjectNode: any) => {
  if (!Array.isArray(subjectNode)) return undefined;

  return subjectNode.map(
    (subject: any): string => subject['rdf:Description'][0]['rdf:value'][0]
  );
};

export const extractAuthors = (creatorNode: any) => {
  if (!Array.isArray(creatorNode)) return undefined;

  return creatorNode.map(
    (author: any): string => author['pgterms:agent'][0]['pgterms:name'][0]
  );
};

// Even cleaner wrapping in a try/catch block?
export const extractPublishedDate = (issuedDate: any) => {
  try {
    const dateString = issuedDate[0]._;
    return new Date(dateString);
  } catch (error) {
    return undefined;
  }
};

export const extractLicenseRights = (licenseRightsNode?: string[]) => {
  if (!Array.isArray(licenseRightsNode)) return undefined;

  return licenseRightsNode[0];
};

export const extractLanguage = (languageNode: any) => {
  if (!Array.isArray(languageNode)) return undefined;

  const descriptionNode = languageNode[0]['rdf:Description'];
  if (!Array(descriptionNode)) return undefined;

  return descriptionNode[0]['rdf:value'][0]._;
};
