const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./maquinas.db');

// Criação da tabela, caso não exista
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS maquinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo TEXT,
      tipoLeitor TEXT,
      serie TEXT,
      dataFabricacao TEXT,
      cliente TEXT,
      local TEXT,
      status TEXT,
      firmware TEXT
    )
  `);
});

module.exports = db;
