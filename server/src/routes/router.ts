import express from 'express';
import index from '@/controllers';
import idx404 from '@/controllers/404';
import authController from '@/routes/auth'
const router = express.Router();

router.get('/', index);
router.use('/user',authController)
router.use('*', idx404);

export default router;
