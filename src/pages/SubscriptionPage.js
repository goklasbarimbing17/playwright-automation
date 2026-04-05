const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class SubscriptionPage extends BasePage {
  constructor(page) {
    super(page);
    this.subscriptionTitle = page.locator('footer h2:has-text("Subscription")');
    this.emailInput = page.locator('input#susbscribe_email');
    this.subscribeButton = page.locator('button#subscribe');
    this.successMessage = page.locator('#success-subscribe');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/view_cart', { waitUntil: 'commit' });
    await this.page.locator('footer').waitFor({ state: 'visible', timeout: 30000 });
  }

  async scrollToFooter() {
    await this.subscriptionTitle.scrollIntoViewIfNeeded();
  }

  async subscribe(email) {
    await this.emailInput.fill(email);
    await this.emailInput.press('Enter');
  }

  async verifySubscriptionTitle() {
    await expect(this.subscriptionTitle).toBeVisible();
    await expect(this.subscriptionTitle).toHaveText('Subscription');
  }

  async verifySuccessMessage() {
    // Increase timeout for flaky site
    await expect(this.successMessage).toBeVisible({ timeout: 20000 });
    await expect(this.successMessage).toContainText('You have been successfully subscribed!');
  }

  async getEmailValidationMessage() {
    return await this.emailInput.evaluate((input) => input.validationMessage);
  }
}

module.exports = { SubscriptionPage };
