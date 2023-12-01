import {
	addResident,
	deleteUserController,
	getResident,
} from '@/controllers/residents';
import { addReviewRating } from '@/controllers/residents/addRatingReview';
import isAdminAuthe from '@/middleware/isAdminAuthe';
import isAuth from '@/middleware/Authe';
import express from 'express';
import { getAllResidents } from '@/controllers/residents/getAllResidents';

const router = express.Router();

router.post('/add', isAdminAuthe, addResident);
router.post('/delete', isAdminAuthe, deleteUserController);
router.post('/feedback', isAuth, addReviewRating);
router.get('/', isAuth, getResident);
router.get('/all', isAdminAuthe, getAllResidents);

export default router;
