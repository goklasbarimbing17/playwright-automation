const { test } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/LoginPage');
const path = require('path');
require('dotenv').config();

const STORAGE_STATE = path.join(__dirname, '../../playwright/.auth/user.json');

test.describe('Login E2E and Save Session', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('User should be able to login and save session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    const name = process.env.TEST_USER_NAME;

    await loginPage.goto();
    await loginPage.loginProcess(email, password);
    await loginPage.verifyLoggedInAs(name);

    // Save session
    await page.context().storageState({ path: STORAGE_STATE });
  });
});
