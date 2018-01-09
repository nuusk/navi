const fs = require('fs');
const _naviResponses = fs.readFileSync('../resources/responses/smalltalk/greet.txt', 'utf8').split('\n').filter(x =>  x != '');

console.log(_naviResponses);
