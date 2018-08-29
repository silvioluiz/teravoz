import {logger, fetch} from '../config';
import CallEvent from '../models/index';

async function mockWebhookEvents(uri, payLoad){
    try{
      let response = await fetch(uri, { 
        method: 'POST',
        body: payLoad
      });  
      
      if(response.status === 200) {
        let data = await response.json();
        logger.info(data);
        return data;
      }
      logger.error(`Falha ao invocar Webhook. Status: ${response.status}`);
    }catch(err){
      logger.error(`Falha ao invocar Webhook. Erro:  ${err.message}`);
    }
}

function emmitEvent(interval = 10000){
    logger.info(`Invocando Webhook a cada ${interval/1000} segundos`);
    return new Promise( resolve => {
        setInterval( () => {
            //TODO Externalizar URL
            mockWebhookEvents('http://localhost:3000/webhook', CallEvent.builderRandom())
        }, interval)
    });
}

emmitEvent(1000);
