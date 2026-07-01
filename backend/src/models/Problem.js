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

    statement:{
        type:String,
        default:""
    },

    constraints:{
        type:String,
        default:""
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
    },

    hints:{
    type:[
        {
            level:Number,
            text:String
        }
    ],
    default:[]
},

    aiGenerated:{
        type:Boolean,
        default:false
    },

    generatedAt:{
        type:Date
    },

    sampleTests:{
        type:[
            {
                title:String,
                input:String,
                expectedOutput:String
            }
        ],
        default:[]
    },

    edgeCases:{
        type:[
            {
                title:String,
                description:String,
                unlockAfter:Number,
                input:String,
                expectedOutput:String
            }
        ],
        default:[]
    }

});

ProblemSchema.index({

    platform:1,

    contestId:1,

    problemIndex:1

},{
    unique:true
});

module.exports=mongoose.model("Problem",ProblemSchema);