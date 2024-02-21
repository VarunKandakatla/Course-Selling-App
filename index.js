const express = require('express');
const app = express();
app.listen(3000);


const adminRouter = require("./Routes/admin");
const userRouter = require("./Routes/user");

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.get('*',(req,res)=>{
    res.send('Route not found!');
})

app.use((err,req,res,next)=>{
    res.status(403).json({
        message : "Something Error Occured!"
    })
})


