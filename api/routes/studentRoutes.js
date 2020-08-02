const router = require("express").Router();
const studentController = require("../controller/studentController");
const { isLogin } = require("../middleware/loginMiddleware");

/**
 * @swagger
 * /student/signup:
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

router.route("/signup").post(studentController.createStudent);

/**
 * @swagger
 * /student/login:
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

router.route("/login").post(studentController.loginStudent);

/**
 * @swagger
 * /student/assign-task:
 *  post:
 *    description: assign task to student
 *    parameters:
 *    - in: "body"
 *      name: body
 *      description: "Task Details"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          taskId:
 *            type: string
 *          studentId:
 *            type: string
 *    responses:
 *      '200':
 *        description: "task creation response"
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            done:
 *              type: boolean
 */

router.route("/assign-task").post(isLogin, studentController.assignTask);

/**
 * @swagger
 * /assign-task/{id}:
 *  get:
 *    description: Get task assigned to student
 *    parameters:
 *    - name: "studentId"
 *      description: "Id of student"
 *      required: true
 *      type: integer
 *      format: int64
 *    responses:
 *      '200':
 *        description: "Task Assigned to student found"
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            done:
 *              type: boolean
 *            studentTasks:
 *              type: object
 */

router
  .route("/assign-task/:id")
  .get(isLogin, studentController.getAssignedTask);

module.exports.router = router;
