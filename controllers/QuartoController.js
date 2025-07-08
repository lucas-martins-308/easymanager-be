const Quarto = require('../models/Quarto');

class QuartoController {
    // Listar todos os quartos
    static async listar(req, res) {
        try {
            const quartos = await Quarto.findAll();
            res.json(quartos);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Buscar quarto por ID
    static async buscarPorId(req, res) {
        try {
            const quarto = await Quarto.findByPk(req.params.id);
            if (!quarto) {
                return res.status(404).json({ message: 'Quarto não encontrado' });
            }
            res.json(quarto);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Criar novo quarto
    static async criar(req, res) {
        try {
            const quarto = await Quarto.create(req.body);
            res.status(201).json(quarto);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Atualizar quarto
    static async atualizar(req, res) {
        try {
            const [updated] = await Quarto.update(req.body, {
                where: { idQuarto: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Quarto não encontrado' });
            }
            const quarto = await Quarto.findByPk(req.params.id);
            res.json(quarto);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Remover quarto
    static async remover(req, res) {
        try {
            const deleted = await Quarto.destroy({
                where: { idQuarto: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Quarto não encontrado' });
            }
            res.json({ message: 'Quarto removido com sucesso' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = QuartoController; 