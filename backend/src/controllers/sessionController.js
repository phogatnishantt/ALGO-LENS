const Session=require("../models/Session");

exports.startSession=async(req,res)=>{
    try{

        const a=await Session.create({
            contestId:req.body.contestId,
            problemIndex:req.body.problemIndex,
            problemName:req.body.problemName,
            startTime:new Date()
        });

        res.status(201).json({
            success:true,
            sessionId:a._id,
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

        a.attempts=req.body.attempts || 0;

        a.verdict=req.body.verdict || "Pending";
        a.status="COMPLETED";

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
    try{

        const a=await Session.find();

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

exports.getSessionById=async(req,res)=>{
    try{

        const a=await Session.findById(
            req.params.id
        );

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

        const a=await Session.find();

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

exports.getActiveSession=async(req,res)=>{
    try{

        const a=await Session.findOne({
            status:"ACTIVE"
        }).sort({
            createdAt:-1
        });

        if(!a){
            return res.status(404).json({
                success:false,
                message:"No active session"
            });
        }

        res.status(200).json({
            success:true,
            data:a
        });

    }catch(e){

        res.status(500).json({
            success:false,
            message:e.message
        });

    }
};