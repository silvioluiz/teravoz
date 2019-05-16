import KoaRouter from 'koa-router';
import Controller from '../controllers';

const router = new KoaRouter();
const controller = new Controller();

router.post('/webhook', controller.webhook);
module.exports = router;
