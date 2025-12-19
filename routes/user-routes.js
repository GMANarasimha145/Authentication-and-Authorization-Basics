const express = require('express');
const userPageController = require('../controllers/user-page-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, userPageController);

module.exports = router;