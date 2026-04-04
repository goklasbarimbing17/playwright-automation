const { test } = require('@playwright/test');
const { ProductsPage } = require('../../src/pages/ProductsPage');
const { LoginPage } = require('../../src/pages/LoginPage');
require('dotenv').config();

test.describe('Products Search E2E', () => {
  test.setTimeout(60000);

  test('User should be able to view products and search for a product using saved session', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Langsung menuju menu product menggunakan session dari storageState (playwright.config.js)
    await productsPage.goto();
    
    // Lakukan pencarian produk
    await productsPage.searchProduct('t-shirt');
    await productsPage.verifySearchResults('Searched Products');
  });
});
