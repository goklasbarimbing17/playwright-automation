const { test: setup } = require('@playwright/test');
const { RegisterPage } = require('../src/pages/RegisterPage');
const { LoginPage } = require('../src/pages/LoginPage');
const path = require('path');
require('dotenv').config();

const STORAGE_STATE = path.join(__dirname, '../playwright/.auth/user.json');

setup('Register and Login to save session', async ({ page }) => {
  setup.setTimeout(60000);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  
  const user = process.env.TEST_EMAIL;
  const pass = process.env.TEST_PASSWORD;
  const name = process.env.TEST_USER_NAME;

  // Step 1: Register or Login if already exists
  await registerPage.goto();
  await registerPage.signupInitial(name, user);
  
  if (await loginPage.isEmailAlreadyRegistered()) {
    await loginPage.goto();
    await loginPage.loginProcess(user, pass);
  } else {
    // Fill detailed registration
    const registrationDetails = {
      password: pass,
      firstName: 'Test',
      lastName: 'Gemini',
      address: '123 AI Street',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode: '94101',
      mobile: '1234567890'
    };
    await registerPage.fillRegistrationDetails(registrationDetails);
    await registerPage.verifyAccountCreated();
    await registerPage.clickContinue();
  }

  // Step 2: Verify Login
  await loginPage.verifyLoggedInAs(name);

  // Step 3: Save session
  await page.context().storageState({ path: STORAGE_STATE });
});
