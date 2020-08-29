import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';


const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    background: '#3f3b3b',
    color: 'white',
    opacity: 0.90
  },
  icon: {
    //marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function DarkModeSwitch(props) {
  return(
    <FormControlLabel
      control={<Switch size="small" 
      checked={props.darkMode} 
      onChange={() => props.setDarkMode(!props.darkMode)}/>}
      label="Dark Mode"
    />
  )
};

function Header(props) {
  const classes = useStyles();

  return (
    <div >
      <AppBar className={classes.root} position="static" color="inherit">
        <Toolbar>
          <IconButton edge="start" className={classes.icon} color="inherit">
            <FastfoodRoundedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nutrition Facts
          </Typography>
        {/*
          <DarkModeSwitch 
            darkMode={props.darkMode}
            setDarkMode={props.setDarkMode}
          />
        */}
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;