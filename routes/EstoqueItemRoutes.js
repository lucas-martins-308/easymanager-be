const express = require('express');
const router = express.Router();
const EstoqueItemController = require('../controllers/EstoqueItemController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', EstoqueItemController.listar);
router.get('/:id', EstoqueItemController.buscarPorId);
router.post('/', EstoqueItemController.criar);
router.put('/:id', EstoqueItemController.atualizar);
router.delete('/:id', EstoqueItemController.remover);

module.exports = router; 