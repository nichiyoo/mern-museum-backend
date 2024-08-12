const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const handleUpload = async (id, key, file) => {
	try {
		if (!file || !file.length) return null;
		if (!id || !key) return null;

		const buffer = Buffer.from(file[0].buffer).toString('base64');
		const uri = 'data:' + file[0].mimetype + ';base64,' + buffer;

		const result = await cloudinary.uploader.upload(uri, {
			public_id: key,
			asset_folder: id,
			tags: 'collection',
			resource_type: 'auto',
			use_asset_folder_as_public_id_prefix: true,
			overwrite: true,
		});

		return {
			width: result.width,
			height: result.height,
			url: result.secure_url,
			public_id: result.public_id,
		};
	} catch (error) {
		console.log(error);
		return null;
	}
};

const handleDelete = async (id) => {
	try {
		await Promise.all([
			cloudinary.api.delete_resources_by_prefix(id, {
				resource_type: 'image',
			}),
			cloudinary.api.delete_resources_by_prefix(id, {
				resource_type: 'video',
			}),
		]);

		await cloudinary.api.delete_folder(id);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	cloudinary,
	handleUpload,
	handleDelete,
};
