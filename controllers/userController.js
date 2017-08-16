import md5 from 'md5';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const controller = {};

controller.register = (req, res) => {
  let email = req.body.email;
  let password = md5(req.body.password);
  User.findOne({ email: req.body.email }).then(msg => {
    if (msg === null) {
      return User.create({ email, password });
    } else {
      throw 'Email already exists';
    }
  }).then(msg => {
    let token = jwt.sign({ _id: msg._id }, 'manhdd5', { expiresIn: '30d' });
    res.send(`Successful registration and login with token: ${token}`);
  }).catch(err => {
    res.send(err);
  });
};

controller.login = (req, res) => {
  let email = req.body.email;
  let password = md5(req.body.password);
  User.findOne({ email, password }).then(msg => {
    if (msg === null) {
      throw 'Email or password is incorrect';
    } else {
      let token = jwt.sign({ _id: msg._id }, 'manhdd5', { expiresIn: '30d' });
      res.send(`Successfully logged in with token: ${token}`);
    }
  }).catch(err => {
    res.send(err);
  });
};

controller.forgot = (req, res) => {
  let email = req.body.email;
  User.findOne({ email }).then(msg => {
    if (msg === null) {
      throw 'Email does not exist';
    } else {
      let token = jwt.sign({ _id: msg._id }, 'manhdd5', { expiresIn: '3d' });
      res.send(`Update password with token: ${token}`);
    }
  }).catch(err => {
    res.send(err);
  });
};

controller.update = (req, res) => {
  let _id = res.locals._id;
  User.findByIdAndUpdate(_id, { $set: { password: md5(req.body.password) } }).then(() => {
    let token = jwt.sign({ _id }, 'manhdd5', { expiresIn: '30d' });
    res.send(`Successfully updated the password and logged in with token: ${token}`);
  }).catch(err => {
    res.send(err);
  });
};

export default controller;