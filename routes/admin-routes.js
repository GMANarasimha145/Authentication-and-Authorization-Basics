const express = require('express');
const adminPageController = require('../controllers/admin-page-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, adminMiddleware, adminPageController);

module.exports = router;