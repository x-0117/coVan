import React from 'react';
import Typewriter from 'typewriter-effect';
import classes from './Intro.css';
import { Button } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Intro = () => {
    return (
        <div className={classes.Intro}>
            <div className="typewrite" style={{fontSize : '80px' , textAlign : "center" , fontWeight : 400 , padding : '20px' , color : 'rgba(226, 226, 226, 0.90)' , textShadow : '4px 4px #000'}}>
                <Typewriter
                    options={{
                        strings: ["Let Us Fight Covid Together", 'Get Vaccinated' , "Don't Believe In Myths"],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
            <div className={classes.Buttons}>
                <Button variant="contained" color="secondary" startIcon={<LockOpenIcon />} className={classes.Button}>
                    Login
                </Button>
                <Button variant="contained" color="primary" startIcon={<ExitToAppIcon />} className={classes.Button}>
                    Register
                </Button>
            </div>
        </div>
    );
}

export default Intro;
