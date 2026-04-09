const base = require('@playwright/test');

// 1. Import SEMUA class POM abang di sini
const { ProductsPage } = require('../../src/pages/ProductsPage');
const { LoginPage } = require('../../src/pages/LoginPage');
const { CartPage } = require('../../src/pages/CartPage');
const { CartPage } = require('../../src/pages/ContactUsPage');
const { CartPage } = require('../../src/pages/RegisterPage');

exports.test = base.test.extend({
  
  // Fixture ke-1: ProductsPage
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage); 
  },

  // Fixture ke-2: LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture ke-3: CartPage
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);

  },

  // Fixture ke-3: ContactUsPage
  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },

  // Fixture ke-3: RegisterPage
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(contactUsPage);
  },

});

exports.expect = base.expect;