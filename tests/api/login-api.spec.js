const { test, expect } = require('@playwright/test');

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    // API URL: https://automationexercise.com/api/verifyLogin
    // Request Method: POST
    const apiContext = await playwrightRequest.newContext({
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            'Connection': 'keep-alive', // Cegah server mutus koneksi tiba-tiba
            'Accept': '*/*'
        }
    });

    const response = await request.post('/api/verifyLogin', {
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },

        form: {
            email: 'adminndummy@gmail.com',
            password: 'Admin1234'
        }
    })

    expect(response.status()).toBe(200)

    const responseBody = await response.json()
    expect(responseBody.responseCode).toBe(200)
    expect(responseBody.message).toBe('User exists!')

})

