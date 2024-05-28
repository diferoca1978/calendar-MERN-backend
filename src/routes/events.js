/*
Events Routes path
  host + api/events
*/

const { Router } = require('express');
const {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvents,
} = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-JWT');
const eventValidations = require('../middlewares/eventValidations');

const router = Router();

// All routes must be passed first throuhg the middleware
router.use(validateJWT);

router.get('/', getEvents);
router.post('/', [eventValidations], createEvent);
router.put('/:id', [eventValidations], updateEvent);
router.post('/delete/:id', deleteEvent);

module.exports = router;
