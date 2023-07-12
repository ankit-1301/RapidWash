const express=require('express')
const dotenv=require('dotenv').config()
const cookieParser = require('cookie-parser');
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port =process.env.PORT ||5000
const frontend = process.env.FRONTEND
connectDB()

const cors=require('cors')
const app=express()

app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://rapidwash.netlify.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // add this line to allow cookie access
  next();
});
const corsOptions = {
  origin: ["https://rapidwash.netlify.app/",{frontend}],
  credentials: true, 
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users' , require('./routes/userR'))
app.use('/api/washerman' , require('./routes/washermanR'))
app.use('/api/order' , require('./routes/orderR'))
app.use('/api/delivery' , require('./routes/deliveryboyR'))
app.use(errorHandler)
app.listen(port,() =>console.log(`server start on port ${port}`))
