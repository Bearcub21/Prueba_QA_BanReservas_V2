import { AddBookRequest } from '../types/bookTypes';

export function createBook(overrides?: Partial<AddBookRequest>): AddBookRequest {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    name: `Libro QA ${unique}`,
    isbn: `isbn${unique.slice(-6)}`,
    aisle: `${Math.floor(Math.random() * 9000) + 1000}`,
    author: 'Manuel Peña',
    ...overrides
  };
}

export function buildBookId(book: AddBookRequest): string {
  return `${book.isbn}${book.aisle}`;
}