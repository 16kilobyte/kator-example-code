import fs from 'fs';
import { getManager } from 'typeorm';
import { Book } from './entities/Book';

export const getFileList = async (path: string) => {
    const files = await fs.promises.readdir(path);
    return files;
};

export const saveBook = async (book?: Book) => {
  if (!book) return;
  const bookRepository = getManager().getRepository(Book);
  await bookRepository.save(book);
};
