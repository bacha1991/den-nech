const http = require('http');

module.exports = {
	getURL: region => `http://erau.unba.org.ua/search?limit=20000&offset=0&order[surname]=ASC&raid=${region || 0}&addation[probono]=0&foreigner=0`,
	getProfile: id => `http://erau.unba.org.ua/profile/${id}`,
	getRequest: (url, callback) => http.get(url, (res) => {
		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			try {
			  const parsedData = JSON.parse(rawData);
			  callback(parsedData);
			} catch (e) {
			  console.error('Error', e.message);
			}
		});
	})
};