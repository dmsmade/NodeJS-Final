import csv from 'csvtojson';
import Rate from '../models/rateModel';

const controller = {};

controller.importRate = (req, res) => {
  csv().fromFile('./data/rate.csv').on('json', data => {
    Rate.create(data);
  }).on('done', (error)=>{
    if (error) {
      res.end(error);
    } else {
      res.send('Import success');
    }
  });
};

controller.createRate = (req, res) => {
  let weight = req.body.weight;
  let price = req.body.price;
  let fromcountry = req.body.fromcountry;
  let tocountry = req.body.tocountry;
  Rate.findOne({ weight, fromcountry, tocountry }).then(msg => {
    if (msg === null) {
      return Rate.create({ weight, price, fromcountry, tocountry });
    } else {
      throw 'Already exists';
    }
  }).then(msg => {
    res.send(`Success with ID: ${msg._id}`);
  }).catch(err => {
    res.send(err);
  });
};

controller.updateRate = (req, res) => {
  let _id = req.body._id;
  let weight = req.body.weight;
  let price = req.body.price;
  let fromcountry = req.body.fromcountry;
  let tocountry = req.body.tocountry;
  Rate.findById(_id).then(msg => {
    if (msg === null) {
      throw 'Not found';
    } else {
      return Rate.findOne({ weight, price, fromcountry, tocountry });
    }
  }).then(msg => {
    if (msg === null) {
      return Rate.findByIdAndUpdate(_id, { weight, price, fromcountry, tocountry });
    } else {
      throw 'Already exists';
    }
  }).then(() => {
    res.send('Success');
  }).catch(err => {
    res.send(err);
  });
};

controller.deleteRate = (req, res) => {
  let _id = req.body._id;
  Rate.findById(_id).then(msg => {
    if (msg === null) {
      throw 'Not found';
    } else {
      return Rate.findByIdAndRemove(_id);
    }
  }).then(() => {
    res.send('Success');
  }).catch(err => {
    res.send(err);
  });
};

controller.getRates = (req, res) => {
  Rate.find({}).then(msg => {
    if (msg.length === 0) {
      throw 'Not found';
    } else {
      let send = 'Success:\n';
      for (let c of msg) {
        send += c.toString() + '\n';
      }
      res.send(send);
    }
  }).catch(err => {
    res.send(err);
  });
};

export default controller;