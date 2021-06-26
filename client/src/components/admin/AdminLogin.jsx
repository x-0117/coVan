import React from 'react'
import { Grid  , Paper , Typography , Grow , Button } from '@material-ui/core';
import Inputs from '../UI/Input';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const Login = (props) => {
    const [values, setValues] = React.useState({userName : '' ,hospitalid : '', password : '',showPassword: false , errorMessage : ''});
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const postData = (e) => {
        e.preventDefault();
        axios.post('/admin' , {
            username : values.userName,
            password : values.password
        })
        .then(res => {
            const dataValue = res.data;
            if(dataValue.message === 'Success'){
                props.history.push({
                    pathname: '/adM1n-portal',
                    state: { 
                        values : {
                            hospitalID : values.hospitalid
                        }
                    }
                  })
            } else {
                setValues({...values , errorMessage : dataValue.message});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <Grow in={true} timeout={1000}>
        <Paper elevation={6} style={{padding : '50px 20px' , margin : '50px 15%'}}>
            <Typography variant='h2' color='primary' gutterBottom align="center">Admin Login</Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Inputs size={12} name="userName" label="Enter Username" type='text' values={values.userName} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} labelWidths={120} boolValue={false} color={true} icon={<AccountCircleIcon/>}/>
                <Inputs size={12} name="hospitalid" label="Enter Hospital ID" type='text' values={values.hospitalid} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} labelWidths={120} boolValue={false} color={true} icon={<PermIdentityIcon/>}/>
                <Inputs size={12} name="password" label="Password" type={values.showPassword ? 'text' : 'password'} values={values.password} onChange={handleChange} passwordIcon={true} handleClick={handleClickShowPassword} showPasswords={values.showPassword} labelWidths={80} boolValue={false} color={true}/>
                <Grid container item lg={12} style={{marginTop : '20px' , fontSize : '20px'}}>
                <Button variant="contained" color="secondary" startIcon={<LockOpenIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={postData}>
                    Login
                </Button>
                </Grid>
            </Grid>
            <Typography variant='h6' color='primary' gutterBottom align="center">{values.errorMessage}</Typography>
        </Paper>
    </Grow>
    )
}

export default Login