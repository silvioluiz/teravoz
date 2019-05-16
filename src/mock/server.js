import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger } from '../config';
import router from './routes';

require('dotenv').config();

function initServer() {
  const appClient = new Koa();
  appClient.use(bodyParser());
  appClient.use(router.routes());
  appClient.use(router.allowedMethods());
  logger.info(`Teravoz iniciando na porta ${process.env.TERAVOZ_PORT || 3001} `);
  appClient.listen(process.env.TERAVOZ_PORT || 3001);
  appClient.on('error', (err) => {
    logger.error('server error', err);
  });
}

module.exports = initServer;
