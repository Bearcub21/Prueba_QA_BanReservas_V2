import { test, expect } from '@playwright/test';
import { BooksPage } from '../pages/BooksPage';
import { loadTestData, normalize } from '../utils/helpers';

const data = loadTestData();

test.describe('Books search flow', () => {
  test('Search with an existing keyword', async ({ page }) => {
    const booksPage = new BooksPage(page);
    await booksPage.navigate();
    await booksPage.search(data.existing_keyword);

    const titles = await booksPage.getResultTitles();
    expect(titles.length).toBeGreaterThan(0);
    expect(titles.every((title) => normalize(title).includes(normalize(data.existing_keyword)))).toBe(true);
  });

  test('Search with a non-existing keyword', async ({ page }) => {
    const booksPage = new BooksPage(page);
    await booksPage.navigate();
    await booksPage.search(data.non_existing_keyword);

    const titles = await booksPage.getResultTitles();
    expect(titles.length).toBe(0);
    expect(await booksPage.hasNoResults()).toBe(true);
  });
});
