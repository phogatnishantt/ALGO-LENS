const Session=require("../models/Session");

exports.getTotalTime=async(req,res)=>{
    try{
        const a=await Session.find({
            userId:req.params.userId,
            verdict:"Accepted"
        });

        let b=0;

        for(const c of a){
            b+=c.duration;
        }

        res.status(200).json({
            success:true,
            totalTime:b
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getAverageTime=async(req,res)=>{
    try{
        const a=await Session.find({
            userId:req.params.userId,
            verdict:"Accepted"
        });

        let b=0;

        for(const c of a){
            b+=c.duration;
        }

        const d=a.length?b/a.length:0;

        res.status(200).json({
            success:true,
            averageTime:d
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getProblemsSolved=async(req,res)=>{
    try{
        const a=await Session.countDocuments({
            userId:req.params.userId,
            verdict:"Accepted"
        });

        res.status(200).json({
            success:true,
            problemsSolved:a
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getSummary=async(req,res)=>{
    try{
        const a=await Session.find({
            userId:req.params.userId,
            verdict:"Accepted"
        });

        let b=0;

        for(const c of a){
            b+=c.duration;
        }

        const d=a.length;

        const e=d?b/d:0;

        res.status(200).json({
            success:true,
            totalProblems:d,
            totalTime:b,
            averageTime:e
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getDailyTime=async(req,res)=>{
    try{
        const a=await Session.find({
            userId:req.params.userId,
            verdict:"Accepted"
        });

        const b={};

        for(const c of a){
            const d=c.startTime.toISOString().split("T")[0];

            if(!b[d]){
                b[d]=0;
            }

            b[d]+=c.duration;
        }

        const e=[];

        for(const f in b){
            e.push({
                date:f,
                time:b[f]
            });
        }

        res.status(200).json({
            success:true,
            data:e
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getPlatformStats=async(req,res)=>{
    try{
        const a=await Session.find({
            userId:req.params.userId,
            verdict:"Accepted"
        }).populate("problemId");

        const b={};

        for(const c of a){
            const d=c.problemId.platform;

            if(!b[d]){
                b[d]=0;
            }

            b[d]++;
        }

        res.status(200).json({
            success:true,
            data:b
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};