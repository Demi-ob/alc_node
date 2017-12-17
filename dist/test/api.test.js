"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const App_1 = require("../App");
chai.use(chaiHttp);
const expect = chai.expect;
describe('GET api/v1/students', () => {
    it('responds with JSON array', () => {
        return chai.request(App_1.default).get('/api/v1/students')
            .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
        });
    });
});
describe('GET api/', () => {
    it('responds with 404 error', () => {
        return chai.request(App_1.default).get('/api')
            .then(res => {
            expect(res.status).to.equal(404);
        });
    });
});
