import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('client test', () => {
  it('Get quote', done => {
    let req = {
      'origin': {
        'contact': {
          'name': 'La Redoute Contact',
          'email': 'laredoute@example.com',
          'phone': '07 1234 5678'
        },
        'address': {
          'country_code': 'FR',
          'locality': 'Anzin',
          'postal_code': '59410',
          'address_line1': 'Rue Jean Jaures'
        }
      },
      'destination': {
        'contact': {
          'name': 'Marquise de Pompadour',
          'email': 'marquise-de-pompadour@example.com',
          'phone': '07 9876 5432'
        },
        'address': {
          'country_code': 'FR',
          'locality': 'Marseille',
          'postal_code': '13006',
          'address_line1': '175 Rue de Rome' 
        }     
      },
      'package': {
        'dimensions': {
          'height': 10,
          'width': 10,
          'length': 10,
          'unit': 'cm'	
        },
        'gross_weight': {
          'amount': 100,
          'unit':'kg'
        }
      }
    };
    chai.request(app)
      .post('/client/getquote')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Create shipment', done => {
    let req = {
      'quote': {
        '_id': '597f3d5498507d2becafbd7c'
      },
      'origin': {
        'contact': {
          'name': 'La Redoute Contact',
          'email': 'laredoute@example.com',
          'phone': '07 1234 5678'
        },
        'address': {
          'country_code': 'FR',
          'locality': 'Anzin',
          'postal_code': '59410',
          'address_line1': 'Rue Jean Jaures'
        }
      },
      'destination': {
        'contact': {
          'name': 'Marquise de Pompadour',
          'email': 'marquise-de-pompadour@example.com',
          'phone': '07 9876 5432'
        },
        'address': {
          'country_code': 'FR',
          'locality': 'Marseille',
          'postal_code': '13006',
          'address_line1': '175 Rue de Rome' 
        }     
      },
      'package': {
        'dimensions': {
          'height': 10,
          'width': 10,
          'length': 10,
          'unit': 'cm'	
        },
        'gross_weight': {
          'amount': 100,
          'unit':'kg'
        }
      }
    };
    chai.request(app)
      .post('/client/createshipment')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send(req)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Get shipment', done => {
    chai.request(app)
      .post('/client/getshipment')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send({ ref: '5184781548' })
      .end((err, res) => {
        res.should.have.status(200);
        let data = JSON.parse(res.text);
        data.should.have.property('ref');
      });
    done();
  });

  it('Delete shipment', done => {
    chai.request(app)
      .post('/client/deleteshipment')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send({ ref: '5184781548' })
      .end((err, res) => {
        res.should.have.status(200);
        let data = JSON.parse(res.text);
        data.should.have.property('status');
        data.should.have.property('message');
      });
    done();
  });
  
  it('Check ref', done => {
    chai.request(app)
      .post('/client/getshipment')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});