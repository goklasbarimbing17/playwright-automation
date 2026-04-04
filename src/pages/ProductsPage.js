const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.featuresItems = page.locator('.features_items');

    // detail product
    this.viewProductButtons = page.locator('.choose > .nav > li > a').first();
    this.productName = page.locator('.product-information h2');
    this.category = page.locator('.product-information p:has-text("Category")');
    this.price = page.locator('.product-information span span');
    this.availability = page.locator('.product-information p:has-text("Availability")');
    this.condition = page.locator('.product-information p:has-text("Condition")');
    this.brand = page.locator('.product-information p:has-text("Brand")'); 
    this.allProductsList = page.locator('.features_items .col-sm-4');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async verifySearchResults(expectedHeader, expectedProduct) {
    await expect(this.featuresItems).toContainText(expectedHeader, { ignoreCase: true });
    if (expectedProduct) {
      await expect(this.featuresItems).toContainText(expectedProduct, { ignoreCase: true });
    }
    // Verify at least one product is shown
    const productCount = await this.allProductsList.count();
    expect(productCount).toBeGreaterThan(0);
  }

  async clickViewProduct() {
    // Wait for the button to be visible and click it
    await this.viewProductButtons.waitFor({ state: 'visible' });
    await this.viewProductButtons.click();
    // Wait for the product details container to be visible
    await this.page.locator('.product-information').waitFor({ state: 'visible' });
  }

  async verifyProductDetails() {
    await expect(this.productName).toBeVisible();
    const name = await this.productName.innerText();
    expect(name.length).toBeGreaterThan(0);

    await expect(this.category).toBeVisible();
    await expect(this.price).toBeVisible();
    await expect(this.availability).toBeVisible();
    await expect(this.condition).toBeVisible();
    await expect(this.brand).toBeVisible();
    
    console.log(`Verified product: ${name}`);
  }

}

module.exports = { ProductsPage };
