const express = require('express');
const router = express.Router();
const { registerUserController, loginUserController, changePasswordController } = require('../controllers/auth-controllers');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.put('/change-password', authMiddleware, changePasswordController);

module.exports = router;