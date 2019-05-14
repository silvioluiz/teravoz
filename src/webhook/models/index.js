import logger from '../../config';
import fs from 'fs-extra';
import path from 'path';
import redis from 'async-redis';

const filePath = path.join(__dirname , 'db.json');
const redisCustomers = "customers";

class Customers {
    
    constructor(){
        this.client = redis.createClient({host:'redis', port: '6379'});
        this.client.on("error", function (err) {
            console.log("REDIS error: " + err);
        });
        this.client.on("ready", async function (g) {
            console.log("REDIS Ready");
        });
        
        this._loadInitialCustomers(filePath);
     }

    async contactExists(number){
        let isMember = await this.client.sismember(redisCustomers, number);
        return isMember;
    }
    async findOrRegister(number){
        try {
            let isFound = await this.contactExists(number);
            if (!isFound){
                await this._saveCustomers(Array.of(number));
            }
            return isFound;    
        } catch (error) {
            logger.error(`Falha ao buscar Customer no método find: ${error}`);
            throw error;
        }
    }

     async _loadInitialCustomers(filePath){
        try {
            await this.client.del(redisCustomers);
            let data = await fs.readJson(filePath, 'utf8');
            let numbers = Array.from(data.customers.map(function(item){
                return item.number;
            }));
            let insercoes = await this._saveCustomers(numbers);
              
        } catch (error) {
            logger.error(`Falha ao pré carregar Customers no método _loadInitialCustomers: ${error}`);
            throw error;
        }
     }

    async _saveCustomers(numbers){
        try{;
            return await this.client.sadd(redisCustomers, ...numbers);
         } catch(error){
            logger.error(`Falha ao salvar customers no método _saveCustomers: ${error}`);
            throw error;
         }
     }
    
}

module.exports = Customers;