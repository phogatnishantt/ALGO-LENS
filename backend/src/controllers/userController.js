const User=require("../models/User");

const createUser=async(req,res)=>{
    try{
        const a=await User.create(req.body);
        res.status(201).json(a);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
};

module.exports={createUser};