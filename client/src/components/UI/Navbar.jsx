import React , {useState} from 'react'
import { AppBar , Toolbar ,Typography , Button , IconButton , Menu , MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles(theme => ({
    sectionDesktop : {
        display : "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    }
}))

const Navbar = (props) => {
    const name = props.names;
    const classes = useStyles();
    const [mobileMenuAnchorElement , setmobileMenuAnchorElement] = useState(null);
    const isMobileOpen = Boolean(mobileMenuAnchorElement);
    const openMobileMenu = (event) => {
        setmobileMenuAnchorElement(event.currentTarget);
    }
    const closeMobileMenu = (e) => {
        setmobileMenuAnchorElement(null);
    }
    const mobileMenu = (
        <Menu anchorEl={mobileMenuAnchorElement} id="menu-mobile" keepMounted open={isMobileOpen}>
            <MenuItem component={Link} onClick={closeMobileMenu} to="/">Logout <MeetingRoomIcon/></MenuItem>
        </Menu>
    )
    const width = window.innerWidth;
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow : 1}}>Welcome {name}</Typography>
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit" component={Link} to="/">Logout <MeetingRoomIcon/></Button>
                    </div>
                    {width <= 769 ? 
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={openMobileMenu}>
                        <MenuIcon />
                    </IconButton> : ''}
                </Toolbar>
            </AppBar>
            {mobileMenu}
        </>
    )
}

export default Navbar
