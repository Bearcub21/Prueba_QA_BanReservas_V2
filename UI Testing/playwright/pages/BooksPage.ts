import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BooksPage extends BasePage {
  private readonly searchInput = '#searchBox';
  private readonly resultTitleLinks = 'table tbody tr td:nth-child(2) a';
  private readonly noResultsMessage = 'text=No rows found';

  async navigate(): Promise<void> {
    await this.goto('/books');
    await this.waitForVisible(this.searchInput);
  }

  async search(keyword: string): Promise<void> {
    await this.fill(this.searchInput, keyword);
    await this.page.waitForFunction(
      (value: string) => document.querySelector<HTMLInputElement>('#searchBox')?.value === value,
      keyword,
    );
  }

  async getResultTitles(): Promise<string[]> {
    const results = this.page.locator(this.resultTitleLinks);
    const count = await results.count();
    const titles: string[] = [];

    for (let index = 0; index < count; index += 1) {
      const element = results.nth(index);
      const text = (await element.innerText()).trim();
      if (text.length > 0) {
        titles.push(text);
      }
    }

    return titles;
  }

  async hasNoResults(): Promise<boolean> {
    const results = this.page.locator(this.resultTitleLinks);
    const resultCount = await results.count();
    if (resultCount === 0) {
      return true;
    }

    const noResults = this.page.locator(this.noResultsMessage);
    return await noResults.isVisible({ timeout: 2_000 }).catch(() => false);
  }

  async getResultElements(): Promise<Locator> {
    return this.page.locator(this.resultTitleLinks);
  }
}
