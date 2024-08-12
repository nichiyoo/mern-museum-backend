const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Password incorrect' });
		}
		const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
			expiresIn: 86400,
		});
		res.status(200).json({
			message: 'Login successfully',
			token,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const profile = async (req, res) => {
	const { email } = req.user;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		res.status(200).json({
			message: 'Profile retrieved successfully',
			data: user,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const index = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const show = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({
			message: 'User details retrieved successfully',
			data: user,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const store = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const update = async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.name = name || user.name;
		user.email = email || user.email;
		if (password) {
			user.password = await bcrypt.hash(password, 10);
		}

		await user.save();

		res.status(200).json({
			message: 'User updated successfully',
			data: user,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

const destroy = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByIdAndDelete(id);
		res.status(200).json({
			message: 'User deleted successfully',
			data: user,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server Error' });
		console.log(err);
	}
};

module.exports = {
	login,
	register,
	profile,
	index,
	store,
	show,
	update,
	destroy,
};
