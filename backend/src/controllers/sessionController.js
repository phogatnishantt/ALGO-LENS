const Session=require("../models/Session");

exports.startSession=async(req,res)=>{

    try{

        console.log("Incoming request:",req.body);

        const x=await Session.findOne({
    status:"ACTIVE"
}).sort({
    createdAt:-1
});

if(
    x &&
    (
        x.contestId!==req.body.contestId ||
        x.problemIndex!==req.body.problemIndex
    )
){

    x.totalDuration+=Math.floor(
        (new Date()-x.lastResumeTime)/1000
    );

    x.status="PAUSED";

    await x.save();

}

        const a=await Session.findOne({

            contestId:req.body.contestId,

            problemIndex:req.body.problemIndex,

            status:"ACTIVE"

        });

        console.log("Found active session:",a);

        if(a){

            return res.status(200).json({

                success:true,

                sessionId:a._id,

                data:a

            });

        }

        const b=await Session.findOne({

            contestId:req.body.contestId,

            problemIndex:req.body.problemIndex,

            status:"PAUSED"

        }).sort({

            createdAt:-1

        });

        console.log("Found paused session:",b);

        if(b){

            b.lastResumeTime=new Date();

            b.status="ACTIVE";

            await b.save();

            return res.status(200).json({

                success:true,

                sessionId:b._id,

                data:b

            });

        }

        console.log("Creating NEW session");

        const c=new Date();

        const d=await Session.create({

            contestId:req.body.contestId,

            problemIndex:req.body.problemIndex,

            problemName:req.body.problemName,

            startTime:c,

            lastResumeTime:c,

            totalDuration:0,

            attempts:0,

            verdict:"Pending",

            status:"ACTIVE"

        });

        res.status(201).json({

            success:true,

            sessionId:d._id,

            data:d

        });

    }

    catch(e){

        console.log(e);

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

        a.totalDuration+=Math.floor(

            (new Date()-a.lastResumeTime)/1000

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

            a.totalDuration+=Math.floor(

                (new Date()-a.lastResumeTime)/1000

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

        const a=await Session.find().sort({

            createdAt:-1

        });

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

        const a=await Session.find().sort({

            createdAt:-1

        });

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

exports.incrementWrongSubmission=async(req,res)=>{

    try{

        const a=await Session.findById(req.params.id);

        if(!a){

            return res.status(404).json({
                success:false,
                message:"Session not found"
            });

        }

        a.wrongSubmissions++;

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

exports.incrementSuccessfulRun=async(req,res)=>{

    try{

        const a=await Session.findById(req.params.id);

        if(!a){

            return res.status(404).json({
                success:false,
                message:"Session not found"
            });

        }

        a.successfulRuns++;

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

exports.completeSessionAuto=async(req,res)=>{

    try{

        const a=await Session.findOne({

            contestId:req.body.contestId,

            problemIndex:req.body.problemIndex,

            status:"ACTIVE"

        });

        if(!a){

            return res.status(200).json({

                success:true,

                message:"No active session"

            });

        }

        a.totalDuration+=Math.floor(

            (new Date()-a.lastResumeTime)/1000

        );

        a.endTime=new Date();

        a.status="COMPLETED";

        a.verdict=req.body.verdict||"Accepted";

        a.attempts=req.body.attempts||a.attempts;

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