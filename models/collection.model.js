const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
	tahun: { type: Number, required: true },
	kategori: { type: String, required: true },
	tag: { type: [String], required: true },
	referensi: { type: String },

	judul_id: { type: String, required: true },
	judul_en: { type: String, required: true },
	judul_sasak: { type: String, required: true },

	deskripsi_en: { type: String },
	deskripsi_id: { type: String },
	deskripsi_sasak: { type: String },

	image: { type: String },
	audio_id: { type: String },
	audio_en: { type: String },
	audio_sasak: { type: String },

	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collection', CollectionSchema);
