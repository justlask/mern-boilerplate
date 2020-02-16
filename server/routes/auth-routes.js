const express       = require('express');
const router        = express.Router();
const bcrypt        = require('bcryptjs');
const passport      = require('passport');
const User          = require('../models/User');

router.post('/signup', (req,res,next) => {
  console.log(req.body)
  const {username, password} = req.body

  if (!username || !password) {
    res.status(400).send({ message: 'Username and password required' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    
    if (err) {
      res.status(500).send({ message: 'Username check went bad'});
      return;
    }
    if (foundUser) {
      res.status(400).send({ message: 'Username taken'});
      return;
    }

    const salt      = bcrypt.genSaltSync(10);
    const hashPass  = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        res.status(400).send({ message: 'Saving to database went wrong'});
        return;
      }
      //log in user after signup
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).send({ message: 'Login after signup failed' })
          return;
        }

        res.status(200).json(newUser);

      });
    });
  });
});

router.post('/login', (req,res,next) => {
  console.log(req.body)
  const { username, password } = req.body

  if (!username || !password) {
    console.log('fail on user/pass')
    res.status(400).send({ message: 'Username and password required'});
    return;
  }
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      console.log('passport err')
      res.status(500).send({ message: 'Login failed' })
      return;
    }
    if (!theUser) {
      console.log('username or password incorrect')
      res.status(401).send({ message: 'Username or password is incorrect'});
      return;
    }
    req.login(theUser, (err) => {
      if (err) {
        console.log('error during login')
        res.status(500).send({ message: 'Error during login'});
        return;
      }
      console.log('success')
      res.status(200).json(theUser);
    });
  })(req,res,next);
});

router.get('/logout', (req,res,next) => {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: "Success" });
    } else {
      res.status(400).json({ message: 'Login failed' })
    }
  });
});

router.post('/loggedin', (req,res,next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Not Authorized'})
});

module.exports = router;