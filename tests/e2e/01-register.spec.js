const { test } = require('@playwright/test');
const { RegisterPage } = require('../../src/pages/RegisterPage');
const { LoginPage } = require('../../src/pages/LoginPage');
require('dotenv').config();

test.describe('Registration E2E', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('User should be able to register, and use new data if email already exists', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    
    await registerPage.goto();
    
    // Coba register dengan data dari .env/JSON dulu (data yang mungkin existing)
    let dataSource = 'json'; 
    await registerPage.signupInitial(dataSource);
    
    // Cek apakah muncul pesan "Email Address already exist!"
    if (await loginPage.isEmailAlreadyRegistered()) {
      console.log('Email already exists, switching to FAKER data...');
      await registerPage.goto(); // Refresh/Kembali ke halaman register
      dataSource = 'faker'; // Ganti sumber data ke Faker
      await registerPage.signupInitial(dataSource);
    }
    
    await registerPage.fillRegistrationDetails(dataSource);
    await registerPage.verifyAccountCreated();
    await registerPage.clickContinue();
    
    const fullName = registerPage.getRegistrationData(dataSource).fullName;
    await loginPage.verifyLoggedInAs(fullName);
  });
});
