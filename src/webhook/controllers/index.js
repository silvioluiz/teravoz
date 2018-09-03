import {logger, fetch} from '../../config';
import Repository from '../repositories';

const repository = new Repository();
const destinationNotFound = "900";
const destinationFound = "901";


class WebHookController{
    async webhook(ctx, next) {
        const event = ctx.request.body; 
        const destination = destinationNotFound;

        try {
        
            if (await Repository.findOrRegister(event.their_number)){
                destination = destinationFound;
            } 
            //await this._delegate(uri, _preparePayloadDelegate(call_id, destination));
            //TODO criar um level/logger apenas para registro do webhook
            logger.info(`DELEGADO Evento ID:${event.call_id} referente ao número ${event.their_number} criado às ${event.timestamp} para o destino ${destination}.`);
        
            logger.info(`Evento ID:${event.call_id}, Tipo: ${event.type} referente ao número ${event.their_number} criado às ${event.timestamp} recebido no webhook.`);
            ctx.body= JSON.stringify({"status": "ok"});
        } catch (error) {
            ctx.body= JSON.stringify({"status": "error", "error": error});
        }
    }

    _preparePayloadDelegate(call_id, destination){
        const payload = {
            "type": "delegate",
            "call_id": call_id,
            "destination": destination
        }
        return payLoad;
    }

    _prepareAuthorizationDelegate(){
        const user = Buffer.from(process.env.TERAVOZ_USER);
        const password = Buffer.from(process.env.TERAVOZ_USER);
        return `Basic ${user.toString('base64')}: ${password.toString('base64')}`;
    }

    async _delegate(uri, payload) {
        try{
            let response = await fetch(uri, { 
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this._prepareAuthorizationDelegate()
              },
              body: JSON.stringify(payLoad)
            });  
            
            let result = await response.json();

            if(response.status === 200 && response.body['status'] === 'ok') {
              logger.info(result);
              return result;
            }
            logger.error(`Falha ao invocar Delegate. Status: ${response.status}, body: ${response.body}`);
          }catch(error){
            logger.error(`Falha ao invocar Delegate. Erro:  ${error.message}`);
          }
    }

}


module.exports = WebHookController;
