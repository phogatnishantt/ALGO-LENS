const Problem=require("../models/Problem");

exports.createProblem=async(req,res)=>{
    try{

        console.log("BODY:",req.body);

        const a=await Problem.create(req.body);

        console.log("SAVED:",a);

        res.status(201).json({
            success:true,
            data:a
        });

    }
    catch(e){

        console.log("ERROR:",e);

        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};

exports.getProblems=async(req,res)=>{
    try{
        const a=await Problem.find();

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

exports.getProblemById=async(req,res)=>{
    try{
        const a=await Problem.findById(req.params.id);

        if(!a){
            return res.status(404).json({
                success:false,
                message:"Problem not found"
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

exports.updateProblem=async(req,res)=>{
    try{
        const a=await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );

        if(!a){
            return res.status(404).json({
                success:false,
                message:"Problem not found"
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

exports.deleteProblem=async(req,res)=>{
    try{
        const a=await Problem.findByIdAndDelete(req.params.id);

        if(!a){
            return res.status(404).json({
                success:false,
                message:"Problem not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Problem deleted"
        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
};