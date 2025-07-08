const Hospede = require('../models/Hospede');
const Endereco = require('../models/Endereco');

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
      // Verificar se existe um endereço padrão, se não, criar um
      let enderecoId = req.body.Endereco_idEndereco;
      
      if (!enderecoId) {
        const enderecoPadrao = await Endereco.findOne({ where: { cep: '00000000' } });
        
        if (!enderecoPadrao) {
          const novoEndereco = await Endereco.create({
            cep: '00000000',
            logradouro: 'Endereço Padrão',
            numero: 1,
            complemento: 'Padrão',
            cidade: 'Cidade Padrão',
            estado: 'SP',
            pais: 'Brasil'
          });
          enderecoId = novoEndereco.idEndereco;
        } else {
          enderecoId = enderecoPadrao.idEndereco;
        }
      }

      // Criar o hóspede com o endereço
      const hospedeData = { ...req.body, Endereco_idEndereco: enderecoId };
      const hospede = await Hospede.create(hospedeData);
      
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