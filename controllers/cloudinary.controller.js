const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const upload = async (req, res) => {
	try {
		const { asset_folder } = req.body;
		const timestamp = Math.round(new Date().getTime() / 1000);

		const signature = cloudinary.utils.api_sign_request(
			{
				timestamp: timestamp,
				asset_folder: asset_folder,
			},
			process.env.CLOUDINARY_API_SECRET
		);

		res.status(200).json({
			message: 'Signature generated successfully.',
			data: {
				timestamp: timestamp,
				signature: signature,
				api_key: process.env.CLOUDINARY_API_KEY,
				cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const urlToPublicId = (url) => {
	if (!url.includes('cloudinary')) return;

	const segments = url.split('/');
	const filename = segments[segments.length - 1];
	return filename.split('.')[0];
};

const deleteSingle = async (url) => {
	try {
		if (!url) return;
		const public_id = urlToPublicId(url);
		await cloudinary.uploader.destroy(public_id);
	} catch (error) {
		console.log(error);
	}
};

const deleteMultiple = async (urls) => {
	try {
		if (!Array.isArray(urls) || !urls.length) return;
		const public_ids = urls.map(urlToPublicId);
		await cloudinary.api.delete_resources(public_ids);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	upload,
	deleteSingle,
	deleteMultiple,
};
