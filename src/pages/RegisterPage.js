const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const registerData = require('../data/registerData.json');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.currentData = null;
    // Signup form locators
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    // Detailed registration form locators
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    
    // Account created message
    this.accountCreatedText = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async goto() {
    await this.page.goto('/login', { waitUntil: 'load' });
    // Tunggu sedikit agar script halaman login siap (menghindari error target closed)
    await this.signupNameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Generates or loads registration data based on source
   * @param {string} source - 'json' or 'faker'
   */
  getRegistrationData(source) {
    if (this.currentData && this.currentSource === source) return this.currentData;

    this.currentSource = source;
    if (source === 'json') {
      const timestamp = Date.now();
      this.currentData = {
        ...registerData,
        email: registerData.email.replace('@', `${timestamp}@`)
      };
    } else {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      this.currentData = {
        password: faker.internet.password({ length: 12 }),
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        country: 'United States',
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile: faker.phone.number()
      };
    }
    return this.currentData;
  }

  async signupInitial(sourceOrName, email) {
    let nameToFill = sourceOrName;
    let emailToFill = email;

    if (sourceOrName === 'json' || sourceOrName === 'faker') {
      const data = this.getRegistrationData(sourceOrName);
      nameToFill = data.fullName;
      emailToFill = data.email;
    }

    await this.signupNameInput.waitFor({ state: 'visible' });
    await this.signupNameInput.fill(nameToFill);
    await this.signupEmailInput.fill(emailToFill);
    await this.signupButton.click();
    await this.page.waitForLoadState('load');
  }

  async fillRegistrationDetails(sourceOrDetails) {
    let details = sourceOrDetails;

    if (sourceOrDetails === 'json' || sourceOrDetails === 'faker') {
      details = this.getRegistrationData(sourceOrDetails);
    }

    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(details.password);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobile);
    await this.createAccountButton.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedText).toBeVisible();
    await expect(this.accountCreatedText).toContainText('Account Created!', { ignoreCase: true });
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = { RegisterPage };
