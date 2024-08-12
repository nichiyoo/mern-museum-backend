const multer = require('../libs/multer');

const upload = multer.fields([
	{ name: 'image' },
	{ name: 'audio_id' },
	{ name: 'audio_en' },
	{ name: 'audio_sasak' },
]);

module.exports = upload;
