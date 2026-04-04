const { test } = require('@playwright/test');
const { ContactUsPage } = require('../../src/pages/ContactUsPage');
const { FakerUtils } = require('../../src/utils/FakerUtils');

test.describe('Contact Us Scenarios', () => {
  test.setTimeout(120000);
  let contactUsPage;

  test.beforeEach(async ({ page }) => {
    contactUsPage = new ContactUsPage(page);
    await contactUsPage.goto();
  });

  test('User should be able to submit the contact form with dynamic data and file upload', async ({ page }) => {
    const data = FakerUtils.getContactFormData();
    // Ensure the file exists
    data.uploadFile = 'src/data/sample.txt';
    
    await contactUsPage.fillForm(data);
    await contactUsPage.submitForm();
    await contactUsPage.verifySuccessMessage('Success! Your details have been submitted successfully.');
  });

  test('User should be able to submit the contact form without file upload', async ({ page }) => {
    const data = FakerUtils.getContactFormData();
    data.uploadFile = null; // No file
    
    await contactUsPage.fillForm(data);
    await contactUsPage.submitForm();
    await contactUsPage.verifySuccessMessage('Success! Your details have been submitted successfully.');
  });
});
