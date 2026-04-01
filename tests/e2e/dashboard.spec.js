const { test, expect } = require('@playwright/test');

test.describe('Dashboard Suite', () => {
  test('Harus sudah dalam keadaan login dan melihat menu Dashboard', async ({ page }) => {
    // Langsung buka dashboard karena session sudah di-load di config
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    const header = page.locator('.oxd-topbar-header-title');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Dashboard');
  });
});