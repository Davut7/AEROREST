import path from 'path';
import fileService from '../services/fileService.js';
import { createReadStream } from 'fs';
import paginationSchema from '../helper/paginationValidation.js';
import createError from 'http-errors';
class FileController {
	async uploadFile(req, res) {
		const { file } = req;
		const uploadedFile = await fileService.uploadFile(file);
		res.status(201).json({
			uploadedFile: uploadedFile,
			message: 'File uploaded successfully',
		});
	}

	async getFiles(req, res) {
		const { error, value } = paginationSchema.validate(req.query, {
			abortEarly: true,
		});
		if (error) if (error) throw createError.BadRequest(error.message);
		const { page = 1, list_size = 10 } = value;
		const { files, filesCount } = await fileService.getFiles(
			page,
			list_size
		);
		res.status(200).json({ files, filesCount });
	}

	async getOneFile(req, res) {
		const file = await fileService.getOneFile(req.params.id);
		res.status(200).json({ file: file });
	}

	async deleteFile(req, res) {
		const file = await fileService.deleteFile(req.params.id);
		res.status(200).json(file);
	}

	async updateFile(req, res) {
		const { file } = req;
		const updateFile = await fileService.updateFile(file, req.params.id);
		res.status(201).json(updateFile);
	}

	async downloadFile(req, res) {
		const file = await fileService.downloadFile(req.params.id);

		res.setHeader(
			'Content-disposition',
			'attachment; filename=' + path.basename(file)
		);
		res.setHeader('Content-type', 'application/octet-stream');

		const fileStream = createReadStream(file);
		fileStream.pipe(res);
	}
}

export default new FileController();
