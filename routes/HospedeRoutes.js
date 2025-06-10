const express = require('express');
const router = express.Router();
const HospedeController = require('../controllers/HospedeController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', HospedeController.listar);
router.get('/:id', HospedeController.buscarPorId);
router.post('/', HospedeController.criar);
router.put('/:id', HospedeController.atualizar);
router.delete('/:id', HospedeController.remover);

module.exports = router; 