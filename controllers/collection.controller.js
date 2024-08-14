const Collection = require('../models/collection.model');
const CloudinaryController = require('../controllers/cloudinary.controller');

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
		const collection = new Collection(req.body);
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

		const mapper = (key, value) => {
			if (value === collection[key]) return;
			return CloudinaryController.deleteSingle(collection[key]);
		};

		const { image, audio_id, audio_en, audio_sasak, ...rest } = req.body;
		const promises = [
			mapper('image', image),
			mapper('audio_id', audio_id),
			mapper('audio_en', audio_en),
			mapper('audio_sasak', audio_sasak),
		];

		await Promise.all(promises.filter(Boolean));
		const updated = await Collection.findByIdAndUpdate(id, req.body);

		res.status(200).json({
			message: 'Collection updated successfully.',
			data: updated,
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

		await CloudinaryController.deleteMultiple([
			collection.image,
			collection.audio_id,
			collection.audio_en,
			collection.audio_sasak,
		]);

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
