const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.featuresItems = page.locator('.features_items');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async verifySearchResults(expectedText) {
    await expect(this.featuresItems).toContainText(expectedText, { ignoreCase: true });
  }
}

module.exports = { ProductsPage };
