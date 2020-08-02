const router = require("express").Router();
const taskController = require("../controller/taskController");
const { isLogin } = require("../middleware/loginMiddleware");

/**
 * @swagger
 * /task/create:
 *  post:
 *    description: create task
 *    parameters:
 *    - in: "body"
 *      name: body
 *      description: "Task Details"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          image:
 *            type: string
 *          startDate:
 *            type: date
 *          endDate:
 *            type: date
 *          teacherId:
 *            type: integer
 *            format: int64
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
router.route("/create").post(isLogin, taskController.createTask);

/**
 * @swagger
 * /task/edit:
 *  post:
 *    description: edit task
 *    parameters:
 *    - in: "body"
 *      name: body
 *      description: "Task Details"
 *      required: true
 *      schema:
 *        type: object
 *        properties:
 *          grade:
 *            type: integer
 *          image:
 *            type: string
 *          studentId:
 *            type: integer
 *            format: int64
 *    responses:
 *      '200':
 *        description: "task edit response"
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            done:
 *              type: boolean
 */
router.route("/edit").put(isLogin, taskController.editTask);

module.exports.router = router;
