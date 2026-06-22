const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }
    catch(e){
        console.log("Database Connection Failed");
        console.log(e.message);
        process.exit(1);
    }
};

module.exports=connectDB;