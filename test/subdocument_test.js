const assert = require('assert');
const User = require('../server/models/user');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => { //ten then jako argument bedzie mial to co zwrocil poprzedni then
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    // create user
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save() //save user
      .then(() => User.findOne({ name: 'Joe' })) //fetch user
      //.then(() => { return User.findOne({ name: 'Joe' }) }) to samo co linijka wyzej
      .then((user) => {
        user.posts.push({ title: 'New Post' }) // add a post to user
        return user.save(); // save user , tutaj mam {} po fat arrow dlatego musze zrobic return
      })
      .then(() => User.findOne({ name: 'Joe' })) //fetch user
      .then((user) => {
        assert(user.posts[0].title === 'New Post'); // make assertion
        done();
      })
  });

  it('can remove existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });

    joe.save() 
      .then(() => User.findOne({ name: 'Joe' })) 
      .then((user) => {
        user.posts[0].remove(); //normalnie trzeba by bylo uzyc splice ktory jest zjebany, dlatego mongoose daje metode remove()
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' })) 
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});