var mongoose = require("mongoose");
const { dbConn } = require("../../utils/dbConnections");

const studentTask = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true
  },
  grade: {
    type: Number,
    default: 1
  },
  image: {
    type: String
  }
});

module.exports = dbConn.model("Student_Task", studentTask);
