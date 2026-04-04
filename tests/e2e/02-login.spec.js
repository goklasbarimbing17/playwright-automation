const { test } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/LoginPage');
const path = require('path');
require('dotenv').config();

const STORAGE_STATE = path.join(__dirname, '../../playwright/.auth/user.json');

test.describe('Login E2E and Save Session', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User should be able to login and save session', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    const name = process.env.TEST_USER_NAME;

    await loginPage.loginProcess(email, password);
    await loginPage.verifyLoggedInAs(name);

    // Save session
    await page.context().storageState({ path: STORAGE_STATE });
  });

  test('User should not be able to login with invalid credentials', async ({ page }) => {
    await loginPage.loginProcess('wrong@email.com', 'wrongpassword');
    // Assuming LoginPage has a verifyErrorMessage or similar
    await loginPage.page.locator('.login-form p:has-text("Your email or password is incorrect!")').waitFor({ state: 'visible' });
  });
});
