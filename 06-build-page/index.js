//import block
const path = require('path');
const fs = require('fs');
const {mkdir, rm, readdir, readFile, copyFile, appendFile, writeFile} = require('fs/promises');

//path block
const dirPath = path.join(__dirname, 'project-dist');

const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const bundleHTMLPath = path.join(__dirname, 'project-dist', 'index.html');

const stylesPath = path.join(__dirname, 'styles');
const bundleStylePath = path.join(__dirname, 'project-dist', 'style.css');

const srcAssetsPath = path.join(__dirname, 'assets');
const destAssetsPath = path.join(__dirname, 'project-dist', 'assets');

//function block
const createDir = async (dir) => {
  await mkdir(dir, {recursive: true});
};

const getHTML = async (components, template, bundle) => {
  const companentsObj = await readdir(components, {withFileTypes: true});
  let readTemplate = await readFile(path.join(template), 'utf-8');

  companentsObj.forEach(async (obj, index) => {
    const extention = path.parse(path.join(components, obj.name)).ext.substring(1);
    const fileName = path.parse(path.join(components, obj.name)).name;

    if(!obj.isFile() || extention !== 'html') {
      return;
    }

    const readCompanent = await readFile(path.join(components, obj.name), 'utf-8');
    
    const reg = new RegExp(`{{${fileName}}}`, 'gi');

    readTemplate = readTemplate.replace(reg, readCompanent);

    await writeFile(bundle, readTemplate);

    
  });



};

const getStyles = async (styles, bundle) => {
  const stylesObjs = await readdir(styles, {withFileTypes: true});
  stylesObjs.forEach(async (obj) => {
    const extention = path.parse(path.join(styles, obj.name)).ext.substring(1);
    if(!obj.isFile() || extention !== 'css') {
      return;
    }
    const readStylesFile = await readFile(path.join(styles, obj.name), 'utf-8');

    await appendFile(bundle, readStylesFile);
    
  });

};

const copyAssets = async (src, dest) => {
  const filesObjs = await readdir(src, {withFileTypes: true});
  filesObjs.forEach(async (obj) => {
    if(obj.isFile()) {
      await copyFile(path.join(src, obj.name), path.join(dest, obj.name));
    } else {
      await mkdir(path.join(dest, obj.name), {recursive: true});
      await copyAssets(path.join(src, obj.name), path.join(dest, obj.name));
    }
  });
};

const start = async () => {
  await rm(dirPath, { recursive: true, force: true });
  await createDir(dirPath);
  await getHTML(componentsPath, templatePath, bundleHTMLPath);
  await getStyles(stylesPath, bundleStylePath);
  await createDir(destAssetsPath);
  await copyAssets(srcAssetsPath, destAssetsPath);
};

try {
  start();
} catch (error) {
  console.log(error.message);
}