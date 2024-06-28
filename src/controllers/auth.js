//* A litle trick to get again the intellicense
// 1. Import express again
// 2. Indicate to the response that the type is = express.response.

const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../database/models/userModel');
const { generateJWT } = require('../helpers/jwt');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userRegistered = await User.findOne({ email });

    if (userRegistered) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            msg: 'Email already in use',
          },
        },
      });
    }

    user = new User(req.body);

    user.password = bcrypt.hashSync(password, 5);

    await user.save();

    // GenerateJWT

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      user: {
        userId: user.id,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact with customer service',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userToLogin = await User.findOne({ email });

    if (!userToLogin) {
      return res.status(400).json({
        ok: false,
        errors: {
          email: {
            msg: 'User not exists',
          },
        },
      });
    }

    const validPass = bcrypt.compareSync(password, userToLogin.password);

    if (!validPass) {
      return res.status(400).json({
        ok: false,
        errors: {
          password: {
            msg: 'Invalid credentials',
          },
        },
      });
    }

    // GenerateJWT

    const token = await generateJWT(userToLogin.id, userToLogin.name);

    res.json({
      ok: true,
      user: {
        userId: userToLogin.id,
        name: userToLogin.name,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact with customer service',
    });
  }
};

const renew = async (req, res) => {
  //* Here we're getting the values that we want, these come in the request.
  const { uid, name } = req;

  //* Here we generate a new token which has already been validated.
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  loginUser,
  registerUser,
  renew,
};
