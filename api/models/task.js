var mongoose = require("mongoose");
const { dbConn } = require("../../utils/dbConnections");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher" 
  }
});

module.exports = dbConn.model("Task", taskSchema);
