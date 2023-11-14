import express from 'express';
import isAdminAuthe from '@/middleware/isAdminAuthe';
import { createAppointment } from '@/controllers/appointment/book';
import { getAllAppointments } from '@/controllers/appointment/view';
import { deleteAppointment } from '@/controllers/appointment/delete';
const router = express.Router();

router.post('/book', createAppointment);
router.post('/delete', isAdminAuthe, deleteAppointment);
router.get('/view', isAdminAuthe, getAllAppointments);


export default router;
