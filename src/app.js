const fs = require('fs');
const { getResultDirName } = require('./utils');
const { saveTxt, saveCsv, saveVcf } = require('./generator');
const { phoneCodes } = require('./conf');

module.exports = {
  initApp: () => {
    console.log('Start Job');

    const args = process.argv[2] ? process.argv[2].split(',') : phoneCodes;

    args.forEach(code => {

      if (!fs.existsSync(`${getResultDirName(code)}`)){
        fs.mkdirSync(`${getResultDirName(code)}`);
      }

      saveTxt(code);
      saveCsv(code);
      saveVcf(code);

      console.log(code + ' - Done');

    });

    console.log('End Job');
  }
}
