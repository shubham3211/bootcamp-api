const router = require("express").Router();
const teacherController = require("../controller/teacherController");


/**
 * @swagger
 * /teacher/signup:
 *  post:
 *    description: Signup a user
 *    parameters:
 *    - in: "body"
 *      name: body
 *      description: "Signup info of user"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      '200':
 *        description: "Signup Response"
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            done:
 *              type: boolean
 *            jwt:
 *              type: string
 */

router.route("/signup").post(teacherController.createTeacher);

/**
 * @swagger
 * /teacher/login:
 *  post:
 *    description: login a user
 *    parameters:
 *    - in: "body"
 *      name: body
 *      description: "Login info of user"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      '200':
 *        description: "login Response"
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            done:
 *              type: boolean
 *            jwt:
 *              type: string
 */

router.route("/login").post(teacherController.loginTeacher);

module.exports = { router };
