const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/ReservaController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', ReservaController.listar);
router.get('/:id', ReservaController.buscarPorId);
router.post('/', ReservaController.criar);
router.put('/:id', ReservaController.atualizar);
router.delete('/:id', ReservaController.cancelar);
router.post('/:id/checkin', ReservaController.checkin);
router.post('/:id/checkout', ReservaController.checkout);

module.exports = router; 