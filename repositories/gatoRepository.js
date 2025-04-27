const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'gatos.json');

function getAllGatos() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

module.exports = { getAllGatos };
