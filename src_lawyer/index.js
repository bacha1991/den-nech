const fs = require('fs');

const {
	getURL,
	getProfile,
	getRequest,
	getPhone
} = require('./utils');
const { getLawyers, getProfiles } = require('./lawyers');

async function initApp() {
	const getLawyersWrapper = () => new Promise(resolve => getLawyers(resolve));

	const lawyers = await getLawyersWrapper();
	const profiles = getProfiles(lawyers, responces => {
		const result = responces.map(text => getPhone(text));

		fs.writeFileSync(`result.txt`, result.join('\n'), 'utf8');
		console.log(result);
	});

}

initApp();
