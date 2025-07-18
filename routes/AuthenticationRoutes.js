const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthenticationController');

// Rota de login
router.post('/login', AuthController.login);

module.exports = router;
