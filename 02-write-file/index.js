const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

const outputPath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(outputPath);

stdout.write('Введите необходимый текст\n');

stdin.on('data', (data) => {
  const str = data.toString();

  if(str.toLowerCase().trim() == 'exit') {
    process.exit();
  } 

  writeStream.write(str);
});

process.on('exit', () => console.log('Спасибо, что заглянули) Удачи!'));
process.on('SIGINT', () => process.exit());