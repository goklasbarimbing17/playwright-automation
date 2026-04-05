const { test, expect } = require('@playwright/test');
const { SubscriptionPage } = require('../../src/pages/SubscriptionPage');

test.describe('Subscription E2E', () => {
  test.setTimeout(120000);
  // Gunakan storageState kosong jika tidak ingin session login terbawa (opsional)
  // test.use({ storageState: { cookies: [], origins: [] } });

  let subscriptionPage;

  test.beforeEach(async ({ page }) => {
    subscriptionPage = new SubscriptionPage(page);
    await subscriptionPage.goto();
    // Verify home page is visible (title should contain Automation Exercise)
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  test('TC05-1: Positive - User should be able to subscribe with valid email', async () => {
    const validEmail = `test_${Date.now()}@example.com`;
    
    await subscriptionPage.scrollToFooter();
    await subscriptionPage.verifySubscriptionTitle();
    
    await subscriptionPage.subscribe(validEmail);
    await subscriptionPage.verifySuccessMessage();
  }); 

  test('TC05-2: Negative - User should not be able to subscribe with invalid email format', async () => {
    const invalidEmail = 'invalid-email-format';
    
    await subscriptionPage.scrollToFooter();
    await subscriptionPage.verifySubscriptionTitle();
    
    await subscriptionPage.subscribe(invalidEmail);
    
    // Verifikasi pesan sukses TIDAK muncul
    await expect(subscriptionPage.successMessage).not.toBeVisible();
    
    // Verifikasi validasi browser (native) untuk input email
    const validationMessage = await subscriptionPage.getEmailValidationMessage();
    console.log(`Browser Validation Message: ${validationMessage}`);
    expect(validationMessage).not.toBe('');
  });
});
