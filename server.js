require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const { Produto } = require('./models');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('EasyManager Backend funcionando!');
});

// Rota para criar produto
app.post('/produtos', async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sincronizar banco e iniciar servidor
sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco:', err);
  });
