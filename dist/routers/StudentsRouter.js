"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_1 = require("../models/students");
//send response to user
const responses_1 = require("../services/responses");
const myResponses = new responses_1.MyResponses();
class AlcStudentRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * @param req
     * @param res -json containing list of students
     */
    getStudentsList(req, res) {
        students_1.default.find()
            .then((data) => {
            myResponses.sendSuccess(res, data, 200);
        }).catch((err) => {
            myResponses.sendError(res, err, 404);
        });
    }
    /**
     * @param {string} req.body.name -name of the student
     * @param res
     */
    addNewStudent(req, res) {
        let _name = req.body.name;
        if ((_name == undefined)) {
            let _error = "Name missing from body";
            let _code = res.status(400).statusCode;
            let _message = "one or more of the required parameter is missing";
            myResponses.sendError(res, _error, _code, _message);
            return;
        }
        students_1.default.create({
            name: _name
        })
            .then((data) => {
            myResponses.sendSuccess(res, data, 200);
        }).catch((err) => {
            myResponses.sendError(res, err, 404);
        });
    }
    /**
     * @param {string} req.body.id -id of the student
     * @param {string} req.body.name -name of the student
     * @param res
     */
    updateStudentName(req, res) {
        let _id = req.params.student_id;
        let _name = req.body.name;
        if ((_name == undefined) || (_id == undefined)) {
            let _error = "missing parameter";
            let _code = res.status(400).statusCode;
            let _message = "one or more of the required parameter is missing";
            myResponses.sendError(res, _error, _code, _message);
            return;
        }
        students_1.default.findOneAndUpdate({ _id: _id }, {
            name: _name
        }, { new: true })
            .then((data) => {
            myResponses.sendSuccess(res, data, 200);
        }).catch((err) => {
            myResponses.sendError(res, err, 404);
        });
    }
    /**
     * @param {string} req.body.id -id of the student
     * @param res
     */
    deleteStudent(req, res) {
        let _id = req.params.student_id;
        if ((_id == undefined)) {
            let _error = "missing parameter";
            let _code = res.status(400).statusCode;
            let _message = "one or more of the required parameter is missing";
            myResponses.sendError(res, _error, _code, _message);
            return;
        }
        students_1.default.findOneAndRemove({ _id: _id })
            .then((data) => {
            myResponses.sendSuccess(res, data, 200);
        }).catch((err) => {
            myResponses.sendError(res, err, 404);
        });
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
exports.default = alcStudentsRoutes.router;
