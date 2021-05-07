const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  
  let loadedUser;
  User.findOne({email: req.body.email})
      .then(user=>{
        if(!user) {
          const error = new Error("User not found");
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(isEqual=>{
        if(!isEqual) {
          const error = new Error("Wrong password entered");
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        }, 'portfoliosupersecrettokenhere', { 'expiresIn': '1d'});

        res.status(200).json({
          message: "loggedIn success",
          token: token,
          userId: loadedUser._id.toString()
        })
      })
      .catch(err=>{
        if(!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

    //First time register user only one time process
    // let password = req.body.password;

    // bcrypt.hash(password, 12)
    //       .then(hashPassword => {
    //         const user = new User({
    //             email: req.body.email,
    //             password: hashPassword
    //         })
    //         return user.save();
    //       })
    //       .then(result =>{
    //         res.status(200).json({
    //             message: "registration success"
    //         })
    //       })
    //       .catch(err => {
    //         if(!err.errorCode) {
    //           err.elet password = req.body.password;

    // bcrypt.hash(password, 12)
    //       .then(hashPassword => {
    //         const user = new User({
    //             email: req.body.email,
    //             password: hashPassword
    //         })
    //         return user.save();
    //       })
    //       .then(result =>{
    //         res.status(200).json({
    //             message: "registration success"
    //         })
    //       })
    //       .catch(err => {
    //         if(!err.errorCode) {
    //           err.errorCode = 500;
    //         }

    //         next(err);
    //       })rrorCode = 500;
    //         }

    //         next(err);
    //       })
};