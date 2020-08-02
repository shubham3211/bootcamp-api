const logger = require("../../config/logger");
const { CustomError } = require("../services/customError");
const Task = require("../models/task");
const moment = require("moment");
const StudentTask = require("../models/studentTask");

const createTask = async (req, res) => {
  try {
    if (req.local.user.type != "teacher") {
      throw new CustomError({ message: "Unauthorized", status: 401 });
    }
    const { name, image, startDate, endDate, teacherId } = req.body;
    if (!name || !image || !startDate || !endDate || !teacherId) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }

    if (moment(startDate) > moment(endDate)) {
      throw new CustomError({
        message: "Start date cannot be more than end date"
      });
    }

    const newTask = await new Task({
      name,
      image,
      startDate,
      endDate,
      createdBy: teacherId
    });
    await newTask.save();
    return res.send({ message: "Task created", done: true, task: newTask });
  } catch (err) {
    let status = err.status ? err.status : 500;
    logger.error(err);
    res.status(status).json({ message: err.message, done: false });
  }
};

const editTask = async (req, res) => {
  try {
    let { type } = req.local.user;
    let { studentTaskId } = req.body;
    if (!studentTaskId) {
      throw new CustomError({ message: "Incomplete Credentials" });
    }
    if (type == "student") {
      let { image } = req.body;
      if (!image) {
        throw new CustomError({ message: "Imcomplete Credentials" });
      }
      await StudentTask.findByIdAndUpdate(studentTaskId, { image });
      return res.send({ message: "Task Updated", done: true });
    } else {
      let { grade } = req.body;
      if (grade == undefined) {
        throw new CustomError({
          message: "Incomplete Credentials",
          done: false
        });
      }

      if (grade < 1 || grade > 5) {
        throw new CustomError({ message: "Grade should be between 1 and 5" });
      }
      await StudentTask.findByIdAndUpdate(studentTaskId, { grade });
      return res.send({ message: "Task Updted", done: true });
    }
  } catch (err) {
    logger.error(err.message);
    let status = err.status ? err.status : 500;
    return res.status(status).send({ message: err.message, done: false });
  }
};

module.exports = { createTask, editTask };
