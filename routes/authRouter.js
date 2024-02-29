import { Router } from 'express';
import authController from '../controllers/authController.js';
import catchAsync from '../utils/catchAsync.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', catchAsync(authController.signup));
router.post('/signin/new_token', catchAsync(authController.refresh));
router.post('/signin', catchAsync(authController.signin));
router.get('/logout', catchAsync(authController.logout));
router.get('/info', authMiddleware, catchAsync(authController.getMe));

export default router;
