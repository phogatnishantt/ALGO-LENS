const express=require("express");
const router=express.Router();

const {
    startSession,
    endSession,
    getSessions,
    getSessionById,
    getUserSessions
}=require("../controllers/sessionController");

router.post("/start",startSession);

router.post("/end/:id",endSession);

router.get("/",getSessions);

router.get("/:id",getSessionById);

router.get("/user/:userId",getUserSessions);

module.exports=router;