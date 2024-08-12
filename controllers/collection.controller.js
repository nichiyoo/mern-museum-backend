const { handleUpload, handleDelete } = require('../libs/cloudinary');
const Collection = require('../models/collection.model');

const index = async (req, res) => {
	try {
		const collections = await Collection.find();

		res.status(200).json({
			message: 'Collections fetched successfully.',
			data: collections,
		});
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetching collections.',
			error: error.message,
		});
		console.log(error);
	}
};

const show = async (req, res) => {
	try {
		const { id } = req.params;

		const collection = await Collection.findById(id);
		if (!collection) {
			return res.status(404).json({
				message: 'Collection not found',
			});
		}

		res.status(200).json({
			message: 'Collection fetched successfully.',
			data: collection,
		});
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetching the collection.',
			error: error.message,
		});
		console.log(error);
	}
};

const store = async (req, res) => {
	try {
		const collection = new Collection({
			...req.body,
		});

		const files = req.files;
		const [image, audio_id, audio_en, audio_sasak] = await Promise.all([
			handleUpload(collection._id, 'image', files.image),
			handleUpload(collection._id, 'audio_id', files.audio_id),
			handleUpload(collection._id, 'audio_en', files.audio_en),
			handleUpload(collection._id, 'audio_sasak', files.audio_sasak),
		]);

		collection.image = image;
		collection.audio_id = audio_id;
		collection.audio_en = audio_en;
		collection.audio_sasak = audio_sasak;

		await collection.save();

		res.status(201).json({
			message: 'Created',
			data: collection,
		});
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while creating collection.',
			error: error.message,
		});
		console.log(error);
	}
};

const update = async (req, res) => {
	try {
		const { id } = req.params;

		const collection = await Collection.findById(id);
		if (!collection) {
			return res.status(404).json({
				message: 'Collection not found.',
			});
		}

		const files = req.files;
		const [image, audio_id, audio_en, audio_sasak] = await Promise.all([
			handleUpload(collection._id, 'image', files.image),
			handleUpload(collection._id, 'audio_id', files.audio_id),
			handleUpload(collection._id, 'audio_en', files.audio_en),
			handleUpload(collection._id, 'audio_sasak', files.audio_sasak),
		]);

		if (image) collection.image = image;
		if (audio_id) collection.audio_id = audio_id;
		if (audio_en) collection.audio_en = audio_en;
		if (audio_sasak) collection.audio_sasak = audio_sasak;

		await collection.save();

		res.status(200).json({
			message: 'Collection updated successfully.',
			data: collection,
		});
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while updating collection.',
			error: error.message,
		});
		console.log(error);
	}
};

const destroy = async (req, res) => {
	try {
		const { id } = req.params;

		const collection = await Collection.findById(id);
		if (!collection) {
			return res.status(404).json({
				message: 'Collection not found.',
			});
		}

		await handleDelete(collection._id.toString());
		await Collection.findByIdAndDelete(id);

		res.status(200).json({
			message: 'Collection deleted successfully.',
			data: collection,
		});
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while deleting collection.',
			error: error.message,
		});
		console.log(error);
	}
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
};
