const router = require("express").Router();
const { isLogin } = require("../middleware/loginMiddleware");
const { imageUpload } = require("../controller/imageUploadController");

/**
 * @swagger
 * /image-upload/:
 *  get:
 *    description: Get a url to upload image
 *    responses:
 *      '200':
 *        description: "Task Assigned to student found"
 *        schema:
 *          type: object
 *          properties:
 *            filename:
 *              type: string
 *            url:
 *              type: boolean
 */

router.route("/").get(isLogin, imageUpload);

module.exports.router = router;
