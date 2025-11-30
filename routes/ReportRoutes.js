// routes/ReportRoutes.js
const express = require('express');
const router = express.Router();
const { Reserva } = require('../models'); // ajusta para o seu modelo
const { Op } = require('sequelize');

router.get('/month', async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: 'Mês e ano são obrigatórios' });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // último dia do mês

        const reservas = await Reserva.findAll({
            where: {
                createdAt: { // ou a coluna de data da reserva
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const totalReservas = reservas.length;
        const totalValor = reservas.reduce((acc, r) => acc + r.valor, 0);

        res.json({ totalReservas, totalValor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao gerar relatório' });
    }
});

module.exports = router;
