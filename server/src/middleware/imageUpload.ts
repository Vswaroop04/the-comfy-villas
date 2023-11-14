import multer from 'multer';

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware for uploading image
export const uploadMiddleware = upload.single('image');