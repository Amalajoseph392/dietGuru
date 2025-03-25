require('dotenv').config();
const express=require('express');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes')


const app=express();
const PORT=process.env.PORT;

//db connection(importing from config)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

connectDB();

//mw

app.use(express.json())

//api 

app.use('/api/auth',authRoutes)



//server
app.listen(PORT,()=>{
    console.log("server is running");
})