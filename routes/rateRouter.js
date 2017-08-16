import express from 'express';
import userMiddleware from '../middleware/userMiddleware';
import rateMiddleware from '../middleware/rateMiddleware';
import rateController from '../controllers/rateController';

const router = express.Router();

router.post(
  '/import',
  userMiddleware.checkToken,
  rateController.importRate
);

router.post(
  '/create',
  userMiddleware.checkToken,
  rateMiddleware.checkWeight,
  rateMiddleware.checkPrice,
  rateMiddleware.checkFromCountry,
  rateMiddleware.checkToCountry,
  rateController.createRate
);

router.put(
  '/update',
  userMiddleware.checkToken,
  rateMiddleware.checkId,
  rateMiddleware.checkWeight,
  rateMiddleware.checkPrice,
  rateMiddleware.checkFromCountry,
  rateMiddleware.checkToCountry,
  rateController.updateRate
);

router.delete(
  '/delete',
  userMiddleware.checkToken,
  rateMiddleware.checkId,
  rateController.deleteRate
);

router.get(
  '/get',
  userMiddleware.checkToken,
  rateController.getRates
);

export default router;