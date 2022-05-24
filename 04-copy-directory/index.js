const path = require('path');
const {mkdir, rm, readdir, copyFile} = require('fs/promises');

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

const copyDir = async (src, dest) => {
  const filesObjs = await readdir(src, {withFileTypes: true});
  filesObjs.forEach(async (obj) => {
    if(obj.isFile()) {
      await copyFile(path.join(src, obj.name), path.join(dest, obj.name));
    } else {
      await mkdir(path.join(dest, obj.name), {recursive: true});
      await copyDir(path.join(src, obj.name), path.join(dest, obj.name));
    }
  });
};

const start = async () => {
  await rm(destPath, { recursive: true, force: true });
  await mkdir(destPath, {recursive: true});
  await copyDir(srcPath, destPath);
};

try {
  start();
} catch (error) {
  console.log(error.message);
}