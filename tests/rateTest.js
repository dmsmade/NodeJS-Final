import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';
import Rate from '../models/rateModel';

chai.use(chaiHttp);
chai.should();

describe('Rate test', () => {
  it('Import', done => {
    chai.request(app)
      .get('/rate/import')
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Create', done => {
    chai.request(app)
      .post('/rate/create')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send({
        weight: 250,
        price: 12.43,
        fromcountry: 'FR',
        tocountry: 'FR'
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Update', done => {
    chai.request(app)
      .put('/rate/update')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send({
        _id: '597f3d5498507d2becafbd7c',
        weight: 250,
        price: 12.43,
        fromcountry: 'FR',
        tocountry: 'FR'
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Delete', done => {
    chai.request(app)
      .delete('/rate/delete')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send({ _id: '597f3d5498507d2becafbd7c' })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Get', done => {
    chai.request(app)
      .get('/rate/get')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});

describe('Error test', () => {
  beforeEach(done => {
    sinon.stub(Rate, 'find').returns(
      new Promise((resolve, reject) => {
        resolve([]);
      })
    );
    done();
  });

  it('Get error', done => {
    chai.request(app)
      .get('/rate/get')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});