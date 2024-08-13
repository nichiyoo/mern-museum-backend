require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('../routes/user.routes');
const collectionRouter = require('../routes/collection.routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(
	express.json({
		limit: '50mb',
	})
);
app.use(
	express.urlencoded({
		limit: '50mb',
		extended: true,
	})
);

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Service running successfull',
	});
});

app.use('/users', userRouter);
app.use('/collections', collectionRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('*', (req, res) => {
	res.status(404).json({
		message: 'Not found',
	});
});

mongoose
	.connect(process.env.MONGO_RUL)
	.then(() => {
		console.log('success connect mongo');
		app.listen(port, () => {
			console.log(`app running on port ${port}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
