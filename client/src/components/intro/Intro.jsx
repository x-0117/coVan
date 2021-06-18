import React from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@material-ui/core';

const Intro = () => {
    return (
        <div className="Intro">
            <div className="typewrite" style={{fontSize : '60px' , textAlign : "center" , fontWeight : 600 , padding : '20px'}}>
                <Typewriter
                    options={{
                        strings: ["Let Us Fight Covid Together", 'Get Vaccinated' , "Don't Believe In Myths"],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
            <button></button>
        </div>
    );
}

export default Intro;
