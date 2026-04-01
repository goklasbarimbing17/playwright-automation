const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['allure-playwright']],
  use: {
    baseURL: process.env.URL || 'https://opensource-demo.orangehrmlive.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false, // Set ke false agar browser muncul
    viewport: { width: 1280, height: 720 },
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