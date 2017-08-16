import express from 'express';
import userMiddleware from '../middleware/userMiddleware';
import userController from '../controllers/userController';

const router = express.Router();

router.post(
  '/register',
  userMiddleware.checkEmail,
  userMiddleware.checkPassword,
  userMiddleware.checkPasswordConfirm,
  userController.register
);

router.post(
  '/login',
  userMiddleware.checkEmail,
  userMiddleware.checkPassword,
  userController.login
);

router.post(
  '/forgot',
  userMiddleware.checkEmail,
  userController.forgot
);

router.put(
  '/update',
  userMiddleware.checkToken,
  userMiddleware.checkPassword,
  userMiddleware.checkPasswordConfirm,
  userController.update
);

export default router;