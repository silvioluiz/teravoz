import KoaRouter from 'koa-router';
import Controller from '../controllers';

const router = new KoaRouter();
const controller = new Controller();

router.post('/actions', controller.delegate);
module.exports = router;
