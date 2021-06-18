import React from 'react'
import { Grid  , Paper , Typography , Grow , TextField , Button , OutlinedInput , IconButton} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const Login = () => {
    const [values, setValues] = React.useState({
        firstName : '',
        lastName : '',
        email : '',
        phoneNumber : '',
        password : '',
        rePassword : '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
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
    console.log(checkPasswordMatch());
    return (
        <Grow in={true} timeout={1000}>
        <Paper elevation={6} style={{padding : '30px 20px' , margin : '5% 15%'}}>
            <Typography variant='h2' color='primary' gutterBottom align="center">Register</Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Grid container item lg={6} >
                    <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth name="firstName" onChange={handleChange('firstName')}/>
                </Grid>
                <Grid container item lg={6} >
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth name="lastName" onChange={handleChange('lastName')}/>
                </Grid>
                <Grid container item lg={6} >
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth name="email" onChange={handleChange('email')}/>
                </Grid>
                <Grid container item lg={6} >
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth name="phoneNumber" onChange={handleChange('phoneNumber')}/>
                </Grid>
                <Grid container item lg={6} >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </Grid>
                <Grid container item lg={6} >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Re-enter Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='password'
                            value={values.rePassword}
                            onChange={handleChange('rePassword')}
                            labelWidth={135}
                        />
                    </FormControl>
                </Grid>
                <Grid container item lg={12} style={{marginTop : '20px' , fontSize : '20px'}}>
                <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}}>
                    Register
                </Button>
                </Grid>
            </Grid>
        </Paper>
    </Grow>
    )
}

export default Login;
