const { test, expect } = require('@playwright/test');

test.describe('API Tests: Products List', () => {
  test('API 1: Get All Products List', async ({ request }) => {
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: GET
    const response = await request.get('/api/productsList');

    // Response Code: 200 (HTTP)
    expect(response.status()).toBe(200);

    // Get the response JSON
    const responseBody = await response.json();

    // Verify the response JSON content
    // The API returns a responseCode field in the body as well
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);
    
    // Logging some info for debugging if needed (optional)
    console.log(`Total products found: ${responseBody.products.length}`);
  });

  test('API 2: POST To All Products List', async ({ request }) => {
    // API URL: https://automationexercise.com/api/productsList
    // Request Method: POST
    const response = await request.post('/api/productsList');
    
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });

  test('API 3: Get All Brands List', async ({ request }) => {
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: GET
    const response = await request.get('/api/brandsList');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBeTruthy();
    expect(responseBody.brands.length).toBeGreaterThan(0);
  });

  test('API 4: PUT To All Brands List', async ({ request }) => {
    // API URL: https://automationexercise.com/api/brandsList
    // Request Method: PUT
    const response = await request.put('/api/brandsList');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });

  test('API 5: POST To Search Product', async ({ request }) => {
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    // Request Parameter: search_product (For example: top, tshirt, jean)
    const response = await request.post('/api/searchProduct', {
      form: {
        search_product: 'tshirt'
      }
    });

    expect(response.status()).toBe(200)

    const responseBody = await response.json()
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody).toHaveProperty('products')
    expect(Array.isArray(responseBody.products)).toBeTruthy()
    expect(responseBody.products.length).toBeGreaterThan(0)
  });

  test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    // API URL: https://automationexercise.com/api/searchProduct
    // Request Method: POST
    const response = await request.post('/api/searchProduct')

    expect(response.status()).toBe(200)

    const responseBody = await response.json()
    expect(responseBody.responseCode).toBe(400)
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.')
  });

});
