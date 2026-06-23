const Session=require("../models/Session");

exports.startSession=async(req,res)=>{
    try{
        const a=await Session.create({
            userId:req.body.userId,
            problemId:req.body.problemId,
            startTime:new Date()
        });

        res.status(201).json({
            success:true,
            data:a
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.endSession=async(req,res)=>{
    try{
        const a=await Session.findById(req.params.id);

        if(!a){
            return res.status(404).json({
                success:false,
                message:"Session not found"
            });
        }

        const b=new Date();

        a.endTime=b;
        a.duration=Math.floor(
            (b-a.startTime)/1000
        );

        a.attempts=req.body.attempts;
        a.verdict=req.body.verdict;

        await a.save();

        res.status(200).json({
            success:true,
            data:a
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getSessions=async(req,res)=>{
    const a=await Session.find()
        .populate("userId")
        .populate("problemId");

    res.json(a);
};

exports.getSessionById=async(req,res)=>{
    try{
        const a=await Session.findById(req.params.id)
            .populate("userId")
            .populate("problemId");

        if(!a){
            return res.status(404).json({
                success:false,
                message:"Session not found"
            });
        }

        res.status(200).json({
            success:true,
            data:a
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getUserSessions=async(req,res)=>{
    try{
        const a=await Session.find({
            userId:req.params.userId
        })
        .populate("problemId");

        res.status(200).json({
            success:true,
            count:a.length,
            data:a
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};