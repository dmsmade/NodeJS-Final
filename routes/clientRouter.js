import express from 'express';
import userMiddleware from '../middleware/userMiddleware';
import clientMiddleware from '../middleware/clientMiddleware';
import clientController from '../controllers/clientController';

const router = express.Router();

router.post(
  '/getquote',
  userMiddleware.checkToken,
  clientMiddleware.checkWeight,
  clientMiddleware.checkFromCountry,
  clientMiddleware.checkToCountry,
  clientController.getQuote
);

router.post(
  '/createshipment',
  userMiddleware.checkToken,
  clientMiddleware.checkWeight,
  clientMiddleware.checkFromCountry,
  clientMiddleware.checkToCountry,
  clientController.createShipment
);

router.post(
  '/getshipment',
  userMiddleware.checkToken,
  clientMiddleware.checkRef,
  clientController.getShipment
);

router.post(
  '/deleteshipment',
  userMiddleware.checkToken,
  clientMiddleware.checkRef,
  clientController.deleteShipment
);

export default router;