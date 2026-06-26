const express=require("express");
const router=express.Router();

const{

    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    getSessions,
    getSessionById,
    getUserSessions,
    getActiveSession

}=require("../controllers/sessionController");

router.post("/start",startSession);

router.post("/pause/:id",pauseSession);

router.post("/resume/:id",resumeSession);

router.post("/complete/:id",completeSession);

router.get("/",getSessions);

router.get("/active",getActiveSession);

router.get("/user/:userId",getUserSessions);

router.get("/:id",getSessionById);

module.exports=router;