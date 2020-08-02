var mongoose = require("mongoose");
const { dbConn } = require("../../utils/dbConnections");
const { passwordCompare } = require("../services/passwordComp");

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    valid: {
      type: Boolean,
      default: true
    },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
  },
  {
    timestamps: true
  }
);

passwordCompare(studentSchema);

module.exports = dbConn.model("Student", studentSchema);
