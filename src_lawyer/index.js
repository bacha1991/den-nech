const fs = require('fs');
const path = require('path');
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

	let lawyers = await getLawyersWrapper();

	const profiles = getProfiles(lawyers, responces => {
		const result = responces.map(({text, i}) => {
			lawyers[i].phone = getPhone(text);
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


		for (let i = 0, l = lawyers.length; i < l; i++) {
			const ITEMS = 2000;
			if (i % ITEMS === 0) {
				saveFiles(0, 'lawyers', generateCsv(lawyers.slice(i - ITEMS, ITEMS)), 'csv');
			}
		}
	});

}

initApp();
