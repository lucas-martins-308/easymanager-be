const Reserva = require('../models/Reserva');
const Hospede = require('../models/Hospede');

class ReservaController {
  async listar(req, res) {
    try {
      const reservas = await Reserva.findAll({
        include: [{ model: Hospede }]
      });
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Hospede }]
      });
      
      if (!reserva) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async criar(req, res) {
    try {
      const reserva = await Reserva.create(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const [updated] = await Reserva.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (!updated) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      const reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Hospede }]
      });
      
      res.json(reserva);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async cancelar(req, res) {
    try {
      const [updated] = await Reserva.update(
        { status: 'cancelada' },
        { where: { id: req.params.id } }
      );
      
      if (!updated) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      res.json({ message: 'Reserva cancelada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async checkin(req, res) {
    try {
      const [updated] = await Reserva.update(
        { status: 'checkin' },
        { where: { id: req.params.id } }
      );
      
      if (!updated) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      res.json({ message: 'Check-in realizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async checkout(req, res) {
    try {
      const [updated] = await Reserva.update(
        { status: 'checkout' },
        { where: { id: req.params.id } }
      );
      
      if (!updated) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      res.json({ message: 'Check-out realizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ReservaController(); 