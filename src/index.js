const express=require('express')
const Userroute=require('./router/userRoute')
const Taskroute=require('./router/taskRoute')
const jwt=require('jsonwebtoken')
require('./db/mongoose')

//getting started with express

const app = express()

//setting up our port (env.port= for uploading work at heroku)

const port = process.env.PORT || 3000



app.use(express.json())

//calling our routes

app.use(Userroute)
app.use(Taskroute)

//for setting up your server

app.listen(port,()=>{
console.log('server is up on port '+port)
})


