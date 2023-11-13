import { signUpController, loginController } from '@/controllers/auth';
import express from 'express';
import isAuth from '@/middleware/Authe';
import isLoggedIn from '@/controllers/auth/isLoggedIn';
const router = express.Router();

router.get('/isloggedin', isLoggedIn);
// router.get('/logout', isAuth, logout);
router.post('/signup', signUpController);
router.post('/login', loginController);

export default router;
