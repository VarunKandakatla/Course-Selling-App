const express = require('express');
const app = express();
app.use(express.json());

const {Admin, Courses} = require("../Database/database");
const AuthenticationMiddleware = require('../Middleware/adminMiddleware')

app.post('/signup',(req,res)=>{

    Admin.create({
        username : req.body.username,
        password : req.body.password,
        name : req.body.name,
    })

    .then(()=>{
        res.status(200).json({
            message: 'Admin Created Successfully'
        })
    })
})

app.post('/courses',AuthenticationMiddleware ,(req,res)=>{

    Courses.create({
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        is_Published : req.body.isPublished
    })

    .then((course)=>{
        admin = req.admin;
        admin.updateOne({_id: admin._id},{$push:{courses_Uploaded : course._id}})

        // admin.courses_Uploaded.push(course._id);
        // admin.save();

        .then((admin)=>{
            res.status(200).json({
                message : "Course created Successfully",
                courseId : course._id
            });
        })
    })
})

app.get('/courses', AuthenticationMiddleware, (req,res)=>{

    Courses.find({}).then((courseList)=>{

        res.json(courseList)
    })
})


module.exports = app;