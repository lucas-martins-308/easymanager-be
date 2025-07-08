const express = require('express');
const router = express.Router();
const QuartoController = require('../controllers/QuartoController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', QuartoController.listar);
router.get('/:id', QuartoController.buscarPorId);
router.post('/', QuartoController.criar);
router.put('/:id', QuartoController.atualizar);
router.delete('/:id', QuartoController.remover);

module.exports = router; 