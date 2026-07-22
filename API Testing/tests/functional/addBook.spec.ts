import { test, expect } from '@playwright/test';
import { LibraryClient } from '../../src/clients/libraryClient';
import { createBook, buildBookId } from '../../src/data/bookFactory';
import { expectJsonKeys, expectResponseTimeLessThan, expectStatus } from '../../src/helpers/assertions';
import { addBookResponseSchema } from '../../src/helpers/schemaValidators';

test.describe('AddBook API', () => {
  test('debe agregar un libro correctamente', async ({ request }) => {

    const client = new LibraryClient(request);
    const book = createBook();


    const startTime = Date.now();
    const response = await client.addBook(book);
    const body = await response.json();


    await expectStatus(response, 200);
    await expectResponseTimeLessThan(startTime, 500);
    await expectJsonKeys(body, ['Msg', 'ID']);

    const parsed = addBookResponseSchema.parse(body);

    expect(parsed.Msg).toContain('successfully added');
    expect(parsed.ID).toBe(buildBookId(book));

  });

  test('debe fallar al enviar aisle no numérico', async ({ request }) => {
    const client = new LibraryClient(request);
    const book = createBook({ aisle: 'abc' });

    const response = await client.addBook(book);

    expect(response.status()).toBe(500);
  });
});
