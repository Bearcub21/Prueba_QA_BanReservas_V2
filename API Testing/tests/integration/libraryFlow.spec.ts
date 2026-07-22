import { test, expect } from '@playwright/test';
import { LibraryClient } from '../../src/clients/libraryClient';
import { createBook, buildBookId } from '../../src/data/bookFactory';

test.describe('Flujo integral Library API', () => {
  test('debe crear, consultar, eliminar y validar no existencia de 2 libros', async ({ request }) => {
    const client = new LibraryClient(request);

    const book1 = createBook({ name: 'Libro Integrado 1' });
    const book2 = createBook({ name: 'Libro Integrado 2' });

    const books = [book1, book2];

    for (const book of books) {
      const addResponse = await client.addBook(book);
      expect(addResponse.status()).toBe(200);

      const addBody = await addResponse.json();
      expect(addBody.ID).toBe(buildBookId(book));
    }

    for (const book of books) {
      const id = buildBookId(book);
      const getResponse = await client.getBookById(id);

      expect(getResponse.status()).toBe(200);

      const getBody = await getResponse.json();
      expect(getBody[0].book_name).toBe(book.name);
      expect(getBody[0].isbn).toBe(book.isbn);
      expect(getBody[0].aisle).toBe(book.aisle);
      expect(getBody[0].author).toBe(book.author);
    }

    for (const book of books) {
      const id = buildBookId(book);
      const deleteResponse = await client.deleteBook({ ID: id });

      expect(deleteResponse.status()).toBe(200);

      const deleteBody = await deleteResponse.json();
      expect(deleteBody.msg.toLowerCase()).toContain('successfully deleted');
    }

    for (const book of books) {
      const id = buildBookId(book);
      const getResponse = await client.getBookById(id);

      expect(getResponse.status()).toBe(404);

      const getBody = await getResponse.json();
      expect(getBody.msg.toLowerCase()).toContain('does not exists');
    }
  });
});