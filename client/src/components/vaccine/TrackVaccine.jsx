import React , {useState , useEffect} from 'react'
import { Redirect } from 'react-router'
import Navbars from '../UI/Navbar';
import {Grow , Paper , Grid , Typography , Button} from '@material-ui/core';
import axios from 'axios';

const TrackVaccine = (props) => {
    const [Otp , setOtp] = useState({Otp : 0});
    const [Clicked , setClicked] = useState(false);
    const [Vaccinated,setVaccinated] = useState("No");
    useEffect(() =>{
        axios.post('/status' , {
            email : props.location.state.values.email
        })
        .then(res => {
            setVaccinated({Vaccinated : res.data.vaccinated})
        })
        .catch(err => {
            console.log(err)
        })
    } , [props.location.state.values.email])
    if(typeof props.location.state === 'undefined'){
        return <Redirect to='/login'/>
    }
    const name = props.location.state.values.name;
    const getOTP = (event) => {
        event.preventDefault();
        axios.post("/getOtp",{
            email : props.location.state.values.email
        })
            .then(res => {
                setOtp({
                    ...Otp,
                    Otp : res.data.otp,
                })
                setClicked({
                    Clicked : true
                })
            })
    }
    let message = "";
    if(Clicked && Otp.Otp === 0){
        message = "Your OTP will be generaed by Admin On Due Date"
    } else if (Clicked && Otp.Otp !== 0) {
        message = `Your OTP is ${Otp.Otp}`
    }
    let data;
    if(Vaccinated.Vaccinated === 'No'){
        data = (
            <Grow in={true} timeout={1000}>
                <Paper elevation={6} style={{padding : '50px 20px' , margin : '140px 15% 0% 15%'}}>
                <div style={{fontSize : 120 , textAlign : 'center', color : "lightgreen" , marginBottom : 20}}>
                    <i className="fas fa-syringe"></i>
                </div>
                <Typography variant="h4" color="secondary" align="center">Your Vaccination is Pending on {props.location.state.date}</Typography>
                <Grid container spacing={5} style={{padding : 30}} >
                    <Grid container item lg={12} style={{marginTop : '20px' , fontSize : '20px'}}>
                        <Button variant="contained" color="primary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={getOTP}>
                            Get Your OTP
                        </Button>
                    </Grid>
                </Grid>
                <Typography variant="h6" align="center">
                    {message}
                </Typography>
                </Paper>
            </Grow>
        )
    } else {
        data = (
            <Grow in={true} timeout={1000}>
                <Paper elevation={6} style={{padding : '50px 20px' , margin : '140px 15% 0% 15%'}}>
                <div style={{fontSize : 120 , textAlign : 'center', color : "lightgreen" , marginBottom : 20}}>
                    <i className="fas fa-check"></i>
                </div>
                <Typography variant="h4" color="secondary" align="center" gutterBottom>Your Vaccination is Done !</Typography>
                <Typography variant="h6" color="primary" align="center">Thank You For Your Co-operation , We Wish You and Your Family Good Luck</Typography>
                </Paper>
            </Grow>
        )
    }
    return (
        <>
            <Navbars names={name}/>
            {data}
        </>
    )
}

export default TrackVaccine
