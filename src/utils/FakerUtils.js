const { faker } = require('@faker-js/faker');

class FakerUtils {
  // Individual field generators
  static getName() { return faker.person.fullName(); }
  static getEmail() { return faker.internet.email(); }
  static getPassword() { return faker.internet.password({ length: 10 }); }
  static getFirstName() { return faker.person.firstName(); }
  static getLastName() { return faker.person.lastName(); }
  static getCompany() { return faker.company.name(); }
  static getAddress() { return faker.location.streetAddress(); }
  static getAddress2() { return faker.location.secondaryAddress(); }
  static getCountry() { return 'United States'; }
  static getState() { return faker.location.state(); }
  static getCity() { return faker.location.city(); }
  static getZipcode() { return faker.location.zipCode(); }
  static getMobileNumber() { return faker.phone.number(); }
  static getSubject() { return faker.lorem.sentence(); }
  static getMessage() { return faker.lorem.paragraph(); }

  // Helper to get full user profile object
  static getUserProfile() {
    return {
      name: this.getName(),
      email: this.getEmail(),
      password: this.getPassword(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      company: this.getCompany(),
      address: this.getAddress(),
      address2: this.getAddress2(),
      country: this.getCountry(),
      state: this.getState(),
      city: this.getCity(),
      zipcode: this.getZipcode(),
      mobileNumber: this.getMobileNumber()
    };
  }

  // Helper to get contact form data object
  static getContactFormData() {
    return {
      name: this.getName(),
      email: this.getEmail(),
      subject: this.getSubject(),
      message: this.getMessage(),
      uploadFile: 'src/data/sample.txt'
    };
  }
}

module.exports = { FakerUtils };
