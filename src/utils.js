const { getCard } = require('./vcf');
const LINE_BREAK = require("os").EOL;

module.exports = {

	getResultDirName: (code, type = 'txt') => `${code}-${type}-results`,

	getNumber: num => ('000000' + num).slice(-7),

	generateTxt: function(code, end) {
		let result = '';

		for (let j = 0; j < 100000; j++) {
			end += 1;

			result += `+38${code}${this.getNumber(end)};`;
      	}

      	return {
      		result,
      		end
      	};
	},

	generateCsv: function(code, end) {
		let result = 'name, phone\n';

		for (let j = 0; j < 50000; j++) {
			end += 1;

			result += `${end},"+38${code}${this.getNumber(end)}"${LINE_BREAK}`;
      	}

      	return {
      		result,
      		end
      	};
	},

	generateVcf: function(code, end) {
		let result = '';

		for (let j = 0; j < 50000; j++) {
			end += 1;

			result += getCard(end, `+38${code}${this.getNumber(end)}`, code);
      	}

      	return {
      		result,
      		end
      	};
	}
}
