// mongodb+srv://x_117:<password>@cluster0.0u6lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const axios = require('axios')
const cors = require('cors')


const UserSchema = new mongoose.Schema({
  firstName : {type: String, required : true},
  lastName : {type: String, required : true},
  email : {type: String, required : true, unique : true},
  phoneNumber : {type: String, required : true, unique : true},
  password : {type: String, required : true},
  vaccinated : {type: String, required : true},
  hospitalName : {type: String, required : true},
  hospitalId : {type: String, required : true},
  location : {type: String, required: true},
  date : {type: String, required: true},
})
const User = mongoose.model('UserSchema', UserSchema)


app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
    console.log(req.body)
    var username = req.body.values.userName
    var password = req.body.values.password
    User.findOne({$or: [{email:username}, {phoneNumber:username}]})
    .then(async user => {
        if(user){
            if (await bcrypt.compare(password, user.password)){
                res.json({
                    "message" : "Success",
                    "values" : {
                        "name" : user.firstName + ' ' + user.lastName,
                        "email" : user.email,
                        "phone" : user.phoneNumber,
                        "dateChoosen" : user.date,
                    }
                })
            }
            else{
                res.json({
                    "message" : "User Exist But Wrong Password !"
                })
            }
        }
        else{
            res.json({
                "message" : "You are not registered Please Register First !"
            })
        }
    })
})

app.post('/register', (req, res) => {
    console.log(req.body)
    User.findOne({$or: [{email:req.body.values.email}, {phoneNumber:req.body.values.phoneNumber}]})
    .then(async user => {
        if(user){
            res.json({
                "message" : "User Exists !"
            })
        }
        else{
            var hashedPass = await bcrypt.hash(req.body.values.password, 10)
            var user = new User({
                firstName : req.body.values.firstName,
                lastName : req.body.values.lastName,
                email : req.body.values.email,
                phoneNumber : req.body.values.phoneNumber,
                password : hashedPass,
                vaccinated : "No",
                hospitalName : "Something",
                hospitalId : "0",
                location : "-1 -1",
                date : "0-0-0"
            })
            user.save()
            res.json({
                "message" : "Success"
            })
        }
    })
})


app.post('/mainPage', async (req, res) => {
    lat = req.body.values.lat
    long = req.body.values.long
    date = req.body.values.date
    date = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0]
    console.log(lat , long)
    username = req.body.username
    let doc1 = await User.findOne({email : username})
    oldDate = doc1.date
    findCenter = "https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=" + lat + "&long=" + long
    hospitalName = "Something"
    hospitalId = 0
    axios.get(findCenter)
    .then((response) => {
            centers = response.data.centers.map((content, index) => {
            return response.data.centers[index].center_id
            })
            for (i=0; i<centers.length; i++){
                findVac = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=' + centers[i] + '&date=' + date
                axios.get(findVac).then(async (resp) => {
                    try{
                        console.log(resp.data)
                        shit = resp.data.centers
                        // console.log(shit.sessions[0].available_capacity)
                        if (shit.sessions[0].available_capacity > 0){
                            hospitalName = shit.name
                            hospitalId = shit.center_id
                            // console.log(hospitalId, hospitalName)
                            let doc = await User.findOne({email : username})
                            if (doc.vaccinated == "No"){
                                doc.hospitalName = hospitalName
                                doc.hospitalId = hospitalId
                                doc.location = lat + ' ' + long
                                // console.log(date, doc.date)
                                doc.date = date
                                await doc.save()
                                // console.log("Assigned!")
                            }
                            else{
                                // console.log("Vaccinated!")
                            }
                            return
                        }
                        else{
                            // console.log("No vaccines")
                        }
                    }
                    catch(e){
                        // console.log("Error")
                    }
                })
            }
        })
        .catch((error) => {console.log(error)})
        // let doc2 = await User.findOne({email : username})
        if (oldDate == date){
            res.json({
                "message" : "Not Assigned"
            })
        }
        else{
            res.json({
                "message" : "Assigned"
            })
        }
    })
    .on("error", (err) => {
        console.log(err)
})


app.post('/redirects', (req, res) => {
    shit = req.body.variable
    console.log(shit)
    if (shit == "login"){
        res.redirect('/login')
    }
    else if (shit == "register"){
        res.redirect('/registration')
    }
})


app.post('/adM1n', (req, res) => {
    username = req.body.username
    password = req.body.password
    mongoose.connect('mongodb+srv://' + username + ':' + password + '@cluster0.0u6lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true} ).then((response) => {
        res.json({
            "message" : "success"
        })
    }).catch((error) => {
        res.json({
            "message" : "failure"
        })
    })
})


app.post('/f1ndU53r', async (req, res) => {
    username = req.body.username
    hospitalId = req.body.hospitalId
    let doc = await User.findOne({$and: [{$or: [{email:username}, {phoneNumber:username}]}, {hospitalId:hospitalId}]})
    if (doc){
        res.json({
            "message" : "Found",
            "data" : {
                "name" : doc.firstName + ' ' + doc.lastName,
                "phoneNumber" : doc.phoneNumber,
                "location" : doc.location
            }
        })
    }
    else{
        res.json({
            "message" : "Not found"
        })
    }
})


app.post('/otp', async (req, res) => {
    let doc = await User.findOne({email : req.body.email})
    doc.otp = req.body.otp
    doc.vaccinated = "Yes"
    await doc.save()
})


app.post('/getOtp', async (req, res) => {
    let doc = await User.findOne({email : req.body.email})
    res.json({
        "otp" : doc.otp
    })
})


mongoose.connect('mongodb+srv://x_117:JAbPuF8g5zCD1pwX@cluster0.0u6lv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true} ).then((response) => {
    console.log("Connected!!")
    app.listen(4000)
}).catch((error) => {
    console.log(error)
})


// https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=22.54&long=88.30
// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id=1234&date=31-03-2021
// 22.546014, 88.307579
