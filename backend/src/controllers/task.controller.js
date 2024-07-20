const taskModel = require("../models/task.model.js")


const createTask = async (req, res) => {
    const { name,isCompleted } = req.body
    if(!name || name.length < 3) return res.status(500).json({  message: "Invalid task name.", success: false })
    try {
        const data = await taskModel.create({name,isCompleted})
        return res.status(201).json({ data, message: "Task added successfully.", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Failed to create task.", success: false })
    }
}


const getTasks = async (req, res) => {
    try {
        const data = await taskModel.find({})
        return res.status(201).json({ message: "All Tasks.", data, success: true })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch tasks.", success: false })
    }
}

const updateTask = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const updated = { $set: { ...data } }
    try {
        const data = await taskModel.findByIdAndUpdate(id, updated)
        return res.status(200).json({ message: "Task updated.", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Failed to update task.", success: false })
    }
}




const deleteTask = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        await taskModel.findByIdAndDelete(id)
        return res.status(200).json({ message: "Task deleted.", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete task.", success: false })
    }
}


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}