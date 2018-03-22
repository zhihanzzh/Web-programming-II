const fs =require('fs');
let list = JSON.parse(fs.readFileSync('dood.json'));
console.log(list[1]["id"])