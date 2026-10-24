const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

app.use(express.json());

app.use(express.static("public"));


// MongoDB connection

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB connected");
  })

  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });


// Add new goal

async function addTask(studentName, title, date, year) {

  const task = new Task({

    studentName: studentName,

    title: title,

    status: "pending",

    date: date,

    year: year,

    reflection: ""

  });

  await task.save();
}


// POST API - Add goal

app.post("/tasks", async (req, res) => {

  await addTask(
    req.body.studentName,
    req.body.title,
    req.body.date,
    req.body.year
  );

  res.send("Goal added successfully");
});


// GET API - Show all goals

app.get("/tasks", async (req, res) => {

  const tasks = await Task.find();

  res.json(tasks);
});


// PUT API - Complete goal

app.put("/tasks/:id", async (req, res) => {

  await Task.findByIdAndUpdate(

    req.params.id,

    {
      status: "completed",
      reflection: req.body.reflection
    }

  );

  res.send("Goal completed successfully");
});


// DELETE API - Delete goal

app.delete("/tasks/:id", async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.send("Goal deleted successfully");
});


// Start server

app.listen(process.env.PORT, () => {

  console.log(
    `Server running on http://localhost:${process.env.PORT}`
  );

});