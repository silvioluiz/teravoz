import fs from 'fs-extra';
import path from 'path';
import redis from 'async-redis';
import logger from '../../config';


const redisCustomers = 'customers';

class Customers {
  constructor() {
    this.client = redis.createClient({ host: 'redis', port: '6379' });
    this.client.on('error', (err) => {
      console.log(`REDIS error: ${err}`);
    });
    this.client.on('ready', async () => {
      console.log('REDIS Ready');
    });
    this.filePath = path.join(__dirname, 'db.json');

    this.loadInitialCustomers(this.filePath);
  }

  async contactExists(number) {
    const isMember = await this.client.sismember(redisCustomers, number);
    return isMember;
  }

  async findOrRegister(number) {
    try {
      const isFound = await this.contactExists(number);
      if (!isFound) {
        await this.saveCustomers(Array.of(number));
      }
      return isFound;
    } catch (error) {
      logger.error(`Falha ao buscar Customer no método find: ${error}`);
      throw error;
    }
  }

  async loadInitialCustomers(filePath) {
    try {
      await this.client.del(redisCustomers);
      const data = await fs.readJson(filePath, 'utf8');
      const numbers = Array.from(data.customers.map(item => item.number));
      await this.saveCustomers(numbers);
    } catch (error) {
      logger.error(`Falha ao pré carregar Customers no método _loadInitialCustomers: ${error}`);
      throw error;
    }
  }

  async saveCustomers(numbers) {
    try {
      return await this.client.sadd(redisCustomers, ...numbers);
    } catch (error) {
      logger.error(`Falha ao salvar customers no método _saveCustomers: ${error}`);
      throw error;
    }
  }
}

module.exports = Customers;
