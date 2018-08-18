const fs = require('fs');
const utils = require('./utils');

function createResultDir(code, type) {
  const dirName = utils.getResultDirName(code, type);

  if (!fs.existsSync(dirName)){
    fs.mkdirSync(dirName);
  }
};

function createFilePath(start, code, type = 'txt') {
  return {
    path: `${global.appRoot}/${utils.getResultDirName(code, type)}`,
    fileName: `${code}-${utils.getNumber(start)}.${type}`
  }
}

function writeFile(start, code, result, type) {
  const { path, fileName } = createFilePath(start, code, type);

  fs.writeFileSync(`${path}/${fileName}`, result, 'utf8');
}

module.exports = {

  saveTxt: function(code) {
    let start = -1;
    
    createResultDir(code);

    for (let i = 0; i < 100; i++) {

      const { end, result } = utils.generateTxt(code, start);

      start = end;

      writeFile(start, code, result);
    }
  },

  saveCsv: function (code) {
    let start = -1;
    const type = 'csv';
    
    createResultDir(code, type);

    for (let i = 0; i < 200; i++) {

      const { end, result } = utils.generateCsv(code, start);

      start = end;

      writeFile(start, code, result, type);
    }  
  },

  saveVcf: function (code) {
    let start = -1;
    const type = 'vcf';
    
    createResultDir(code, type);

    for (let i = 0; i < 200; i++) {

      const { end, result } = utils.generateVcf(code, start);

      start = end;

      writeFile(start, code, result, type);
    }  
  }
};
