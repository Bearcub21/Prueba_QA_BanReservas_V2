import { test, expect } from '@playwright/test';
import { LibraryClient } from '../../src/clients/libraryClient';
import { createBook, buildBookId } from '../../src/data/bookFactory';
import { expectJsonKeys, expectResponseTimeLessThan, expectStatus } from '../../src/helpers/assertions';
import { deleteBookResponseSchema, notFoundResponseSchema } from '../../src/helpers/schemaValidators';

test.describe('DeleteBook API', () => {
  test('debe eliminar un libro existente', async ({ request }) => {
    const client = new LibraryClient(request);
    const book = createBook();

    await client.addBook(book);
    const id = buildBookId(book);

    const startTime = Date.now();
    const response = await client.deleteBook({ ID: id });
    const body = await response.json();

    await expectStatus(response, 200);
    await expectResponseTimeLessThan(startTime, 500);
    await expectJsonKeys(body, ['msg']);

    const parsed = deleteBookResponseSchema.parse(body);
    expect(parsed.msg.toLowerCase()).toContain('successfully deleted');
  });

  test('debe fallar al eliminar un libro no existente', async ({ request }) => {
    const client = new LibraryClient(request);
    const fakeId = `notfound${Date.now()}`;

    const startTime = Date.now();
    const response = await client.deleteBook({ ID: fakeId });
    const body = await response.json();

    await expectStatus(response, 404);
    await expectResponseTimeLessThan(startTime, 500);

    const parsed = notFoundResponseSchema.parse(body);
    expect(parsed.msg.toLowerCase()).toContain('doesnt exists');
  });
});