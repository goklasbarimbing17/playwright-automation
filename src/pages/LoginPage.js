const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Login form locators
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    
    // Logged in as user
    this.loggedInUserText = page.locator('li:has-text("Logged in as")');
    this.emailExistsMessage = page.locator('p:has-text("Email Address already exist!")');
  }

  async goto() {
    await this.page.goto('/login');
    await this.emailInput.waitFor({ state: 'visible' });
  }

  async loginProcess(email, pass) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async verifyLoggedInAs(username) {
    await expect(this.loggedInUserText).toBeVisible();
    await expect(this.loggedInUserText).toContainText(username);
  }

  async isEmailAlreadyRegistered() {
    return await this.emailExistsMessage.isVisible();
  }
}

module.exports = { LoginPage };
