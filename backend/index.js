const express = require('express');
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const signupRoute = require('./Routes/SignupRoute');
const loginRoute = require('./Routes/loginRoute');
const contactRoute = require('./Routes/ContactRoute');
const managerRoute = require('./Routes/managerRoute');
const url = "mongodb://127.0.0.1:27017/SmartCanteenUser";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/signup',signupRoute);
app.use('/api/login',loginRoute);
app.use('/api/contact',contactRoute);
app.use('/api/manager', managerRoute);


mongoose.connect(url)
.then(()=>console.log("Mongoose connect successfully"))
.catch((err)=>console.log(`Error: ${err}`));



app.listen(port, ()=>console.log(`Server is running port ${port}`));