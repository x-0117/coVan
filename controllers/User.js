const bcrypt = require('bcryptjs')
const axios = require('axios')

const User = require('../Model/User');

exports.login = (req, res) => {
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
                        "vaccinated" : user.vaccinated
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
                "message" : "You Are Not Registered Please Register First !"
            })
        }
    })
}

exports.register = (req, res) => {
    console.log(req.body)
    User.findOne({$or: [{email:req.body.values.email}, {phoneNumber:req.body.values.phoneNumber}]})
    .then(async user => {
        if(user){
            res.json({
                "message" : "User Exists With Same Phone Number Or Email Address !"
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
                date : "0-0-0",
                otp : 0
            })
            user.save()
            res.json({
                "message" : "Success"
            })
        }
    })
}

exports.mainPage = async (req, res , next) => {
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
                        for(let j=0;j<shit.sessions.length;j++){
                            if (shit.sessions[j].available_capacity > 0){
                                hospitalName = shit.name
                                hospitalId = shit.center_id
                                // console.log(hospitalId, hospitalName , shit.sessions[j].available_capacity)
                                let doc = await User.findOne({email : username})
                                if (doc.vaccinated == "No"){
                                    doc.hospitalName = hospitalName
                                    doc.hospitalId = hospitalId
                                    doc.location = lat + ' ' + long
                                    // console.log(date, doc.date)
                                    doc.date = date
                                    await doc.save()
                                    console.log(date, doc.date)
                                    await res.json({
                                        "message" : "Found",
                                        "date" : doc.date
                                    })
                                    return next();
                                }
                            }
                        }
                    }
                    catch(e){
                    }
                })
            }
        })
        .catch((error) => {console.log(error)})
        await res.json({
            "message" : "Found",
            "date" : doc.date
        })
        return next();
}

exports.getDate = async(req, res) => {
    let doc = await User.findOne({email : req.body.email})
    if(doc){
        res.json({
            "message" : "Found",
            "date" : doc.date
        })
    }
    else{
        res.json({
            "message" : "Not found"
        })
    }
}

exports.otp = async (req, res) => {
    let doc = await User.findOne({email : req.body.email})
    if(doc){
        res.json({
            "otp" : doc.otp
        })
    }
    else{
        res.json({
            "otp" : 0
        })
    }
    setTimeout(async()=>{
        doc.otp = 0
        await doc.save()
    },180000);
}

exports.status = async(req,res) => {
    let doc = await User.findOne({email : req.body.email})
    if(doc){
        res.json({
            "vaccinated" : doc.vaccinated
        })
    } else {
        res.json({
            "vaccinated" : "No"
        })
    }
}