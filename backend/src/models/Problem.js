const mongoose=require("mongoose");

const ProblemSchema=new mongoose.Schema({

    platform:{
        type:String,
        required:true
    },

    contestId:{
        type:String,
        required:true
    },

    problemIndex:{
        type:String,
        required:true
    },

    problemName:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        default:0
    },

    tags:{
        type:[String],
        default:[]
    },

    url:{
        type:String,
        required:true
    },

    solved:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model("Problem",ProblemSchema);