const {
	getURL,
	getProfile,
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
		}, []).map(({ id }) => id);

		callback(results);
	});
};


module.exports = {
	getLawyers
};
