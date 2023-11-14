import express from 'express';
import index from '@/controllers';
import idx404 from '@/controllers/404';
import authController from '@/routes/auth'
import residentController from '@/routes/residents'
import listingController from '@/routes/lisitngs'
import appointmentController from '@/routes/appointment'

const router = express.Router();

router.get('/', index);
router.use('/user',authController)
router.use('/resident',residentController)
router.use('/listing',listingController)
router.use('/appointment',appointmentController)
router.use('*', idx404);

export default router;
