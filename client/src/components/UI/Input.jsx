import React from 'react'
import {Grid , FormControl , InputLabel , OutlinedInput , InputAdornment , FormHelperText , IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = (props) => {
    return (
        <Grid container item lg={props.size} >
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
                <OutlinedInput
                    id={props.name}
                    type={props.type}
                    value={props.values}
                    onChange={props.onChange(props.name)}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={props.passwordIcon ? props.handleClick : () => {}}
                        edge="end"
                        >
                        {props.passwordIcon ? props.showPasswords ? <Visibility /> : <VisibilityOff /> : props.icon}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={props.labelWidths}
                />
                {props.boolValue ? <FormHelperText id={props.name} style={props.color ? {color : 'red'} : {color : 'black'}}>{props.helperText}</FormHelperText> : ''}
            </FormControl>
        </Grid>
    )
}

export default Input
