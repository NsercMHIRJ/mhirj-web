import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import mhirjLogoColored from './mhirjLogoColored.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home';
import { Button } from '@material-ui/core';
import './App.css'
import MessageInput from './Components/MessageInput';
import Report from './Components/MdcMessages/Reports/Report';
import Analysis from './Components/MdcMessages/GenerateReport/Analysis';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  appBar: {

    backgroundColor: "#003F67",
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    height: "78px",
    backgroundColor: "#f3f2f1",
  },
  content: {
    flexGrow: -1,


  }
}));

export default function MiniDrawer() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          color="primary"
          position="fixed"
          className={classes.appBar}
          >
          
          <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' , display: 'flex' }}>
            <img src={mhirjLogoColored} style={{ height: 63, width: 100 }} />
            <Typography style={{ color: "white", fontSize: "24px", fontFamily: "Times New Roman", padding: 10 }}>DNA Tool</Typography>
            </Link>
            <Link to="/analysis" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" style={{height: 59, width: 150, fontSize:16 , fontFamily: "Times New Roman", color: "white"}}>MDC Trends</Button>
            </Link>
              <Link to="/MessageInput" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" style={{height: 59, width: 150, fontSize:14 , fontFamily: "Times New Roman", color: "white"}}>Message Input</Button>
            </Link>
          </Toolbar>
         
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbar} />
    
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/analysis">
              <Analysis />
            </Route>
            <Route path="/MessageInput">
              <MessageInput />
            </Route>
          </Switch> 
        </main>

      </Router>
    </div>
  );
}




