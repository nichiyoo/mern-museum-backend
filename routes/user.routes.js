const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const UserController = require('../controllers/user.controller');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/profile', authenticate, UserController.profile);
router.get('/', authenticate, UserController.index);
router.post('/', authenticate, UserController.store);
router.get('/:id', authenticate, UserController.show);
router.put('/:id', authenticate, UserController.update);
router.delete('/:id', authenticate, UserController.destroy);

module.exports = router;
