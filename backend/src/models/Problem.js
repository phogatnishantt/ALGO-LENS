const mongoose=require("mongoose");

const ProblemSchema=new mongoose.Schema({
    platform:{
        type:String,
        required:true
    },

    problemId:{
        type:String,
        required:true,
        unique:true
    },

    problemName:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        default:0
    },

    tags:[String],

    url:{
        type:String
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Problem",ProblemSchema);