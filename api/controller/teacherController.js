const Teacher = require("../models/teacher");
const { createJwt, jwtVerify } = require("../../utils/jwt");
const logger = require("../../config/logger");
const { CustomError } = require("../services/customError");

const deleteTeacher = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ message: "Incomplete Credentials", done: false });
    }
    await Teacher.findOneAndDelete({ email });
    return res.send({ message: "teacher deleted", done: true });
  } catch (err) {
    logger.error(err);
    return res.send({ message: err.message, done: false });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    if (!email || !firstname || !lastname || !password) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }

    if (password.length < 8) {
      throw new CustomError({
        message: "Password length should be more than 7"
      });
    }

    let currentTeacher = await Teacher.findOne({ email });

    if (currentTeacher) {
      return res.send({ message: "Email already exists", done: false });
    }
    currentTeacher = await new Teacher({
      email,
      firstname,
      lastname,
      password
    }).save();
    const jwt = await createJwt({
      _id: currentTeacher._id,
      userType: "teacher"
    });
    return res.send({ message: "teacher created", done: true, jwt });
  } catch (err) {
    logger.error(err);
    return res.send({ message: err.message, done: false });
  }
};

const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }

    const currentTeacher = await Teacher.findOne({ email });

    if (!currentTeacher) {
      throw new CustomError({ message: "Unauthorized", status: 401 });
    }

    const isValid = await currentTeacher.comparePassword(password);
    if (!isValid) {
      throw new CustomError({ message: "Unauthorized", status: 401 });
    }

    const jwt = await createJwt({
      _id: currentTeacher._id,
      userType: "teacher"
    });
    return res.send({ message: "Teacher login", done: true, jwt });
  } catch (err) {
    const { status } = err;
    if (!status) {
      status = 500;
    }
    logger.error(err);
    return res.status(status).send({ message: err.message, done: false });
  }
};

module.exports = { createTeacher, loginTeacher };
