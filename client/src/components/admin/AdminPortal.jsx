import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbars from '../UI/Navbar';
import {Grow , Paper , Typography , Grid , Button } from '@material-ui/core';
import Inputs from '../UI/Input';
import axios from 'axios';

const Profile = (props) => {
    const [values, setValues] = React.useState({email : '', errorMessage : ''});
    const [userDetails,setuserDetails] = React.useState({
        name : '' , 
        email : '' , 
        phone : '' , 
        date : '' ,
        location : '',
        vaccinated : '' 
    })
    const [otp,setotp] = React.useState({otp : 0 , errorOtp : ''});
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    if(typeof props.location.state === 'undefined'){
        return <Redirect to='/adM1n'/>
    }
    const postData = (e) => {
        e.preventDefault();
        setuserDetails({
            ...values,
            name : ''
        })
        axios.post("/f1nduser",{
            username : values.email,
            hospitalID : props.location.state.values.hospitalID
        })
        .then(res => {
            if(res.data.message === 'Success'){
                setValues({
                    ...values,
                    errorMessage : ""
                })
                setuserDetails({
                    ...userDetails,
                    name : res.data.values.name,
                    email : res.data.values.email,
                    phone : res.data.values.phone,
                    date : res.data.values.date,
                    location : res.data.values.location,
                    vaccinated : res.data.values.vaccinated,
                })
            } else {
                setValues({
                    ...values,
                    errorMessage : res.data.message
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const postVaccine = () => {
        axios.post("/vaccinated" , {
            email : userDetails.email })
            .then(res => {
                if(res.data.message === 'Success'){
                    setuserDetails({...userDetails , vaccinated : "Yes"});
                    setotp({
                        ...otp,
                        otp : 0
                    })
                } 
            })
            .catch(err => {
                console.log(err);
            })
    }
    const postOTP = () => {
        const Otpmessage = Math.floor(100000 + Math.random() * 900000);
        axios.post("/otp" , {
            otp : Otpmessage ,
            email : userDetails.email
        })
            .then(res => {
                if(res.data.message === 'Success'){
                    setotp({...otp , otp : Otpmessage});
                } else {
                    setotp({
                        ...otp,
                        errorOtp : res.data.message
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const data = userDetails.name !== '' ? (
        <Grow in={true} timeout={1000}>
            <Paper elevation={6} style={{padding : '20px 20px' , margin : '20px 15% 10px 15%'}}>
            <Typography variant='h4' color='primary' gutterBottom>User Details</Typography>
            <Grid container spacing={5} style={{padding : 5}} item={true}>
                <Grid lg={6} container item={true}>
                    <Typography variant='h6' color='primary' gutterBottom style={{margin : 0}}>Name : <span style={{color: "red"}}>{userDetails.name}</span></Typography>
                </Grid>
                <Grid lg={6} container item={true}>
                    <Typography variant='h6' color='primary' gutterBottom style={{margin : 0}}>Email : <span style={{color: "red"}}>{userDetails.email}</span></Typography>
                </Grid>
                <Grid lg={6} container item={true}>
                    <Typography variant='h6' color='primary' gutterBottom style={{margin : 0}}>Phone : <span style={{color: "red"}}>{userDetails.phone}</span></Typography>
                </Grid>
                <Grid lg={6} container item={true}>
                    <Typography variant='h6' color='primary' gutterBottom style={{margin : 0}}>Date : <span style={{color: "red"}}>{userDetails.date}</span></Typography>
                </Grid>
                <Grid lg={6} container item={true}>
                    <Typography variant='h6' color='primary' gutterBottom style={{margin : 0}}>Vaccination Status : <span style={{color: "red"}}>{userDetails.vaccinated}</span></Typography>
                </Grid>
                <Grid lg={6} container item={true}>
                    <Typography variant='h6' color='primary' gutterBottom style={{margin : 0}}>Latitude and Longitude : <span style={{color: "red"}}>{userDetails.location}</span></Typography>
                </Grid>
                {userDetails.vaccinated === 'No' ? 
                (<>
                    <Grid lg={6} container item={true} style={{marginTop : '20px' , fontSize : '20px'}}>
                        <Button variant="contained" color="primary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={postOTP}>
                            Generate OTP
                        </Button>
                    </Grid>
                    <Grid lg={6} container item={true} style={{marginTop : '20px' , fontSize : '20px'}}>
                        <Button variant="contained" color="secondary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={postVaccine}>
                            Vaccinated
                        </Button>
                    </Grid>
                </>)
                : ""}
            </Grid>
            <Typography variant='h6' color='secondary' gutterBottom align="center" style={{marginTop : 15}}>{otp.otp !== 0 ? `Generated OTP : ${otp.otp}` : otp.errorOtp === '' ? '' : "We Encountered Some Problem While Generating OTP"}</Typography>
            </Paper>
        </Grow>
    ) : "";
    return (
        <>
            <Navbars names="Admin"/>
            <Grow in={true} timeout={1000}>
                <Paper elevation={6} style={{padding : '30px 20px' , margin : '80px 15% 0% 15%'}}>
                <Typography variant='h3' color='primary' gutterBottom align="center">Search People</Typography>
                <Grid container spacing={5} style={{padding : 5}} >
                    <Inputs size={12} name="email" label="Enter Email Of User" type='text' values={values.email} onChange={handleChange} passwordIcon={false} showPasswords={values.showPassword} labelWidths={150} boolValue={false} color={true} />
                    <Grid container item lg={12} style={{marginTop : '5px' , fontSize : '10px'}}>
                    <Button variant="contained" color="secondary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={postData}>
                        Search User
                    </Button>
                    </Grid>
                </Grid>
                <Typography variant='h6' color='primary' gutterBottom align="center" style={{marginTop : 10}}>{values.errorMessage}</Typography>
                </Paper>
            </Grow>
            {data}
        </>
    )
}

export default Profile
