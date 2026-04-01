class BasePage {
  constructor(page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getElementText(locator) {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) || '';
  }
}

// Export menggunakan standar JavaScript (CommonJS)
module.exports = { BasePage };