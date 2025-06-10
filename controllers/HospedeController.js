const Hospede = require('../models/Hospede');

class HospedeController {
  async listar(req, res) {
    try {
      const hospedes = await Hospede.findAll();
      res.json(hospedes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const hospede = await Hospede.findByPk(req.params.id);
      
      if (!hospede) {
        return res.status(404).json({ message: 'Hóspede não encontrado' });
      }
      
      res.json(hospede);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async criar(req, res) {
    try {
      const hospede = await Hospede.create(req.body);
      res.status(201).json(hospede);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const [updated] = await Hospede.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (!updated) {
        return res.status(404).json({ message: 'Hóspede não encontrado' });
      }
      
      const hospede = await Hospede.findByPk(req.params.id);
      res.json(hospede);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async remover(req, res) {
    try {
      const deleted = await Hospede.destroy({
        where: { id: req.params.id }
      });
      
      if (!deleted) {
        return res.status(404).json({ message: 'Hóspede não encontrado' });
      }
      
      res.json({ message: 'Hóspede removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new HospedeController(); 