const express = require('express');
const app = express();
app.use(express.json());

const userMiddleware = require('../Middleware/userMiddleware');
const {User, Courses} = require('../Database/database')

app.post('/signup',(req,res)=>{
    User.create({
        username : req.body.username,
        password : req.body.password,
        name : req.body.name
    })

    .then(()=>{
        res.status(200).json({
            message : 'User Created Successfully!'
        })
    })
})

app.get('/courses',userMiddleware,(req,res)=>{

    Courses.find({}).then((courses)=>{
        courseList = [];

        for(let i=0;i<courses.length;i++)
        {
            const course1 = {
                Title : courses[i].title,
                Author : courses[i].author,
                Price : courses[i].price
            }

            courseList.push(course1);
        }

        res.status(200).json({
            courses:courseList
        })
    })
})

app.post('/courses/:title',userMiddleware,async(req,res)=>{
    
    const course = await Courses.findOne({title : req.params.title});
    if(!course)
    {
        res.send("Course Not found");
        return;
    }

    user = req.user;
    user.purchased_Courses.push(course._id);
    user.save();

    res.send("Course purchased Success");
})



app.get('/purchasedCourses',userMiddleware,async (req,res)=>{
    const user = req.user;
    purchasedCourses = user.purchased_Courses;
    list = [];
    for(let i=0;i<purchasedCourses.length; i++)
    {
        course = await Courses.findById(purchasedCourses[i]);
        list.push(course);
    }
    res.json({
        courses: list
    })
})

module.exports = app;