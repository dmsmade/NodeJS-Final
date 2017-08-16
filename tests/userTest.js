import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('User test', () => {
  it('Register', done => {
    chai.request(app)
      .post('/user/register')
      .send({
        email: 'manhdd5@fsoft.vn',
        password: 'domanh',
        passwordconfirm: 'domanh'
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Login', done => {
    chai.request(app)
      .post('/user/login')
      .send({
        email: 'manhdd5@fsoft.vn',
        password: 'domanh'
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Forgot', done => {
    chai.request(app)
      .post('/user/forgot')
      .send({
        email: 'manhdd5@fsoft.vn'
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });

  it('Update', done => {
    chai.request(app)
      .put('/user/update')
      .set(
        'token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTgwMmI5OWZjMWYxZDA2ZjhiZjU0OGYiLCJpYXQiOjE1MDE1NzI2NjIsImV4cCI6MTUwNDE2NDY2Mn0.R6exxoEEXtt6gwYPrEjKtWROX7YBtX_zATQ4k1dUdp4'
      )
      .send({
        password: 'manhdo',
        passwordconfirm: 'manhdo'
      })
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});