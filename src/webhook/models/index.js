import logger from '../../config';
import fs from 'fs-extra';
import path from 'path';
//TODO externalizar path do 'banco' pra fora da aplicação.
const filePath = path.join(__dirname , 'db.json');

class Customers {
    
    constructor(){
        this.numbers = new Set();
        this.filePath = filePath;
        this._loadFile();
     }

    existsContact(number){
        return this.numbers.has(number);
    }
    async findOrRegister(number){
        try {
            let isFound = false;
            if (!this.existsContact(number)){
                this.numbers.add(number);
                await this._writeFile(number);    
                isFound = true;
            }
            return isFound;    
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

     async _loadFile(){
        try {
            let data = await fs.readJson(filePath, 'utf8');
            for (let line of data.customers){
                this.numbers.add(line['number'] );
            }
        } catch (error) {
            logger.error(`Falha ao carregar arquivo: ${error}`);
            throw error;
        }
     }

     async _writeFile(number){
        try {
           let array = [];
           this.numbers.forEach( (value) => {
                array.push(`{"number": ${value}}`);
           });
           array.push(`{"number": ${number}}`);
           let customers = JSON.parse("{\"customers\":["+array.join(",\n")+"]}");
           await fs.writeJson(filePath,customers,{spaces: 2});
        } catch (error) {
            logger.error(`Falha ao persistir arquivo: ${error}`);
            throw error;
        }
     }
    
}

module.exports = Customers;