import { getManager } from 'typeorm';
import { Book } from './entities/Book';
export const saveBook = async (book?: Book) => {
  if (!book) return;
  const bookRepository = getManager().getRepository(Book);
  await bookRepository.save(book);
};
