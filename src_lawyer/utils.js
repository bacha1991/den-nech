const http = require('http');

module.exports = {
	getURL: region => `http://erau.unba.org.ua/search?limit=20000&offset=0&order[surname]=ASC&raid=${region || 0}&addation[probono]=0&foreigner=0`,
	getProfileURL: id => `http://erau.unba.org.ua/profile/${id}`,
	getRequest: (url, callback) => http.get(url, (res) => {
		const { statusCode } = res;
		const contentType = res.headers['content-type'];
		let error;

		if (statusCode !== 200) {
			console.log(url);
			error = new Error('Request Failed.\n' +
			`Status Code: ${statusCode}`);
		}

		if (error) {
			console.error(error.message);
			// consume response data to free up memory
			res.resume();
			callback('');
			return;
		}

		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				callback(parsedData);
			} catch (e) {
				callback(rawData);
			}
		});
	}),
	getPhone: (text) => {
		const regExp = /\+38\(\d{3}\)[\d|-]{9}/gm;
		const [ phone = null ] = text.match(regExp) || [];

		return phone;
	},
	generateCsv: function(result) {
		let raw = 'name,phone\n';
		const d = text => decodeURI(text);

		raw += result.map(({certcalc, firstname, surname, phone}, i) => {
			return `${d(certcalc)}-${i},${phone}\n`
		}).join('');

      	return raw;
	},
};