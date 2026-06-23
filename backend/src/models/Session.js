const mongoose=require("mongoose");

const SessionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },

    startTime:{
        type:Date,
        required:true
    },

    endTime:{
        type:Date
    },

    duration:{
        type:Number,
        default:0
    },

    attempts:{
        type:Number,
        default:0
    },

    verdict:{
    type:String,
    enum:["Pending","Accepted","Wrong Answer","TLE","MLE","RE"],
    default:"Pending"
},

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Session",SessionSchema);