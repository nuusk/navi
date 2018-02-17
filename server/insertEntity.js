// import i deklaracja instancji bazy danych
const Database = require('./db');
const db = new Database();

// luźna funkcja która dodaje do bazy encję
// przyjmuje jako argumenty tytuł encji
// oraz synonimy słowa kluczowego
function insertEntity() {
  db.insertEntity(
    'joke',
    [
      'Przychodzi informatyk do apteki i mówi: - Poproszę witaminę C++.', 
      'Jak śni informatyk? - Na Javie.', 
      'Co mówi informatyk, gdy dostanie pendrive na urodziny? - Dzięki za pamięć.']
  );
}

// wywołanie funkcji
insertEntity();