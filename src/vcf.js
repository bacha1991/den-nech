const LINE_BREAK = require("os").EOL;

module.exports = {
	getCard: (name, phone, code) => `BEGIN:VCARD
		VERSION:3.0
		PRODID:-//Apple Inc.//iOS 11.2.1//EN
		N:Денис Спамеp;;;
		N:${code}-${name};;;
		TEL;type=HOME;type=VOICE;type=pref:${phone}
		REV:2017-07-27T13:48:57Z
		END:VCARD${LINE_BREAK}`
}
