const express = require('express')
const taskRouter = require('./src/routes/task.router.js')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
require('./src/models/db')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// ROUTES


app.use("/api/task",taskRouter)



app.listen(PORT, () => {
    console.log("Server is running at port:", PORT)
})