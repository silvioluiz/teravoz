import Controller from '../controllers';
import KoaRouter from 'koa-router';
const router = new KoaRouter();
const controller = new Controller();

router.post('/webhook', controller.webhook);
module.exports = router;