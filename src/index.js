//import {config}  from './config'
import log from './logger'
import fetch from 'node-fetch'

//global.fetch = fetch

import koa from 'koa';
import Router from 'koa-router';


console.log('PORRRRAAAA maaan');

const app = new Koa();
const router = new Router();

router.post('/webhook', (ctx, next) => {
    const event = ctx.body; 
    
    if (event === 'call.standby') {
        //Verifica se está ou não na fila de nomes

        //POST actions, setando header
    }

    //Recebe
    ctx.body= 'webhook';
});

router.get('/', (ctx, next) => {
    ctx.body= 'raiz';
    console.log("raizzzz ")
    //TODO Colocar lista de Chamadas ativas
    return 'raiz';
});


app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3001);


