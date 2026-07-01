const express=require("express");
const cors=require("cors");

const app=express();
const userRoutes=require("./routes/userRoutes");
const problemRoutes=require("./routes/problemRoutes");
const sessionRoutes=require("./routes/sessionRoutes");
const analyticsRoutes=require("./routes/analyticsRoutes");
const aiRoutes=require("./routes/aiRoutes");


app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/problems",problemRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/analytics",analyticsRoutes);
app.use("/api/ai",aiRoutes);

app.get("/",(req,res)=>{
    res.send("AlgoLens Backend Running");
});

module.exports=app;