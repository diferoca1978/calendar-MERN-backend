const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { generateJWT } = require('../helpers/jwt');

const validateJWT = (req = request, res = response, next) => {
  //* Read the token through the headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'There is not token in the query.',
    });
  }

  try {
    //* Through the function verify of jwt, we have the payload that in this case contains the uid and the name values.
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    //*  Here we're rewrite the request and as this is a middleware, so the request will pass to another functions after this as a reference

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
