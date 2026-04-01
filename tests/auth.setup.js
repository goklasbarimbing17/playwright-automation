const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../src/pages/LoginPage');
const path = require('path');
const { TIMEOUT } = require('dns');
require('dotenv').config();

const STORAGE_STATE = path.join(__dirname, '../playwright/.auth/user.json');

setup('Mengeksekusi Autentikasi Global', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  await loginPage.goto();
  await loginPage.loginProcess(user, pass);

  // Verifikasi dan simpan session
  await page.waitForURL('**/dashboard/index', { timeout: 15000 });
  
  const header = page.locator('h6.oxd-text--h6');
  await expect(header).toHaveText('Dashboard');

  await page.context().storageState({ path: STORAGE_STATE });
  console.log('Session berhasil disimpan.');
});