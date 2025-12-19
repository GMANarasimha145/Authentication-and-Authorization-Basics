const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const uploadMiddleware = require('../middlewares/upload-middleware');
const { imageUploadController, imageDeleteController, fetchImagesController } = require('../controllers/image-controllers');
const router = express.Router();

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), imageUploadController);
router.delete('/delete/:id',authMiddleware, adminMiddleware, imageDeleteController);
router.get('/fetch', authMiddleware, fetchImagesController);

module.exports = router;