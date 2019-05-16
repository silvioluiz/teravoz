import { logger, fetch } from '../config';
import CallEvent from './models/index';

async function mockWebhookEvents(uri, payLoad) {
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    });

    const result = await response.json();

    if (response.status === 200 && result.status === 'ok') {
      return result;
    }
    logger.error(`Falha ao invocar Webhook. Status: ${response.status}, body: ${result}`);
  } catch (err) {
    logger.error(`Falha ao invocar Webhook. Erro:  ${err.message}`);
  }
}

function emmitEvents(interval = 10000) {
  logger.info(`Invocando Webhook a cada ${interval / 1000} segundos`);
  return new Promise((resolve) => {
    setInterval(() => {
      mockWebhookEvents(`${process.env.WEBHOOK_HOST}:${process.env.WEBHOOK_PORT}/webhook`, CallEvent.builderRandom());
    }, interval);
  });
}

module.exports = emmitEvents;
