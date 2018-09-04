import logger from '../config'
import router from '../mock/routes'
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

function initServer(){
    const appClient = new Koa();
    appClient.use(bodyParser());
    appClient.use(router.routes());
    appClient.use(router.allowedMethods());
    appClient.listen(3001);
    appClient.on('error', err => {
        logger.error('server error', err)
    });
    

}

module.exports = initServer;