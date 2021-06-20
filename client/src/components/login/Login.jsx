import React from 'react'
import { Grid  , Paper , Typography , Grow , Button } from '@material-ui/core';
import Inputs from '../UI/Input';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Login = (props) => {
    const [values, setValues] = React.useState({userName : '' , password : '',showPassword: false , errorMessage : ''});
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const postData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/login' , {
            values : values
        })
        .then(res => {
            const dataValue = res.data;
            if(dataValue.message === 'Success'){
                props.history.push({
                    pathname: '/profile',
                    state: { 
                        values : {
                            name : dataValue.firstName + ' ' + dataValue.lastName,
                            email : dataValue.email,
                            phone : dataValue.phone,
                            dateChoosen : '22-09-2019',
                        }
                    }
                  })
            } else {
                setValues({...values , errorMessage : res.data.message});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const redirectReg = () => {
        props.history.push({
            pathname : '/register',
        })
    }
    return (
        <Grow in={true} timeout={1000}>
        <Paper elevation={6} style={{padding : '50px 20px' , margin : '6% 15%'}}>
            <Typography variant='h2' color='primary' gutterBottom align="center">Login Page</Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Inputs size={12} name="userName" label="Email Or Phone Number" type='text' values={values.userName} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} labelWidths={180} boolValue={false} color={true} icon={<AccountCircleIcon/>}/>
                <Inputs size={12} name="password" label="Password" type={values.showPassword ? 'text' : 'password'} values={values.password} onChange={handleChange} passwordIcon={true} handleClick={handleClickShowPassword} showPasswords={values.showPassword} labelWidths={80} boolValue={false} color={true}/>
                <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                <Button variant="contained" color="primary" startIcon={<ExitToAppIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={redirectReg}>
                    Go To Registration Page
                </Button>
                </Grid>
                <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
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