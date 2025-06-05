const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Buscar um usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Atualizar um usuário
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });
    const usuario = await Usuario.findByPk(req.params.id);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um usuário
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Usuario.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 