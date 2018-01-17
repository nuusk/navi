
const Database = require('./db');
const db = new Database();

function insertEntity() {
  db.insertEntity(
    'argue',
    ['ziomuś wyluzuj', 'cierpliwości leszczu', 'przetwarzam zapytanie, daj mi chwilę']
  );
}

insertEntity();