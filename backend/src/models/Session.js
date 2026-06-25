const mongoose=require("mongoose");

const SessionSchema=new mongoose.Schema({

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
        enum:[
            "Pending",
            "Accepted",
            "Wrong Answer",
            "TLE",
            "MLE",
            "RE"
        ],
        default:"Pending"
    },
    status:{
    type:String,
    enum:["ACTIVE","COMPLETED"],
    default:"ACTIVE"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Session",SessionSchema);