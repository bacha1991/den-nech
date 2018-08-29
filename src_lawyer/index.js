const fs = require('fs');
const path = require('path');
const loader = require('./loader');
const { saveFiles } = require('./../src/generator');

const {
	getURL,
	getProfile,
	getRequest,
	getPhone,
	generateCsv
} = require('./utils');
const { getLawyers, getProfiles } = require('./lawyers');

global.appRoot = path.resolve(__dirname);

async function initApp() {
	const getLawyersWrapper = () => new Promise(resolve => getLawyers(resolve));

	loader.start();

	let lawyers = await getLawyersWrapper();
	console.log('Get lawyers - ', lawyers.length);

	const profiles = getProfiles([...lawyers], responces => {
		responces.forEach(item => {
			const {text = '', i} = item || {};
			const lawyer = lawyers[i] || {};
			lawyer.phone = getPhone(text);
		});

		lawyers = lawyers.reduce((memo, item) => {
			if (item.phone) {
				memo.push(item);
			}
			return memo;
		}, []).sort((a,b) => {
			if (a.certcalc > b.certcalc) {
				return 1;
			}

			return a.certcalc < b.certcalc ? -1 : 0;
		});

		console.log('Get profiles', lawyers.length);

		for (let i = 0, l = lawyers.length; i < l; i++) {
			const ITEMS = 2000;
			if (i % ITEMS === 0) {
				saveFiles(0, 'lawyers', generateCsv(lawyers.slice(i - ITEMS, ITEMS)), 'csv');
			}
		}

		loader.stop();
	});

}

initApp();
