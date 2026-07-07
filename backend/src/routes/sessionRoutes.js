const express=require("express");
const router=express.Router();

const{

    startSession,
    pauseSession,
    resumeSession,
    completeSession,
    completeSessionAuto,
    getSessions,
    getSessionById,
    getUserSessions,
    getActiveSession,
    incrementWrongSubmission,
    incrementSuccessfulRun

}=require("../controllers/sessionController");

router.post("/start",startSession);

router.post("/pause/:id",pauseSession);

router.post("/resume/:id",resumeSession);

router.post("/complete/:id",completeSession);

router.patch(
    "/:id/wrong-submission",
    incrementWrongSubmission
);

router.patch(
    "/:id/successful-run",
    incrementSuccessfulRun
);

router.get("/",getSessions);

router.get("/active",getActiveSession);

router.get("/user/:userId",getUserSessions);

router.get("/:id",getSessionById);

router.post(
    "/complete-auto",
    completeSessionAuto
);

module.exports=router;