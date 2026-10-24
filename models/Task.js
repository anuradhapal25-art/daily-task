const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  studentName: String,

  title: String,

  status: String,

  date: String,

  time: String,

  year: String

});

module.exports = mongoose.model("Task", taskSchema);