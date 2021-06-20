import React from 'react'
import { Redirect } from 'react-router-dom';
import Navbars from '../UI/Navbar';
import {Grow , Paper , Typography , Grid , Button ,} from '@material-ui/core';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import DateRangeIcon from '@material-ui/icons/DateRange';

const Profile = (props) => {
    if(typeof props.location.state === 'undefined'){
        return <Redirect to='/login'/>
    }
    console.log(props.location.state)
    const isDateChoosen = props.location.state.values.dateChoosen === '0-0-0' ? false : true;
    const dateChoosen = props.location.state.values.dateChoosen;
    const name = props.location.state.values.name;
    const changeDate = () => {
        props.history.push({
            pathname : '/change-date',
            state : {
                values : props.location.state.values
            }
        })
    }
    const trackApp = () => {
        props.history.push({
            pathname : '/track-vaccine',
            state : {
                values : props.location.state.values
            }
        })
    }
    let data;
    if(isDateChoosen){
        data = (
            <>
            <Typography variant='h4' color='secondary' gutterBottom align="center">
                You Have Already Chosen Vaccine Date on {dateChoosen}
            </Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                    <Button variant="contained" color="primary" startIcon={<SettingsApplicationsIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={trackApp}>
                        Track Vaccine
                    </Button>
                </Grid>
                <Grid container item lg={6} style={{marginTop : '20px' , fontSize : '20px'}}>
                    <Button variant="contained" color="secondary" startIcon={<DateRangeIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={changeDate}>
                        Change Date
                    </Button>
                </Grid>
            </Grid>
            </>
        )
    } else {
        data = (
            <>
            <Typography variant='h4' color='secondary' gutterBottom align="center">
                You Have Not Choosen Vaccine Date Yet . Please Choose !
            </Typography>
            <Grid container spacing={5} style={{padding : 30}} >
                <Grid container item lg={12} style={{marginTop : '20px' , fontSize : '20px'}}>
                    <Button variant="contained" color="secondary" startIcon={<DateRangeIcon />} fullWidth style={{fontSize : '17px' , fontWeight : '700'}} onClick={changeDate}>
                        Change Date
                    </Button>
                </Grid>
            </Grid>
            </>
        )
    }
    return (
        <>
            <Navbars names={name}/>
            <Grow in={true} timeout={1000}>
                <Paper elevation={6} style={{padding : '50px 20px' , margin : '20% 15% 0% 15%'}}>
                    {data}
                </Paper>
            </Grow>
        </>
    )
}

export default Profile
