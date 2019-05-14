import Customers from '../models';

const customers = new Customers() ;

class CustomerRepository{
    
    constructor(customers){
        this.customers = customers;
    }

    static findByNumber(number){
        return customers.contactExists(number);
    }

    static async findOrRegister(number){
        return await customers.findOrRegister(number);   
    }

}

module.exports = CustomerRepository;