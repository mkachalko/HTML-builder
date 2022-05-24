const path = require('path');
const fs = require('fs');
const {readdir, readFile, appendFile, rm} = require('fs/promises');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

const bundle = async (styles, bundleOut) => {
  const stylesObjs = await readdir(styles, {withFileTypes: true});
  stylesObjs.forEach(async (obj) => {
    const extention = path.parse(path.join(styles, obj.name)).ext.substring(1);
    if(!obj.isFile() || extention !== 'css') {
      return;
    }
    const readFileProm = await readFile(path.join(styles, obj.name), 'utf-8');

    await appendFile(bundleOut, readFileProm);
    
  });

};

const start = async () => {
  await rm(bundlePath, { recursive: true, force: true });
  await bundle(stylesPath, bundlePath);
};

try {
  start();
} catch (error) {
  console.log(error.message);
}
