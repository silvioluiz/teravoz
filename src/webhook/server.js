import {logger} from '../config'
import router from '../webhook/routes'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
require('dotenv').config();

const appClient = new Koa();
appClient.use(bodyParser());

appClient.use(router.routes());
appClient.use(router.allowedMethods());

logger.info(`Webhook iniciando na porta ${process.env.WEBHOOK_PORT | 3000} `)
appClient.listen(process.env.WEBHOOK_PORT | 3000);

appClient.on('error', err => {
    logger.error('server error', err)
});