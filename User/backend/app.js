require('dotenv').config();
const express=require('express');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');


const app=express();
const PORT=process.env.PORT;

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