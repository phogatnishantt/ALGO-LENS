const express=require("express");
const router=express.Router();

const {
    getTotalTime,
    getAverageTime,
    getProblemsSolved,
    getSummary,
    getDailyTime,
    getPlatformStats
}=require("../controllers/analyticsController");

router.get("/total-time/:userId",getTotalTime);

router.get("/average-time/:userId",getAverageTime);

router.get("/problems-solved/:userId",getProblemsSolved);

router.get("/summary/:userId",getSummary);

router.get("/daily-time/:userId",getDailyTime);

router.get("/platforms/:userId",getPlatformStats);

module.exports=router;