const {
	getURL,
	getProfileURL,
	getRequest
} = require('./utils');

const getLawyers = callback => {
	const promises = [];

	for (let i = 28; i >= 27; i--) {	// All region
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
	const results = [];
	const ITEMS = 100;
	const splice = () => list.splice(0, ITEMS);
	let index = 0;
	let loaded = 0;

	function getRequests(memoList) {
		const memo = [];

		if (list.length <= 0) {
			return callback(results);
		}

		memoList.forEach(({ id }) => {
			const i = index;
			memo.push(new Promise((resolve) => {
				getRequest(getProfileURL(id), text => resolve({text, i}))
					.on('error', (e) => {
						resolve();
						console.log(e);
					})
					.end();
			}));

			index++;
		});

		Promise.all(memo).then(result => {
			results.push(...result);
			getRequests(splice());

			loaded += result.length;
			process.stdout.write(` - ${loaded}`);
		});
	}

	getRequests(splice());
}


module.exports = {
	getLawyers,
	getProfiles
};
