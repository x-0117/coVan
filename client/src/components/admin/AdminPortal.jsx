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
    })
    const [otp,setotp] = React.useState({otp : 0 , errorOtp : ''});
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    if(typeof props.location.state === 'undefined'){
        return <Redirect to='/admin'/>
    }
    const postData = (e) => {
        e.preventDefault();
        setuserDetails({
            ...values,
            name : ''
        })
        axios.post("http://localhost:4000/admin-portal",{
            email : values.email
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
                    date : res.data.values.date
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
    const postOTP = () => {
        const Otp = Math.floor((Math.random() * 1000000) + 1);
        axios.post("http://localhost:4000/otp" , {otp : otp})
            .then(res => {
                console.log(res)
                if(res.data.message === 'Success'){
                    setotp({...otp , otp : Otp});
                } else {
                    setotp({
                        ...otp,
                        errorOtp : res.data.message
                    })
                }
                console.log(otp.otp)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const data = userDetails.name !== '' ? (
        <Grow in={true} timeout={1000}>
            <Paper elevation={6} style={{padding : '20px 20px' , margin : '20px 15% 0% 15%'}}>
            <Typography variant='h4' color='primary' gutterBottom>User Details</Typography>
            <Grid container spacing={5} style={{padding : 30}} item={true}>
                <Grid lg={6} container>
                    <Typography variant='h6' color='primary' gutterBottom >Name : <span style={{color: "red"}}>{userDetails.name}</span></Typography>
                </Grid>
                <Grid lg={6} container>
                    <Typography variant='h6' color='primary' gutterBottom >Email : <span style={{color: "red"}}>{userDetails.email}</span></Typography>
                </Grid>
                <Grid lg={6} container>
                    <Typography variant='h6' color='primary' gutterBottom >Phone : <span style={{color: "red"}}>{userDetails.phone}</span></Typography>
                </Grid>
                <Grid lg={6} container>
                    <Typography variant='h6' color='primary' gutterBottom >Date : <span style={{color: "red"}}>{userDetails.date}</span></Typography>
                </Grid>
                <Grid lg={12} container style={{marginTop : '20px' , fontSize : '20px'}}>
                    <Button variant="contained" color="primary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={postOTP}>
                        Generate OTP
                    </Button>
                </Grid>
            </Grid>
            <Typography variant='h6' color='secondary' gutterBottom align="center">{otp.otp !== 0 ? `Generated OTP : ${otp.otp}` : otp.errorOtp === '' ? '' : "We Encountered Some Problem While Generating OTP"}</Typography>
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
