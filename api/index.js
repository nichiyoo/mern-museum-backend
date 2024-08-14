require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('../routes/user.routes');
const uploadRouter = require('../routes/upload.routes');
const collectionRouter = require('../routes/collection.routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Service running successfully',
	});
});

app.use('/users', userRouter);
app.use('/uploads', uploadRouter);
app.use('/collections', collectionRouter);

app.get('*', (req, res) => {
	res.status(404).json({
		message: 'Not found',
	});
});

mongoose
	.connect(process.env.MONGO_RUL)
	.then(() => {
		console.log('Successfully connected to MongoDB');

		app.listen(port, () => {
			console.log('Server is running on port ' + port);
		});
	})
	.catch((error) => {
		console.log(error);
	});
