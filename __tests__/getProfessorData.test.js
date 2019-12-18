const request = require('supertest')
const server = require('../src/server')
describe('GET api/professor_data/000447/2014/2016', function () {
  it('respond with 200 status code', function (done) {
    request(server)
      .get('/api/professor_data/000447/2014/2016')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err) {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET api/professor_data/000447/2014/2016', function () {
  it('respond with 404 status code', function (done) {
    request(server)
      .get('/api/professor_data/000447/2014/')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err) {
        if (err) return done(err)
        done()
      })
  })
})
