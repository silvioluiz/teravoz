import {logger, fetch} from '../../config';
import Repository from '../repositories';

const repository = new Repository();
const destinationNotFound = "900";
const destinationFound = "901";

class TeravozClient{
    _preparePayloadDelegate(call_id, destination){
        const payload = {
            "type": "delegate",
            "call_id": call_id,
            "destination": destination
        }
        return payload;
    }

    _prepareAuthorizationDelegate(){
        const user = process.env.TERAVOZ_USER || "teravoz";
        const password = process.env.TERAVOZ_PASSWORD || "password" ;
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
              body: JSON.stringify(payload)
            });  
            
            let result = await response.json();

            if(response.status === 200 && result.status === 'ok') {
              return result;
            }
            logger.error(`Falha ao invocar Delegate. Status: ${response.status}, body: ${result.status}`);
          }catch(error){
            logger.error(`Falha ao invocar Delegate. Erro: ${error.message}`);
          }
    }
}


class WebHookController{
    
    async webhook(ctx, next) {
        const event = ctx.request.body; 
        let destination = destinationNotFound;
        let client = new TeravozClient();
        try {
            if(event.type === 'call.standby'){
                if (await Repository.findOrRegister(event.their_number)){
                    destination = destinationFound;
                } 
                await client._delegate(`${process.env.TERAVOZ_HOST}:${process.env.TERAVOZ_PORT}/actions` , client._preparePayloadDelegate(event.call_id, destination));
                logger.info(`[WEBHOOK] Delegado Evento ID:${event.call_id} referente ao número ${event.their_number} criado às ${event.timestamp} para o destino ${destination}.`);
            }
            logger.debug(`[WEBHOOK] Evento ID:${event.call_id}, Tipo: ${event.type} referente ao número ${event.their_number} criado às ${event.timestamp} recebido no webhook.`);
            ctx.body= JSON.parse('{"status": "ok"}');
        } catch (error) {
            logger.error(`Falha ao invocar webhook. Erro:  ${error.message}`);
            ctx.body= JSON.parse(`{"status": "error", "error": "${error}"}`);
        }
    }

}


module.exports = WebHookController;
