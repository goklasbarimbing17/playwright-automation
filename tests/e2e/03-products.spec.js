const { test } = require('@playwright/test');
const { ProductsPage } = require('../../src/pages/ProductsPage');
require('dotenv').config();

test.describe('Products Search E2E', () => {
  test.setTimeout(120000);
  
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('User should be able to search for a product', async ({ page }) => {
    const productName = 'Blue Top';
    await productsPage.searchProduct(productName);
    await productsPage.verifySearchResults('Searched Products', productName);
  });

  test('User should be able to view details of the first product', async ({ page }) => {
    await productsPage.clickViewProduct();
    await productsPage.verifyProductDetails();  
  });

  test('Add products in cart', async ({ page }) => {
    const quantity = 3;
    await page.waitForTimeout(2000);
    const priceProduct = await productsPage.getProductPriceAsNumber();
    await productsPage.addProductInCart(quantity);
    await productsPage.clickCartMenu();
    
    await productsPage.verifyAddProductToCart();
    await productsPage.verifyAllCartTotals();

    console.log (`Price: Rs. ${priceProduct}`);
  });

  
});
