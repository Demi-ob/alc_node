import { Router, Request, Response, NextFunction } from 'express';
import { SchemaTypes, mongo } from 'mongoose';
import studentModel from '../models/students'

//send response to user
import { MyResponses } from '../services/responses'
const myResponses = new MyResponses()


class AlcStudentRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * @param req 
   * @param res -json containing list of students
   */
  private getStudentsList(req: Request, res: Response): void {
    studentModel.find()
      .then((data) => {
        myResponses.sendSuccess(res, data, 200)
      }).catch((err) => {
        myResponses.sendError(res, err, 404)
      })
  }


  /**
   * @param {string} req.body.name -name of the student  
   * @param res 
   */
  private addNewStudent(req: Request, res: Response) {
    let _name = req.body.name

    if ((_name == undefined)) {
      let _error = "Name missing from body";
      let _code = res.status(400).statusCode
      let _message = "one or more of the required parameter is missing"
      myResponses.sendError(res, _error, _code, _message)
      return
    }

    studentModel.create({
      name: _name
    })
      .then((data) => {
        myResponses.sendSuccess(res, data, 200)
      }).catch((err) => {
        myResponses.sendError(res, err, 404)
      })
  }


  /**
   * @param {string} req.body.id -id of the student  
   * @param {string} req.body.name -name of the student  
   * @param res 
   */
  private updateStudentName(req: Request, res: Response) {
    let _id = req.params.student_id
    let _name = req.body.name

    if ((_name == undefined) || (_id == undefined)) {
      let _error = "missing parameter";
      let _code = res.status(400).statusCode
      let _message = "one or more of the required parameter is missing"
      myResponses.sendError(res, _error, _code, _message)
      return
    }

    studentModel.findOneAndUpdate(
      { _id: _id },
      {
        name: _name
      },
      { new: true })
      .then((data) => {
        myResponses.sendSuccess(res, data, 200)
      }).catch((err) => {
        myResponses.sendError(res, err, 404)
      })
  }




  /**
   * @param {string} req.body.id -id of the student  
   * @param res 
   */
  private deleteStudent(req: Request, res: Response) {
    let _id = req.params.student_id

    if ((_id == undefined)) {
      let _error = "missing parameter";
      let _code = res.status(400).statusCode
      let _message = "one or more of the required parameter is missing"
      myResponses.sendError(res, _error, _code, _message)
      return
    }

    studentModel.findOneAndRemove(
      { _id: _id },
    )
      .then((data) => {
        myResponses.sendSuccess(res, data, 200)
      }).catch((err) => {
        myResponses.sendError(res, err, 404)
      })
  }



  init() {
    //get the list of students in database
    this.router.get('/', this.getStudentsList);
    //add new student to database
    this.router.post('/', this.addNewStudent);
    //update student name in database
    this.router.put('/:student_id', this.updateStudentName);
    //delete student from database
    this.router.delete('/:student_id', this.deleteStudent);
  }
}

const alcStudentsRoutes = new AlcStudentRouter();
alcStudentsRoutes.init();

export default alcStudentsRoutes.router;
