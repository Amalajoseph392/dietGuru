const mongoose= require ('mongoose');

//cnctn

const connectDB=async()=>
{
    try{
        await mongoose.connect(process.env.DB_url);
        console.log("db connected");
    }
    catch(err){
        console.log("db connection failed", err.message);
        process.exit(1);
 }
    
};

module.exports=connectDB;