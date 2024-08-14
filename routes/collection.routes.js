const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const CollectionController = require('../controllers/collection.controller');

router.get('/', CollectionController.index);
router.get('/:id', CollectionController.show);
router.post('/', authenticate, CollectionController.store);
router.put('/:id', authenticate, CollectionController.update);
router.delete('/:id', authenticate, CollectionController.destroy);

module.exports = router;
