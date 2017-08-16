import Rate from '../models/rateModel';
import Shipment from '../models/shipmentModel';

const controller = {};

controller.getQuote = (req, res) => {
  let unit = req.body.package.gross_weight.unit;
  let weight = req.body.package.gross_weight.amount;
  let fromcountry = req.body.origin.address.country_code;
  let tocountry = req.body.destination.address.country_code;
  weight = unit == 'kg' ? weight * 1000 : weight;
  Rate.find({ fromcountry, tocountry }).sort({weight: 1}).then(msg => {
    if (msg.length === 0) {
      throw 'Khong the dinh gia';
    } else {
      for (let c of msg) {
        if (c.weight >= weight) return c;
      }
      return msg[msg.length - 1];
    }
  }).then(msg => {
    res.send({ _id: msg._id, amount: msg.price });
  }).catch(err => {
    res.send(err);
  });
};

controller.createShipment = (req, res) => {
  let quote_id = req.body.quote._id;
  let unit = req.body.package.gross_weight.unit;
  let weight = req.body.package.gross_weight.amount;
  let fromcountry = req.body.origin.address.country_code;
  let tocountry = req.body.destination.address.country_code;
  weight = unit == 'kg' ? weight * 1000 : weight;
  let cost = 0;
  Rate.find({ fromcountry, tocountry }).sort({weight: 1}).then(msg => {
    if (msg.length === 0) {
      throw 'Khong the dinh gia';
    } else {
      for (let c of msg) {
        if (c.weight >= weight) return c;
      }
      return msg[msg.length - 1];
    }
  }).then(msg => {
    if (quote_id === msg._id.toString()) {
      cost = msg.price;
      let num = '1234567890';
      let ref = '';
      for (let i = 0; i < 10; i++) {
        ref += num[Math.floor(Math.random() * num.length)];
      }
      delete req.body.quote;
      req.body.ref = ref;
      return Shipment.create(req.body);
    } else {
      throw 'Quote ID sai';
    }
  }).then(msg => {
    res.send({
      ref: msg.ref,
      create_at: new Date(),
      cost
    });
  }).catch(err => {
    res.send(err);
  });
};

controller.getShipment = (req, res) => {
  let ref = req.body.ref;
  Shipment.findOne({ ref }).then(msg => {
    if (msg === null) {
      throw { ref: '' };
    } else {
      res.send(msg);
    }
  }).catch(err => {
    res.send(err);
  });
};

controller.deleteShipment = (req, res) => {
  let ref = req.body.ref;
  Shipment.findOne({ ref }).then(msg => {
    if (msg === null) {
      throw {
        status: 'NOK',
        message: 'Shipment not found'
      };
    } else {
      return Shipment.findByIdAndRemove(msg._id);
    }
  }).then(() => {
    res.send({
      status: 'OK',
      message: 'Shipment has been deleted'
    });
  }).catch(err => {
    res.send(err);
  });
};

export default controller;