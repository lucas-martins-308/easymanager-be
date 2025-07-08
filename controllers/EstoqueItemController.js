const EstoqueItem = require('../models/EstoqueItem');

class EstoqueItemController {
    // Listar todos os itens
    static async listar(req, res) {
        try {
            const itens = await EstoqueItem.findAll();
            res.json(itens);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Buscar item por ID
    static async buscarPorId(req, res) {
        try {
            const item = await EstoqueItem.findByPk(req.params.id);
            if (!item) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            res.json(item);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Criar novo item
    static async criar(req, res) {
        try {
            const item = await EstoqueItem.create(req.body);
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Atualizar item
    static async atualizar(req, res) {
        try {
            const [updated] = await EstoqueItem.update(req.body, {
                where: { idItem: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            const item = await EstoqueItem.findByPk(req.params.id);
            res.json(item);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Remover item
    static async remover(req, res) {
        try {
            const deleted = await EstoqueItem.destroy({
                where: { idItem: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            res.json({ message: 'Item removido com sucesso' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = EstoqueItemController; 