// routes/ReportRoutes.js
const express = require('express');
const router = express.Router();
const { Reserva, Hospede } = require('../models');
const { Op } = require('sequelize');
const authMiddleware = require('../middlewares/auth');

router.get('/month', authMiddleware, async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: 'Mês e ano são obrigatórios' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // último dia do mês

        // Busca reservas com join do hóspede, filtrando por dtCheckin
        const reservas = await Reserva.findAll({
            where: {
                dtCheckin: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [{
                model: Hospede,
                as: 'hospede',
                attributes: ['nomeCompleto']
            }],
            order: [['idReserva', 'ASC']]
        });

        // Mapeia os dados para o formato esperado pelo frontend
        const detalhes = reservas.map(reserva => ({
            idReserva: reserva.idReserva,
            hospede: reserva.hospede ? reserva.hospede.nomeCompleto : 'N/A',
            checkin: reserva.dtCheckin,
            checkout: reserva.dtCheckout,
            valor: parseFloat(reserva.valorReserva) || 0
        }));

        const totalReservas = detalhes.length;
        const totalValor = detalhes.reduce((acc, r) => acc + r.valor, 0);

        res.json({
            totalReservas,
            totalValor,
            detalhes
        });
    } catch (err) {
        console.error('Erro ao gerar relatório:', err);
        res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
});

module.exports = router;
