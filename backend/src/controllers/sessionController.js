const Session=require("../models/Session");

exports.startSession=async(req,res)=>{

    try{

        const a=new Date();

        const b=await Session.create({

            contestId:req.body.contestId,

            problemIndex:req.body.problemIndex,

            problemName:req.body.problemName,

            startTime:a,

            lastResumeTime:a,

            status:"ACTIVE"

        });

        res.status(201).json({

            success:true,

            sessionId:b._id,

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

exports.pauseSession=async(req,res)=>{

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

        if(a.status!=="ACTIVE"){

            return res.status(400).json({

                success:false,

                message:"Session is not active"

            });

        }

        const b=new Date();

        a.totalDuration+=Math.floor(

            (b-a.lastResumeTime)/1000

        );

        a.status="PAUSED";

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

exports.resumeSession=async(req,res)=>{

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

        if(a.status!=="PAUSED"){

            return res.status(400).json({

                success:false,

                message:"Session is not paused"

            });

        }

        a.lastResumeTime=new Date();

        a.status="ACTIVE";

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

exports.completeSession=async(req,res)=>{

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

        if(a.status==="ACTIVE"){

            const b=new Date();

            a.totalDuration+=Math.floor(

                (b-a.lastResumeTime)/1000

            );

        }

        a.endTime=new Date();

        a.status="COMPLETED";

        a.attempts=req.body.attempts||0;

        a.verdict=req.body.verdict||"Pending";

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

exports.getActiveSession=async(req,res)=>{

    try{

        const a=await Session.findOne({

            status:{
                $in:["ACTIVE","PAUSED"]
            }

        }).sort({

            createdAt:-1

        });

        if(!a){

            return res.status(404).json({

                success:false,

                message:"No Active Session"

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