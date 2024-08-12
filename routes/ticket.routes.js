const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const TicketController = require('../controllers/ticket.controller');

router.post('/', TicketController.store);
router.get('/', authenticate, TicketController.index);
router.delete('/:id', authenticate, TicketController.destroy);

module.exports = router;
