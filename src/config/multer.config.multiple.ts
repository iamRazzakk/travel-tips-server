
import multer from 'multer';
import { cloudinaryUpload } from './cloudinary.config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUpload,
});

export const multipleMulterUpload = multer({ storage }).array("file", 3);