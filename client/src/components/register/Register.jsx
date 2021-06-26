import React , {useState } from 'react'
import { Grid  , Paper , Typography , Grow , Button} from '@material-ui/core';
import validator from 'validator';
import Inputs from '../UI/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Lock from '@material-ui/icons/Lock';
import axios from 'axios';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Login = (props) => {
    const [values, setValues] = useState({
        firstName : '',
        lastName : '',
        email : '',
        phoneNumber : '',
        password : '',
        rePassword : '',
        showPassword: false,
        errormessage : ''
    });
    const handleChange = (prop) => (event) => {
        event.preventDefault();
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const checkPasswordMatch = () => {
        if(values.password === values.rePassword)
            return true;
        return false;
    }
    const checkEmail = () => {
        if(validator.isEmail(values.email) === true)
            return true;
        return false;
    }
    const validatePassword = () => {
        if (validator.isStrongPassword(values.password, {minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
            return true;
        } 
        return false;
    }
    const checkPhone = () => {
        if(validator.isMobilePhone(values.phoneNumber)){
            return true;
        }
        return false;
    }
    const checkName = () => {
        if(values.firstName === '')
            return false;
        return true;
    }
    const check = () => {
        if(checkName() === false || checkPhone() === false || validatePassword() === false || checkEmail() === false || checkPasswordMatch() === false)
            return true;
        return false;
    }
    const postData = (e) => {
        e.preventDefault();
        axios.post('/register' , {
            values : values,
        })
        .then(res => {
            if(res.data.message === 'Success'){
                props.history.push({
                    pathname: '/profile',
                    state: { 
                        values : {
                            name : values.firstName + ' ' + values.lastName,
                            email : values.email,
                            phone : values.phoneNumber,
                            isdateChoosen : false,
                            dateChoosen : '0-0-0',
                            vaccinated : "No"
                        }
                    }
                  })
            } else {
                setValues({...values , errormessage : res.data.message});
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const redirectLog = () => {
        props.history.push({
            pathname : '/login',
        })
    }
    const boolPassword = !checkPasswordMatch();
    const boolEmail = !checkEmail();
    const boolPasswordStrength = !validatePassword() && values.password !== '';
    const boolPhone = !checkPhone();
    const boolName = !checkName();
    const boolCheck = check();
    return (
        <Grow in={true} timeout={1000}>
        <Paper elevation={6} style={{padding : '30px 20px' , margin : '3% 15%'}}>
            <Typography variant='h2' color='primary' gutterBottom align="center">Register</Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Inputs size={6} name="firstName" label="First Name" type="text" values={values.firstName} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} icon={<AccountCircleIcon/>} labelWidths={80} boolValue={boolName} color={false} helperText="Enter Valid First Name"/>
                <Inputs size={6} name="lastName" label="Last Name" type="text" values={values.lastName} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} icon={<AccountCircleIcon/>} labelWidths={75} boolValue={boolName} color={false}/>
                <Inputs size={6} name="email" label="Email" type="email" values={values.email} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} icon={<EmailIcon/>} labelWidths={40} boolValue={boolEmail} color={false} helperText="Enter Valid Email Address"/>
                <Inputs size={6} name="phoneNumber" label="Phone Number" type="tel" values={values.phoneNumber} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} icon={<PhoneAndroidIcon/>} labelWidths={110} boolValue={boolPhone} color={false} helperText="Enter Valid Phone Number"/>
                <Inputs size={6} name="password" label="Password" type={values.showPassword ? 'text' : 'password'} values={values.password} onChange={handleChange} passwordIcon={true} handleClick={handleClickShowPassword} showPasswords={values.showPassword} labelWidths={80} boolValue={boolPasswordStrength} color={true} helperText="Password must be minimum 8 charcters long with atleast one UpperCase, LowerCase , Number and Symbol"/>
                <Inputs size={6} name="rePassword" label="Re-enter Password" type="password" values={values.rePassword} onChange={handleChange} passwordIcon={false} handleClick={handleClickShowPassword} showPasswords={values.showPassword} icon={<Lock/>} labelWidths={140} boolValue={boolPassword} color={true} helperText="Passwords Does Not Match"/>
                <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                <Button variant="contained" color="primary" startIcon={<LockOpenIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={redirectLog}>
                    Go To Login Page
                </Button>
                </Grid>
                <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} disabled={boolCheck} onClick={postData}>
                    Register
                </Button>
                </Grid>
            </Grid>
            <Typography variant='h6' color='primary' gutterBottom align="center">{values.errormessage}</Typography>
        </Paper>
    </Grow>
    )
}

export default Login;
