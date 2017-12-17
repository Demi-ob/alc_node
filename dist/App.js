"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
require('dotenv').config();
//import routes
const StudentsRouter_1 = require("./routers/StudentsRouter");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        //set up mongoose
        // const MONGODB_URI: string = "mongodb://localhost:27017/alc_microsoft";
        // mongoose.connect(MONGODB_URI || process.env.MONGODB_URI)
        mongoose.connect(process.env.MONGODB_URI);
        //config
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }
    routes() {
        let router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/students', StudentsRouter_1.default);
    }
}
exports.default = new App().app;
