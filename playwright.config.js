const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1, // Penting agar browser hanya terbuka satu per satu
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  reporter: [['html', { open: 'never' }], ['allure-playwright']],
  use: {
    baseURL: process.env.TEST_URL || 'https://automationexercise.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false, 
    viewport: null,
  },

  projects: [
    // Project khusus setup
    { 
      name: 'setup', 
      testMatch: /auth\.setup\.js/ 
    },

    // Project utama (E2E)
    {
      name: 'google-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        // Ambil session dari folder .auth
        channel: 'chrome',
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
