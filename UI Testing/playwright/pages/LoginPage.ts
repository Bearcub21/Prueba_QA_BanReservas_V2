import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly loginLink = 'text=Login';
  private readonly usernameInput = '#userName';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login';
  private readonly errorMessage = '#name';

  async navigate(): Promise<void> {
    await this.goto('/login');
    await this.waitForVisible(this.loginButton);
  }

  async clickLoginLink(): Promise<void> {
    if (await this.isVisible(this.loginLink)) {
      await this.click(this.loginLink);
    }
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.page.locator(this.errorMessage)).toBeVisible({ timeout: 5_000 });
    return await this.getText(this.errorMessage);
  }
}
