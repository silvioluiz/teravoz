import Customers from '../models';
import logger from '../../config';

const customers = new Customers() ;

class CustomerRepository{
    
    constructor(customers){
        this.customers = customers;
    }

    static findByNumber(number){
        return customers.existsContact(number);
    }

    static async findOrRegister(number){
        return await customers.findOrRegister(number);   
    }

}

module.exports = CustomerRepository;