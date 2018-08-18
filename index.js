// init app

const { initApp } = require('./src/app');
const path = require('path');

global.appRoot = path.resolve(__dirname);

initApp();
