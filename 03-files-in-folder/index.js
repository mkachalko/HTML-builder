const path = require('path');
const { readdir, stat } = require('fs/promises');

const dirPath = path.join(__dirname, 'secret-folder');

const getFiles = async () => {
  const filesObjs = await readdir(dirPath, {encoding: 'utf-8', withFileTypes: true});
  filesObjs.forEach(async (obj) => {
    
    if(!obj.isFile()) {
      return;
    }

    const filePath = path.join(dirPath, obj.name);
    const statObj = await stat(filePath);
    const pathObj = path.parse(filePath);
    console.log(`${pathObj.name} - ${pathObj.ext.substring(1)} - ${statObj.size / 1024}kb`);
  });
};

try {
  getFiles();
} catch (error) {
  console.log(error.message);
}