const express = require('express');
const router = express.Router();
const FornecedorController = require('../controllers/FornecedorController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', FornecedorController.listar);
router.get('/:id', FornecedorController.buscarPorId);
router.post('/', FornecedorController.criar);
router.put('/:id', FornecedorController.atualizar);
router.delete('/:id', FornecedorController.remover);

module.exports = router; 