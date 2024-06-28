/*
  User Routes path:
  host + api/auth
*/

const { registerUser, renew, loginUser } = require('../controllers/auth');

const { Router } = require('express');

const {
  singUpValidations,
  singInValidations,
} = require('../middlewares/authValidations');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.post('/', [singInValidations], loginUser);

router.post('/singup', [singUpValidations], registerUser);

router.get('/renew', validateJWT, renew);

module.exports = router;
