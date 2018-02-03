// import bibliotek i modeli
const assert = require('assert');

// blok testow
describe('Creating records', () => {
  // pojedynczy test
  it('saves a user', (done) => {
    // assert oznacza ze oczekujemy taki wynik i na tej podstawie testy przechodza albo nie
    assert(1 + 1 === 2);
  });
  // kolejny test
  it('saves a user', (done) => {
    assert(2 + 2 === 4);
  });

});
