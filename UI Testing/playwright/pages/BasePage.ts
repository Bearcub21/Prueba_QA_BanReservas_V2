import { Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: string): Promise<void> {
    await this.page.locator(locator).click({ trial: false });
  }

  async fill(locator: string, text: string): Promise<void> {
    await this.page.locator(locator).fill(text);
  }

  async getText(locator: string): Promise<string> {
    return await this.page.locator(locator).innerText();
  }

  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }

  async waitForVisible(locator: string): Promise<Locator> {
    return await this.page.locator(locator).waitFor({ state: 'visible' });
  }

  async waitForUrlMatch(pattern: RegExp): Promise<void> {
    await this.page.waitForURL(pattern);
  }
}
