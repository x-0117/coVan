import React , {useState} from 'react';
import Navbars from '../UI/Navbar';
import { Redirect } from 'react-router';
import {Grow , Paper , Typography , Grid , TextField , Button } from '@material-ui/core';
import BackupSharpIcon from '@material-ui/icons/BackupSharp';
import axios from 'axios';

const ChangeDate = (props) => {
    const [datavalues, setdataValues] = useState({
        lat : '',
        long : '',
        date : '',
        errorMessage : ''
    });
    const handleChange = (prop) => (event) => {
        event.preventDefault();
        setdataValues({ ...datavalues, [prop]: event.target.value });
    };
    if(typeof props.location.state === 'undefined'){
        return <Redirect to='/login'/>
    }
    const name = props.location.state.values.name;
    const getAdd = () => {
        navigator.geolocation.getCurrentPosition(
            position => setdataValues({
                ...datavalues,
                // lat : position.coords.latitude,
                // long : position.coords.longitude,
                lat : 19.11,
                long : 72.87
            })
        )
    }
    const check = () => {
        if(datavalues.lat && datavalues.long && datavalues.date)
            return true;
        return false;
    }
    const postData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/mainPage' , {
            values : datavalues,
            username : props.location.state.values.email
        })
        .then(res => {
            console.log(res.data)
            if(res.data.message === 'Assigned!'){
                props.history.push({
                    pathname : '/track-vaccine',
                    state : {
                        values : props.location.state.values,
                        date : datavalues.date
                    }
                })
            } else {
                setdataValues({ ...datavalues , errorMessage : res.data.message})
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const errorPos = () => {
        if(datavalues.lat=== '' || datavalues.long === '')
            return true;
        return false;
    }
    return (
        <>
            <Navbars names={name}/>
            <Grow in={true} timeout={1000}>
                <Paper elevation={6} style={{padding : '50px 20px' , margin : '15% 15% 0% 15%'}}>
                <Typography variant='h4' color='secondary' gutterBottom align="center">
                    Confirm Your Date Of Vaccine
                </Typography>
                <Grid container spacing={5} style={{padding : 30}} >
                    <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                    <TextField
                        id="date"
                        label="Choose Date"
                        type="date"
                        fullWidth
                        onChange = {handleChange('date')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </Grid>
                    <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                    <Button variant="outlined" color="primary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={getAdd}>
                        Allow Location Acess
                    </Button>
                    </Grid>
                    <Grid container item lg={12} style={{marginTop : '20px' , fontSize : '20px'}}>
                    <Button variant="contained" startIcon={<BackupSharpIcon/>} color="secondary" fullWidth style={{fontSize : '17px' , fontWeight : '700'}} disabled={!check()} onClick={postData}>
                        Submit
                    </Button>
                    </Grid>
                </Grid>
                {errorPos() ? <Typography align="center">Please Allow Location Access So That We Can Serve You Better</Typography> : ""}
                <Typography variant='h6' color='primary' gutterBottom align="center">{datavalues.errormessage}</Typography>
                </Paper>
            </Grow>
        </>
    )
}

export default ChangeDate
