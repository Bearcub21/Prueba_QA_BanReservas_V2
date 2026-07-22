import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loadTestData } from '../utils/helpers';

const data = loadTestData();

test.describe('Login flow', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(data.valid_user.username, data.valid_user.password);
    await loginPage.waitForUrlMatch(/.*\/profile/);
    await expect(page).toHaveURL(/.*\/profile/);
  });

  test('Failed login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(data.invalid_user.username, data.invalid_user.password);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText.trim().length).toBeGreaterThan(0);
  });
});
