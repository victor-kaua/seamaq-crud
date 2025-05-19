// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve os arquivos HTML/CSS/JS

// Banco de dados SQLite
const db = new sqlite3.Database('./maquinas.db');

// Cria tabela, se não existir
db.run(`CREATE TABLE IF NOT EXISTS maquinas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  modelo TEXT,
  tipoLeitor TEXT,
  serie TEXT,
  dataFabricacao TEXT,
  cliente TEXT,
  local TEXT,
  status TEXT,
  firmware TEXT
)`);

// ROTAS API

// Listar todas
app.get('/api/maquinas', (req, res) => {
  db.all("SELECT * FROM maquinas", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar nova
app.post('/api/maquinas', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO maquinas (modelo, tipoLeitor, serie, dataFabricacao, cliente, local, status, firmware)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [data.modelo, data.tipoLeitor, data.serie, data.dataFabricacao, data.cliente, data.local, data.status, data.firmware];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Atualizar
app.put('/api/maquinas/:id', (req, res) => {
  const data = req.body;
  const sql = `UPDATE maquinas SET modelo = ?, tipoLeitor = ?, serie = ?, dataFabricacao = ?, cliente = ?, local = ?, status = ?, firmware = ?
               WHERE id = ?`;
  const params = [data.modelo, data.tipoLeitor, data.serie, data.dataFabricacao, data.cliente, data.local, data.status, data.firmware, req.params.id];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Deletar
app.delete('/api/maquinas/:id', (req, res) => {
  db.run("DELETE FROM maquinas WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
