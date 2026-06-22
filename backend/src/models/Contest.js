const mongoose=require("mongoose");

const ContestSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    platform:{
        type:String,
        required:true
    },

    contestId:{
        type:String,
        required:true
    },

    contestName:{
        type:String,
        required:true
    },

    rank:{
        type:Number
    },

    oldRating:{
        type:Number
    },

    newRating:{
        type:Number
    },

    date:{
        type:Date
    }
});

module.exports=mongoose.model("Contest",ContestSchema);