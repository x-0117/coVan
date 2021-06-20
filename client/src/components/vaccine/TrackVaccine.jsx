import React , {useState} from 'react'
import { Redirect } from 'react-router'
import Navbars from '../UI/Navbar';
import {Grow , Paper , Grid , Typography , Button} from '@material-ui/core';
import axios from 'axios';

const TrackVaccine = (props) => {
    const [Otp , setOtp] = useState(0);
    const [Clicked , setClicked] = useState(false);
    if(typeof props.location.state === 'undefined'){
        return <Redirect to='/login'/>
    }
    const name = props.location.state.values.name;
    const getOTP = (event) => {
        event.preventDefault();
        axios.get("http://localhost:4000/otp")
            .then(res => {
                if(res.data.otp !== 0){
                    console.log(Otp)
                    setOtp({
                        ...Otp,
                        Otp : res.data.otp,
                    })
                }
                setClicked({
                    Clicked : true
                })
            })
    }
    let message = "";
    if(Clicked && Otp === ''){
        message = "Your OTP will be generaed by Admin On Due Date"
    } else if (Clicked && Otp !== '') {
        message = `Your OTP is ${Otp}`
    }
    return (
        <>
            <Navbars names={name}/>
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
        </>
    )
}

export default TrackVaccine
