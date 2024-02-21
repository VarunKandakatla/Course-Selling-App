const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://username-feb-01:password-feb-01@cluster-feb-01.igcy0e9.mongodb.net/test-02");

const adminSchema = new mongoose.Schema({
    name : String,
    username: String,
    password: String,
    courses_Uploaded: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Courses'
    }]
})

const userSchema = new mongoose.Schema({
    name : String,
    username:String,
    password : String,
    purchased_Courses:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Courses'
    }]
})

const courseSchema = new mongoose.Schema({
    title : String,
    author : String,
    price : Number,
    is_Published : Boolean
})

const Admin = mongoose.model('admin',adminSchema);
const User = mongoose.model('user',userSchema);
const Courses = mongoose.model('courses',courseSchema);

module.exports = {Admin,User,Courses};