const express = require('express')
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/task.controller.js')

const taskRouter = express.Router()


taskRouter.post("/add", createTask)

taskRouter.get("/get", getTasks)

taskRouter.post("/update/:id", updateTask)

taskRouter.get("/delete/:id", deleteTask)


module.exports = taskRouter