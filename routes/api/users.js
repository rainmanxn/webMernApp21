const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/User');

const router = express.Router();
// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model

// @route POST api / users / register
// @desc Register user
// @access Public
// router.post('/register', (req, res) => {
//   // Form validation
//   const { name, email, password } = req.body;
//   const { errors, isValid } = validateRegisterInput(req.body);
//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   User.findOne({ email: email }).then((user) => {
//     if (user) {
//       return res.status(400).json({ email: 'Email already exists' });
//     }
//     const newUser = new User({
//       name: name,
//       email: email,
//       password: password
//     });
//     // Hash password before saving in database
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser
//           .save()
//           .then((user) => res.json(user))
//           .catch((err) => console.log(err));
//       });
//     });
//   });
// });





router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        errors,
        message: 'Некорректные данные при регистрации',
      });

    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Такой пользователь уже существует' });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPass
    })
    await user.save();
    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
})

// @route POST api/users / login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          url: user.url
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

router.patch('/edit/:id', async (req, res) => {
  // console.log(req.body);
  let { id, name, email, password, url } = req.body;
  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  const currentUsr = await User.findOne({ _id: id });
  console.log('req.body', currentUsr.name);
  if (!name) {
    name = currentUsr.name;
  }
  if (!email) {
    email = currentUsr.email;
  }
  if (!password) {
    password = currentUsr.password;
  }
  if (!url) {
    url = currentUsr.url;
  }
      // User matched
      // Create JWT Payload
      const payload = {
        id,
        name,
        url,
      };
      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      );

  const resp = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        url,
        password,
      }
    }
  )
  // console.log('RESP', resp);
  // return res
  //   .status(200)
  //   .json(resp);
})

module.exports = router;
