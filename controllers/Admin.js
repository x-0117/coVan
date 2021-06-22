const User = require('../Model/User');
const mongoose = require('mongoose');

exports.admin = (req, res) => {
    username = req.body.username
    password = req.body.password
    mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0.0u6lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true} ).then((response) => {
        res.json({
            "message" : "Success"
        })
    }).catch((error) => {
        res.json({
            "message" : "Wrong Username Or Password ! Please Try Again"
        })
    })
}

exports.findUser = async (req, res) => {
    const username = req.body.username
    const hospitalId = req.body.hospitalID
    let doc = await User.findOne({$and: [{$or: [{email:username}, {phoneNumber:username}]}, {hospitalId:hospitalId}]})
    if (doc){
        res.json({
            "message" : "Success",
            "values" : {
                "name" : doc.firstName + ' ' + doc.lastName,
                "email" : doc.email,
                "phone" : doc.phoneNumber,
                "location" : doc.location,
                "vaccinated" : doc.vaccinated,
                "date" : doc.date
            }
        })
    }
    else{
        res.json({
            "message" : "User Not Found ! This User Is Not Associated With Your Hospital"
        })
    }
}

exports.otp = async (req, res) => {
    let doc = await User.findOne({email : req.body.email})
    if(doc){
        doc.otp = req.body.otp
        await doc.save()
        res.json({
            "message" : "Success"
        })
    }else{
        res.json({
            "message" : "Not found"
        })
    }
}

exports.vaccinated = async (req, res) => {
    let doc = await User.findOne({email : req.body.email})
    if(doc){
        doc.vaccinated = "Yes"
        doc.otp = 0
        await doc.save()
        res.json({
            "message" : "Success"
        })
    }
    else{
        res.json({
            "message" : "Not found"
        })
    }
}

