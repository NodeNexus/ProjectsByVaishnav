const fs = require('fs');
const data = fs.readFileSync('src/data/hardware_details.ts', 'utf-8');
const regex = /\"id\":\s*\"(.*?)\"[^{}]*\"image\":\s*\"(.*?)\"/g;
let match;
while ((match = regex.exec(data)) !== null) {
  console.log(match[1] + '|' + match[2]);
}
