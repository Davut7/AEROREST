import { Router } from 'express';
import catchAsync from '../utils/catchAsync.js';
import upload from '../services/multer.js';
import fileController from '../controllers/fileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post(
	'/upload',
	authMiddleware,
	upload.single('file'),
	catchAsync(fileController.uploadFile)
);
router.get('/list', authMiddleware, catchAsync(fileController.getFiles));
router.get('/:id', authMiddleware, catchAsync(fileController.getOneFile));
router.delete(
	'/delete/:id',
	authMiddleware,
	catchAsync(fileController.deleteFile)
);
router.put(
	'/update/:id',
	authMiddleware,
	upload.single('file'),
	catchAsync(fileController.updateFile)
);
router.get(
	'/download/:id',
	authMiddleware,
	catchAsync(fileController.downloadFile)
);

export default router;
