const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');

const readStreem = fs.createReadStream(filePath, 'utf-8');

let data = '';

readStreem.on('data', chunk => data += chunk);
readStreem.on('end', () => console.log(data));
readStreem.on('error', (err) => console.log(`ERROR: ${err.message}`));