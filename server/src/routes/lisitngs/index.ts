import filter from '@/controllers/listings';
import { deleteListingController } from '@/controllers/listings/deleteListing';
import { editListingController } from '@/controllers/listings/editListing';
import { addListingController } from '@/controllers/listings/addListing';
import { uploadPhotos } from '@/controllers/listings/imageUpload';
import { uploadMiddleware } from '@/middleware/imageUpload';
import isAdminAuthe from '@/middleware/isAdminAuthe';
import express from 'express';
import { getAllListingController } from '@/controllers/listings/getAllListings';

const router = express.Router();

router.get('/all',isAdminAuthe, getAllListingController);
router.post('/add', isAdminAuthe, addListingController);
router.post('/delete', isAdminAuthe, deleteListingController);
router.post('/edit', isAdminAuthe, editListingController);
router.post('/imageUpload', isAdminAuthe,uploadMiddleware, uploadPhotos);
router.post('/filter', filter);

export default router;
