import createError from 'http-errors';
import { File } from '../models/Model.js';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
class FileService {
	async uploadFile(file) {
		const fileExtension = file.originalname.split('.').pop();
		const { filename, mimetype, path, size } = file;
		const uploadedFile = await File.create({
			fileName: filename,
			mimeType: mimetype,
			filePath: path,
			size: size,
			extension: fileExtension,
		});
		return uploadedFile;
	}

	async getFiles(page, list_size) {
		const { count, rows } = await File.findAndCountAll({
			limit: list_size,
			offset: (page - 1) * list_size,
		});
		return { files: rows, count: count };
	}

	async getOneFile(fileId) {
		const file = await File.findByPk(fileId);
		if (!file) throw new createError.NotFound('File not found');
		return file;
	}

	async deleteFile(fileId) {
		const file = await this.getOneFile(fileId);
		await unlink(file.filePath);
		await file.destroy();
		return {
			message: 'File deleted successfully',
		};
	}

	async updateFile(file, fileId) {
		const fileExtension = file.originalname.split('.').pop();
		const { filename, mimetype, path, size } = file;
		const oldFile = await this.getOneFile(fileId);
		await unlink(oldFile.filePath);
		const updatedFile = await oldFile.update({
			fileName: filename,
			mimeType: mimetype,
			filePath: path,
			size: size,
			extension: fileExtension,
		});
		return {
			message: 'File uploaded successfully',
			updatedFile: updatedFile,
		};
	}

	async downloadFile(fileId) {
		const file = await this.getOneFile(fileId);
		if (!existsSync(file.filePath))
			throw new createError.NotFound('File not found in system');
		return file.filePath;
	}
}

export default new FileService();
