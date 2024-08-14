const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const CloudinaryController = require('../controllers/cloudinary.controller');

router.post('/cloudinary', authenticate, CloudinaryController.upload);

module.exports = router;
