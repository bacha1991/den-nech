const {
	getURL,
	getProfileURL,
	getRequest
} = require('./utils');

const getLawyers = callback => {
	const promises = [];

	for (let i = 28; i >= 1; i--) {	// All region
		const promise = new Promise((resolve) => {
			getRequest(getURL(i), resolve);
		});

		promises.push(promise);
	}

	Promise.all(promises).then(values => {
		const results = values.reduce((memo, { items }) => {
			memo.push(...items);
			return memo;
		}, []).map(({ id, certcalc, firstname, surname }) => ({
			id,
			certcalc,
			firstname,
			surname
		}));

		callback(results);
	});
};

const getProfiles = (list, callback) => {
	const promises = [];

	list.forEach(({ id }, i) => {
		promises.push(new Promise((resolve) => {
			getRequest(getProfileURL(id), text => resolve({text, i}));
		}));
	});

	Promise.all(promises).then(callback);
}


module.exports = {
	getLawyers,
	getProfiles
};
