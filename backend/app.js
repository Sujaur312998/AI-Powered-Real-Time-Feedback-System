const express = require('express')
const app = express()
const http= require('http')
// const { Server }= require('socket.io')
const server = http.createServer(app)
const cors = require('cors')
const compression = require("compression")

const userRouter= require('./router')

require('dotenv').config()
//mongodb Database
require('./src/db/connectMongoose')

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRouter)

server.listen(process.env.PORT, () => {
    console.log(`Listening to the port : ${process.env.PORT} : ${process.pid} `)
})