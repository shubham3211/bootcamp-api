const Student = require("../models/student");
const { createJwt } = require("../../utils/jwt");
const logger = require("../../config/logger");
const { CustomError } = require("../services/customError");
const StudentTask = require("../models/studentTask");

const deleteStudent = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ message: "Incomplete Credentials", done: false });
    }
    await Student.findOneAndDelete({ email });
    return res.send({ message: "student deleted", done: true });
  } catch (err) {
    logger.error(err);
    return res.send({ message: err.message, done: false });
  }
};

const createStudent = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    if (password.length < 8) {
      throw new CustomError({
        message: "Password length should be more than 7"
      });
    }

    if (!email || !firstname || !lastname || !password) {
      return res.send({ message: "Incomplete Credentials", done: false });
    }

    let currentStudent = await Student.findOne({ email });
    if (currentStudent) {
      return res.send({ message: "Email already exists", done: false });
    }

    currentStudent = await new Student({
      email,
      firstname,
      lastname,
      password
    }).save();

    const jwt = await createJwt({
      _id: currentStudent._id,
      userType: "student"
    });
    return res.send({ message: "student created", done: true, jwt });
  } catch (err) {
    logger.error(err);
    return res.send({ message: err.message, done: false });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }

    const currentStudent = await Student.findOne({ email });

    if (!currentStudent) {
      throw new CustomError({ message: "Unauthorized", status: 401 });
    }

    const isValid = await currentStudent.comparePassword(password);
    if (!isValid) {
      throw new CustomError({ message: "Unauthorized", status: 401 });
    }

    const jwt = await createJwt({
      _id: currentStudent._id,
      userType: "student"
    });
    return res.send({ message: "student login", done: true, jwt });
  } catch (err) {
    const { status } = err;
    if (!status) {
      status = 500;
    }
    logger.error(err);
    return res.status(status).send({ message: err.message, done: false });
  }
};

const assignTask = async (req, res) => {
  try {
    if (req.local.user.type != "student") {
      throw new CustomError({ message: "Unauthorized", status: 401 });
    }
    let { taskId, studentId } = req.body;
    if (!taskId || !studentId) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }
    const newStudeneTask = await new StudentTask({ studentId, taskId });
    await newStudeneTask.save();
    return res.send({ message: "Task Assigned To Student", done: true });
  } catch (err) {
    logger.error(err);
    let status = err.status ? err.status : 500;
    return res.status(status).send({ message: err.message, done: false });
  }
};

const getAssignedTask = async (req, res) => {
  try {
    let { id: studentId } = req.params;
    if (!studentId) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }
    const studentTasks = await StudentTask.find({ studentId }).populate({
      path: "taskId"
    });
    return res.send({ message: "Tasks found", studentTasks, done: true });
  } catch (err) {
    logger.error(err);
    let status = err.status ? err.status : 500;
    return res.status(status).send({ message: err.message, done: false });
  }
};

module.exports = { createStudent, loginStudent, assignTask, getAssignedTask };
