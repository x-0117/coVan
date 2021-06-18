import React from 'react'
import { Grid  , Paper , Typography , Grow , TextField , Button , OutlinedInput , IconButton} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const Login = () => {
    const [values, setValues] = React.useState({userName : '' , password : '',showPassword: false});
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    return (
        <Grow in={true} timeout={1000}>
        <Paper elevation={6} style={{padding : '50px 20px' , margin : '8% 15%'}}>
            <Typography variant='h2' color='primary' gutterBottom align="center">Login Page</Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Grid container item lg={12} >
                    <TextField id="outlined-basic" label="Email Or Phone" variant="outlined" fullWidth name="userName" onChange={handleChange('userName')}/>
                </Grid>
                <Grid container item lg={12} >
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
                <Grid container item lg={12} style={{marginTop : '20px' , fontSize : '20px'}}>
                <Button variant="contained" color="secondary" startIcon={<LockOpenIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}}>
                    Login
                </Button>
                </Grid>
            </Grid>
        </Paper>
    </Grow>
    )
}

export default Login

// defaultValue={value.bio} onChange={handleChange('bio')
// defaultValue={value.bio} onChange={handleChange('bio')
