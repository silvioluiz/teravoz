import { fetch, logger } from '../../config';
import Repository from '../repositories';

const destinationNotFound = '900';
const destinationFound = '901';

class TeravozClient {
  preparePayloadDelegate(callId, destination) {
    this.payload = {
      type: 'delegate',
      call_id: callId,
      destination,
    };
    return this.payload;
  }

  prepareAuthorizationDelegate() {
    this.user = process.env.TERAVOZ_USER || 'teravoz';
    this.password = process.env.TERAVOZ_PASSWORD || 'password';
    return `Basic ${this.user.toString('base64')}: ${this.password.toString('base64')}`;
  }

  async delegate(uri, payload) {
    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.prepareAuthorizationDelegate(),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!(response.status === 200 && result.status === 'ok')) {
        logger.error(`Falha ao invocar Delegate. Status: ${response.status}, body: ${result.status}`);
      }
    } catch (error) {
      logger.error(`Falha ao invocar Delegate. Erro: ${error.message}`);
    }
  }
}


class WebHookController {
  async webhook(ctx) {
    const event = ctx.request.body;
    let destination = destinationNotFound;
    const client = new TeravozClient();
    try {
      if (event.type === 'call.standby') {
        if (await Repository.findOrRegister(event.their_number)) {
          destination = destinationFound;
        }
        await client.delegate(`${process.env.TERAVOZ_HOST}:${process.env.TERAVOZ_PORT}/actions`, client.preparePayloadDelegate(event.call_id, destination));
        logger.info(`[WEBHOOK] Delegado Evento ID:${event.call_id} referente ao número ${event.their_number} criado às ${event.timestamp} para o destino ${destination}.`);
      }
      logger.debug(`[WEBHOOK] Evento ID:${event.call_id}, Tipo: ${event.type} referente ao número ${event.their_number} criado às ${event.timestamp} recebido no webhook.`);
      ctx.body = JSON.parse('{"status": "ok"}');
    } catch (error) {
      logger.error(`Falha ao invocar webhook. Erro:  ${error.message}`);
      ctx.body = JSON.parse(`{"status": "error", "error": "${error}"}`);
    }
  }
}


module.exports = WebHookController;
