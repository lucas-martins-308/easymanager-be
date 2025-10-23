const express = require('express');
const router = express.Router();

// Lista de países (exemplo simplificado, pode colocar todos)
const countries = [
  "Argentina",
  "Brasil",
  "Canadá",
  "Chile",
  "Estados Unidos",
  "França",
  "Japão",
  "Portugal",
  "Reino Unido",
  "Uruguai"
];

// Função para organizar: Brasil primeiro, outros em ordem alfabética
function getSortedCountries() {
  const brazil = countries.filter(c => c.toLowerCase() === 'brasil');
  const others = countries.filter(c => c.toLowerCase() !== 'brasil').sort();
  return [...brazil, ...others];
}

// Rota GET /api/countries
router.get('/', (req, res) => {
  res.json(getSortedCountries());
});

module.exports = router;
