import { test, expect } from '@playwright/test';
import { LibraryClient } from '../../src/clients/libraryClient';
import { createBook, buildBookId } from '../../src/data/bookFactory';
import { expectJsonKeys, expectResponseTimeLessThan, expectStatus } from '../../src/helpers/assertions';
import { getBookResponseSchema, notFoundResponseSchema } from '../../src/helpers/schemaValidators';

test.describe('GetBook API', () => {
  test('debe obtener un libro existente', async ({ request }) => {
    const client = new LibraryClient(request);
    const book = createBook();

    await client.addBook(book);
    const id = buildBookId(book);

    const startTime = Date.now();
    const response = await client.getBookById(id);
    const body = await response.json();

    await expectStatus(response, 200);
    await expectResponseTimeLessThan(startTime, 500);
    await expectJsonKeys(body, ['book_name', 'isbn', 'aisle', 'author']);

    const parsed = getBookResponseSchema.parse(body);

    expect(parsed[0].book_name).toBe(book.name);
    expect(parsed[0].isbn).toBe(book.isbn);
    expect(parsed[0].aisle).toBe(book.aisle);
    expect(parsed[0].author).toBe(book.author);
  });

  test('debe responder correctamente para un libro no existente', async ({ request }) => {
    const client = new LibraryClient(request);
    const fakeId = `notfound${Date.now()}`;

    const startTime = Date.now();
    const response = await client.getBookById(fakeId);
    const body = await response.json();

    await expectStatus(response, 404);
    await expectResponseTimeLessThan(startTime, 500);

    const parsed = notFoundResponseSchema.parse(body);
    expect(parsed.msg.toLowerCase()).toContain('does not exists');
  });
});