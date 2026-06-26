const express=require("express");
const router=express.Router();

const{
    createProblem,
    getProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getLatestProblem
}=require("../controllers/problemController");

router.post("/",createProblem);

router.get("/",getProblems);

router.get("/latest",getLatestProblem);

router.get("/:id",getProblemById);

router.put("/:id",updateProblem);

router.delete("/:id",deleteProblem);

router.get("/latest",getLatestProblem);

module.exports=router;