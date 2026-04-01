const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async loginProcess(user, pass) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };