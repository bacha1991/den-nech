const {
	getURL,
	getProfile,
	getRequest
} = require('./utils');
const { getLawyers } = require('./lawyers');

async function initApp() {
	const getLawyersWrapper = () => new Promise(resolve => getLawyers(resolve));

	let lawyers = await getLawyersWrapper();

	console.log(lawyers.length);
}

initApp();
