import * as path from 'path';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';

require('dotenv').config()


//import routes
import StudentsRouter from './routers/StudentsRouter'

class App {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }


  public config(): void {
    //set up mongoose
    // const MONGODB_URI: string = "mongodb://mongo:27017/alc";
    // mongoose.connect(MONGODB_URI || process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI)


    //config
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  public routes(): void {
    let router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/v1/students', StudentsRouter);
  }
}

export default new App().app;
 