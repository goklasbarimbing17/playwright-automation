const { faker } = require('@faker-js/faker');

const futureDate = () => faker.date.future({ years: 5 });

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
  static getCardNumber() { return faker.finance.accountNumber(); }
  static getCardName() { return faker.finance.accountName(); }

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


  static getCardExpiry(){
    // Generate tanggal acak di masa depan (maksimal 5 tahun dari sekarang)
    // Ref: faker.date.future() menjamin tanggal tidak akan di masa lalu
  

    // Ambil Bulan: getMonth() mulai dari 0, jadi harus + 1. 
    // padStart(2, '0') memastikan angka 5 menjadi "05"
    const month = String(futureDate().getMonth() + 1).padStart(2, '0');

    // Ambil Tahun: getFullYear() menghasilkan format 4 digit (contoh: "2029")
    const year = String(futureDate().getFullYear());

    // Kembalikan dalam bentuk object agar gampang dipecah saat dipanggil
    return { month, year };
  }

  static getYearExpiry() {
    return futureDate().getFullYear().toString();
}

// Untuk Bulan (Output: "08")
  static getMonthExpiry() {
    const month = futureDate().getMonth() + 1;
    return month.toString().padStart(2, '0');
  }

  static getRandomNumbers(digit){
    return faker.string.numeric(digit);
  }
}

module.exports = { FakerUtils };
