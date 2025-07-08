require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const models = require('./models');
const { Produto, Usuario, Endereco, Fornecedor } = models;
const fs = require('fs');
const mysql = require('mysql2/promise');
const authMiddleware = require('./middlewares/auth');

const app = express();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rotas
const authRoutes = require('./routes/AuthenticationRoutes');
const usuarioRoutes = require('./routes/UsuarioRoutes');
const hospedeRoutes = require('./routes/HospedeRoutes');
const reservaRoutes = require('./routes/ReservaRoutes');
const pagamentoRoutes = require('./routes/PagamentoRoutes');
const estoqueItemRoutes = require('./routes/EstoqueItemRoutes');
const quartoRoutes = require('./routes/QuartoRoutes');
const fornecedorRoutes = require('./routes/FornecedorRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/hospedes', hospedeRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/itens', estoqueItemRoutes);
app.use('/api/quartos', quartoRoutes);
app.use('/api/fornecedores', fornecedorRoutes);

const PORT = process.env.PORT || 3000;

async function runSqlScriptIfNeeded() {
  if (process.env.CREATE_DB === 'true') {
    const sql = fs.readFileSync('./config/create_database.sql', 'utf8');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      multipleStatements: true // Permite rodar vários comandos de uma vez
    });
    await connection.query(sql);
    await connection.end();
    console.log('Script de criação do banco executado com sucesso!');
  }
}

(async () => {
  await runSqlScriptIfNeeded();
  sequelize.sync()
    .then(async () => {
      console.log('Banco sincronizado com sucesso.');
      // Criação do usuário admin padrão
      try {
        const emailAdmin = 'admin@admin.com';
        const senhaAdmin = 'admin123';
        let usuarioAdmin = await Usuario.findOne({ where: { email: emailAdmin } });
        if (!usuarioAdmin) {
          console.log('Usuário admin não encontrado, criando...');
          // Criar endereço mínimo para o admin
          const enderecoAdmin = await Endereco.create({
            cep: '00000000',
            logradouro: 'Rua Admin',
            numero: 1,
            complemento: 'Admin',
            cidade: 'AdminCity',
            estado: 'AD',
            pais: 'Brasil'
          });
          await Usuario.create({
            nomeCompleto: 'Administrador',
            cpf: '00000000000',
            dtNascimento: new Date(1990, 0, 1),
            telefone: '00000000000',
            email: emailAdmin,
            senha: senhaAdmin,
            tipoUsuario: 'adm',
            Endereco_idEndereco: enderecoAdmin.idEndereco
          });
          console.log('Usuário admin padrão criado!');
        } else {
          console.log('Usuário admin já existe.');
        }
      } catch (err) {
        console.error('Erro ao criar usuário admin:', err);
      }
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Erro ao sincronizar banco:', err);
    });
})();

app.get('/', (req, res) => {
  res.send('EasyManager Backend funcionando!');
});

// Rota de teste para fornecedores
app.get('/test-fornecedores', (req, res) => {
  res.json({ message: 'Rota de fornecedores funcionando!' });
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
