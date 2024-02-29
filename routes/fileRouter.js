import { Router } from 'express';
import catchAsync from '../utils/catchAsync.js';
import upload from '../services/multer.js';
import fileController from '../controllers/fileController.js';

const router = Router();

router.post(
	'/upload',
	upload.single('file'),
	catchAsync(fileController.uploadFile)
);
router.get('/list', catchAsync(fileController.getFiles));
router.get('/:id', catchAsync(fileController.getOneFile));
router.delete('/delete/:id', catchAsync(fileController.deleteFile));
router.put(
	'/update/:id',
	upload.single('file'),
	catchAsync(fileController.updateFile)
);
router.get('/download/:id', catchAsync(fileController.downloadFile));

export default router;
