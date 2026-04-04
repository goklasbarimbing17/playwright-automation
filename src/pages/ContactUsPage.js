const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageTextArea = page.locator('textarea[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert.alert-success');
  }

  async goto() {
    await this.page.goto('/contact_us');
  }

  async fillForm(data) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageTextArea.fill(data.message);
    if (data.uploadFile) {
      await this.uploadFileInput.setInputFiles(data.uploadFile);
    }
  }

  async submitForm() {
    // Handle the browser dialog/alert
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }

  async verifySuccessMessage(expectedText) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(expectedText);
  }
}

module.exports = { ContactUsPage };
