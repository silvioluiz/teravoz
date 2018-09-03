import {logger} from '../config'
import router from '../webhook/routes'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const appClient = new Koa();
appClient.use(bodyParser());

appClient.use(router.routes());
appClient.use(router.allowedMethods());

appClient.listen(3000);

appClient.on('error', err => {
    logger.error('server error', err)
});