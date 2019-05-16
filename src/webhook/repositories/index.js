import Customers from '../models';

const customers = new Customers();

class CustomerRepository {
  static findByNumber(number) {
    return customers.contactExists(number);
  }

  static async findOrRegister(number) {
    return customers.findOrRegister(number);
  }
}

module.exports = CustomerRepository;
