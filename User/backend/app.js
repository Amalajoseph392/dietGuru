require('dotenv').config();
const express=require('express');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require("path");


const app=express();
const PORT=process.env.PORT;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//db connection(importing from config)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

connectDB();



// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
}));



//mw

app.use(express.json())

//api 

app.use('/api/auth',authRoutes)



//server
app.listen(PORT,()=>{
    console.log("server is running");
})