const express = require('express')
const app = express()
const http = require('http')
// const { Server }= require('socket.io')
const server = http.createServer(app)
const cors = require('cors')
const compression = require("compression")

const userRouter = require('./src/router/userRouter')
const productRouter = require('./src/router/productRoute')
const orderRouter = require('./src/router/orderRoute')
const geminiRouter = require('./src/router/geminiRouter')

require('dotenv').config()
//mongodb Database
require('./src/DB/connectMongoose')

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/gemini', geminiRouter)

server.listen(process.env.PORT, () => {
    console.log(`Listening to the port : ${process.env.PORT} : ${process.pid} `)
})


let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

var reviews=[]

const getReview = (review) => {
    reviews=review
}

const editReview = (reviewObj) => {
    // Find the index of the reviews with the matching _id
    const index = reviews.findIndex(item => item._id === reviewObj._id);

    console.log(reviews,index);

    if (index !== -1) {
        reviews[index] = reviewObj;
    } else {
        reviews.push(reviewObj);
    }
}

const allowedOrigins = [
    "https://ai-feedback.onrender.com",
    "http://localhost:5173"
  ];
  
  const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
          origin: (origin, callback) => {
              if (allowedOrigins.includes(origin)) {
                  callback(null, true); 
              } else {
                  callback(new Error("Origin not allowed by CORS")); 
              }
          },
          credentials: true,
          optionsSuccessStatus: 200,
      },
  });


io.on("connection", (socket) => {
    socket.on('addUser', userId => {
        userId ? addUser(userId, socket.id) : null
        io.emit("getUsers", users)
    })

    socket.on('customerFeedback', feedback => {
        getReview(feedback);
        io.emit("getCustomerFeedbback", reviews)
    })

    socket.on('editCustomerFeedback', feedbackObj => {
        editReview(feedbackObj);
        io.emit("getCustomerFeedbback", reviews)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
        io.emit("getUsers", users)
        socket.leave(socket.id);
    });
});