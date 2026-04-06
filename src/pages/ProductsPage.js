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

    //add product to cart
    this.addToCartButton = page.locator('.add-to-cart').first();
    this.continueShoppingButton = page.locator('.btn.btn-success.close-modal.btn-block');
    this.cartMenu = page.locator("//a[normalize-space()='Cart']");
    this.productRow = page.locator('tr:has(.cart_price)');
    this.priceElement = page.locator("//td[@class='cart_price']//p[contains(text(),'Rs. 500')]")
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

  async clickCartMenu() {
    await this.cartMenu.click();
  }

  async addProductInCart(quantity = 1) {
    for (let i = 0; i < quantity; i++) {
    await this.addToCartButton.click();
    await this.continueShoppingButton.click();
    }
  }

  async verifyAddProductToCart() {
    await expect(this.productRow).toBeVisible();
  }

  async getProductPriceAsNumber(){
    const priceElement = this.page.getByText(/Rs\.\s*\d+/).first();
    const priceString = await priceElement.innerText();
    return parseInt(priceString.replace(/\D/g, ''));
  }

  async verifyAllCartTotals() {
    const productRows = this.page.locator('tbody tr'); 

    const rowCount = await productRows.count();
    console.log(`Ada ${rowCount} produk di keranjang.`);

    for (let i = 0; i < rowCount; i++) {
      const currentRow = productRows.nth(i);

      const priceText = await currentRow.locator('.cart_price').innerText();
      const price = parseInt(priceText.replace(/\D/g, ''));

      const qtyText = await currentRow.locator('.cart_quantity').innerText();
      const quantity = parseInt(qtyText.replace(/\D/g, '')); // Bersihkan dari spasi/huruf sisa

      const totalText = await currentRow.locator('.cart_total').innerText();
      const actualTotal = parseInt(totalText.replace(/\D/g, ''));

      const expectedTotal = price * quantity;
      
      console.log(`Baris ${i+1}: Harga(${price}) x Qty(${quantity}) = Total Web(${actualTotal}) | Ekspektasi(${expectedTotal})`);

      // verify expected and result
      expect(actualTotal).toBe(expectedTotal);
    }
  }
  

}

module.exports = { ProductsPage };
