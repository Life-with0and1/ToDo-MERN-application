const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },

})

const taskModel = mongoose.model("task", taskSchema)


module.exports = taskModel