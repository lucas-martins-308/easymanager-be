const Pagamento = require('../models/Pagamento');
const Reserva = require('../models/Reserva');

class PagamentoController {
  async listar(req, res) {
    try {
      const pagamentos = await Pagamento.findAll({
        include: [{ model: Reserva }]
      });
      res.json(pagamentos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const pagamento = await Pagamento.findByPk(req.params.id, {
        include: [{ model: Reserva }]
      });
      
      if (!pagamento) {
        return res.status(404).json({ message: 'Pagamento não encontrado' });
      }
      
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async criar(req, res) {
    try {
      const pagamento = await Pagamento.create(req.body);
      res.status(201).json(pagamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const [updated] = await Pagamento.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (!updated) {
        return res.status(404).json({ message: 'Pagamento não encontrado' });
      }
      
      const pagamento = await Pagamento.findByPk(req.params.id, {
        include: [{ model: Reserva }]
      });
      
      res.json(pagamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async cancelar(req, res) {
    try {
      const [updated] = await Pagamento.update(
        { status: 'cancelado' },
        { where: { id: req.params.id } }
      );
      
      if (!updated) {
        return res.status(404).json({ message: 'Pagamento não encontrado' });
      }
      
      res.json({ message: 'Pagamento cancelado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PagamentoController(); 