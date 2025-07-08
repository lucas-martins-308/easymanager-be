// Configurações de ambiente para o backend
module.exports = {
  // Configurações do Banco de Dados
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || 'projeto',
  
  // Configurações do Servidor
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'easymanager_secret_key_2024',
  
  // Configurações do Banco
  CREATE_DB: process.env.CREATE_DB === 'true'
}; 