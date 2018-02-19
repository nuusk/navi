// import i deklaracja instancji bazy danych
const Database = require('./db');
const db = new Database();

// luźna funkcja która dodaje do bazy encję
// przyjmuje jako argumenty tytuł encji
// oraz synonimy słowa kluczowego
function insertEntity() {
  db.insertEntity(
    'nod',
    [
      'nod']
  );
}

// wywołanie funkcji
insertEntity();
