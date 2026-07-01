const express=require("express");

const router=express.Router();

const {getHints}=require("../controllers/aiController");

router.post("/hints",getHints);

module.exports=router;