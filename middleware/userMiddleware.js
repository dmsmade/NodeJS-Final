import jwt from 'jsonwebtoken';

const middleware = {};

middleware.checkToken = (req, res, next) => {
  jwt.verify(req.headers['token'], 'manhdd5', (err, detoken) => {
    if (err) res.send('token error');
    else {
      res.locals._id = detoken._id;
      next();
    }
  });
};

middleware.checkEmail = (req, res, next) => {
  if (req.body.email === undefined) res.send('email error');
  else if (req.body.email.length === 0) res.send('email blank error');
  else if (req.body.email.length < 6) res.send('email length error');
  else next();
};

middleware.checkPassword = (req, res, next) => {
  if (req.body.password === undefined) res.send('password error');
  else if (req.body.password.length === 0) res.send('password blank error');
  else if (req.body.password.length < 6) res.send('password length error');
  next();
};

middleware.checkPasswordConfirm = (req, res, next) => {
  if (req.body.passwordconfirm === undefined) res.send('password confirm error');
  else if (req.body.password !== req.body.passwordconfirm) res.send('password confirm math error');
  next();
};

export default middleware;