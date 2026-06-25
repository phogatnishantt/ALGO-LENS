const express=require("express");
const router=express.Router();

const {
    startSession,
    endSession,
    getSessions,
    getSessionById,
    getUserSessions,
    getActiveSession
}=require("../controllers/sessionController");

router.post("/start",startSession);

router.post("/end/:id",endSession);

router.get("/",getSessions);

router.get("/active",getActiveSession);

router.get("/:id",getSessionById);

router.get("/user/:userId",getUserSessions);

module.exports=router;