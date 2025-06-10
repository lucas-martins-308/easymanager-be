const express = require('express');
const router = express.Router();
const PagamentoController = require('../controllers/PagamentoController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', PagamentoController.listar);
router.get('/:id', PagamentoController.buscarPorId);
router.post('/', PagamentoController.criar);
router.put('/:id', PagamentoController.atualizar);
router.delete('/:id', PagamentoController.cancelar);

module.exports = router; 