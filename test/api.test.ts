import * as request from "supertest";
import * as app from "../src/app";

describe('GET api/v1/students', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/v1/students')
      .then(res => {
        expect(res.status).toEqual(200);
      });
  })
})

describe('GET api/', () => {
    
      it('responds with 404 error', () => {
        return chai.request(app).get('/api')
          .then(res => {
            expect(res.status).toEqual(404);
          });
      })
    })