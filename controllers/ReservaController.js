const Reserva = require('../models/Reserva');
const Hospede = require('../models/Hospede');
const Quarto = require('../models/Quarto');

class ReservaController {
  async listar(req, res) {
    try {
      console.log('Iniciando busca de reservas...');
      const reservas = await Reserva.findAll({
        include: [
          { model: Hospede, as: 'hospede' },
          { model: Quarto, as: 'quartos' }
        ]
      });
      console.log(`Encontradas ${reservas.length} reservas`);
      
      const reservasMapeadas = reservas.map(r => ({
        idReserva: r.idReserva,
        dataCheckin: r.dtCheckin,
        dataCheckout: r.dtCheckout,
        valorTotal: r.valorReserva,
        canal: r.canalReserva,
        status: r.statusReserva,
        Hospede: r.hospede || null,
        quarto: r.quartos && r.quartos.length > 0 ? r.quartos[0].numeroQuarto : null
      }));
      
      res.json(reservasMapeadas);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
      res.status(500).json({ message: error.message, stack: error.stack });
    }
  }

  async buscarPorId(req, res) {
    try {
      const reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Hospede, as: 'hospede' }]
      });
      
      if (!reserva) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      const reservaMapeada = {
        idReserva: reserva.idReserva,
        dataCheckin: reserva.dtCheckin,
        dataCheckout: reserva.dtCheckout,
        valorTotal: reserva.valorReserva,
        canal: reserva.canalReserva,
        status: reserva.statusReserva,
        Hospede: reserva.hospede || null,
      };
      res.json(reservaMapeada);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async criar(req, res) {
    try {
      const reserva = await Reserva.create(req.body);
      
      // Se houver quartos especificados, criar as associações
      if (req.body.quartoId) {
        const Quarto_has_Reserva = require('../models/Quarto_has_Reserva');
        await Quarto_has_Reserva.create({
          Quarto_idQuarto: req.body.quartoId,
          Reserva_idReserva: reserva.idReserva
        });
      }
      
      // Buscar a reserva criada com as associações
      const reservaCompleta = await Reserva.findByPk(reserva.idReserva, {
        include: [
          { model: Hospede, as: 'hospede' },
          { model: Quarto, as: 'quartos' }
        ]
      });
      
      const reservaMapeada = {
        idReserva: reservaCompleta.idReserva,
        dataCheckin: reservaCompleta.dtCheckin,
        dataCheckout: reservaCompleta.dtCheckout,
        valorTotal: reservaCompleta.valorReserva,
        canal: reservaCompleta.canalReserva,
        status: reservaCompleta.statusReserva,
        Hospede: reservaCompleta.hospede || null,
        quarto: reservaCompleta.quartos && reservaCompleta.quartos.length > 0 ? reservaCompleta.quartos[0].numeroQuarto : null
      };
      
      res.status(201).json(reservaMapeada);
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const [updated] = await Reserva.update(req.body, {
        where: { idReserva: req.params.id }
      });
      
      if (!updated) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      const reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Hospede, as: 'hospede' }]
      });
      
      res.json(reserva);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async cancelar(req, res) {
    try {
      const [updated] = await Reserva.update(
        { statusReserva: 'cancelada' },
        { where: { idReserva: req.params.id } }
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
        { statusReserva: 'confirmada' },
        { where: { idReserva: req.params.id } }
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
        { statusReserva: 'confirmada' },
        { where: { idReserva: req.params.id } }
      );
      
      if (!updated) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      res.json({ message: 'Check-out realizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Reserva.destroy({
        where: { idReserva: req.params.id }
      });
      
      if (!deleted) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      
      res.json({ message: 'Reserva excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ReservaController(); 