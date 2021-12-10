import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import {EqIDSelector, ATAMainSelector, AirlineOperatorSelector} from './ATAGraphSelectors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Constants from './utils/const';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '25px',
    marginTop: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: theme.spacing(185),
    height: theme.spacing(150),
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 226,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },


}));

export default function Chart4() {
  const classes = useStyles();

  const [chartData4, setChartData4] = useState({});
  const [flightphase, setflightphase] = React.useState('');
  const [ATAMain, setATAMain] = useState('');
  const [airline, setAilineType] = useState("");
  const [EqID, setEqID] = useState("");


  const [data_chart4, setData_chart4] = useState({
    top_values:"",
    analysis_Type:"",
    occurences:"",
    legs:"",
    intermittent:"",
    consecutive_Days:"",
    ATA:"",
    equation_id:"",
    airline_operator:"",
    current_message:"",
    from_date:"",
    to_date:""
  });

 
  function save(e) {
    //save to png
    const canvasSave = document.getElementById('chart4');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "Chart4.png")
    })
}
const handleEqIDChange = (eqIDList) => {
  setEqID(eqIDList);
};

const handleAirlineChange = (Airline) => {
  setAilineType(Airline);
};

const handleATAChange = (ATA) => {
  setATAMain(ATA);
};
const handleflightphase = (event) => {
  setflightphase(event.target.value)
  
};

const [loadProgress , setLoadProgress] = useState();
  function submit_chart4(e){
    setLoadProgress(true);
    e.preventDefault();
    let total_count = [];
    let ATA_Main = [];
    
    
    const path=Constants.APIURL+ '/chart_four/' +data_chart4.top_values+ '/' +data_chart4.analysis_Type+ '/'+data_chart4.occurences+ '/'+data_chart4.legs+'/'+data_chart4.intermittent+'/'+data_chart4.consecutive_Days+'/'+ATAMain+'/'+EqID+ '/'+airline+'/'+flightphase+ '/'+data_chart4.from_date+ '/' +data_chart4.to_date;
    axios.post(path)
      .then(res => {
        console.log(res,"response");
        var info = JSON.parse(res.data)
        var ATA_Main_Data = Object.keys(info)
        var total_Count_Data = Object.values(info)
       
        for (const dataObj of ATA_Main_Data) {
          ATA_Main.push(dataObj);
        }
        
        for(const dataObj of total_Count_Data){
          total_count.push(parseInt(dataObj));
        }
        setChartData4({
          labels: ATA_Main,
          datasets: [
            {
              //label: data_chart5.aircraft_no,
              data: total_count,
              backgroundColor: "#d8e4f0",
              borderWidth: 1,
              borderColor: "black"
            }
          ]
        });
        setLoadProgress(false);
      })
      .catch(err => {
        //console.log(err);
      });
  }


  function handle_chart4(e){
    const newdata={...data_chart4}
    newdata[e.target.id] = e.target.value
    setData_chart4(newdata)
    //console.log(newdata)

  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>

        <Grid item xs={12} style={{ paddingLeft: '50px'}}>

          <form className={classes.root1} noValidate autoComplete="off">
          <div><h1 style={{color:"#001C3E", textAlign: "center"}}>TOP ATA IN REPORTS</h1></div>   
            <div> <TextField onChange= {(e)=>handle_chart4(e)} id="top_values" value={data_chart4.top_values} label="Top Values" defaultValue=" " variant="outlined" style={{ paddingRight: '100px'}}  />
            <TextField onChange= {(e)=>handle_chart4(e)} id="analysis_Type" value={data_chart4.analysis_Type} label="Analysis Type" defaultValue=" " variant="outlined" /></div>
            <br></br>
            
            <div> <TextField onChange= {(e)=>handle_chart4(e)} id="occurences" value={data_chart4.occurences} label="Occurences" defaultValue=" " variant="outlined" style={{ paddingRight: '100px'}} />
            <TextField onChange= {(e)=>handle_chart4(e)} id="legs" value={data_chart4.legs} label="Flight Legs" defaultValue=" " variant="outlined" /></div>
            <br></br>
            
            <div> <TextField onChange= {(e)=>handle_chart4(e)} id="intermittent" value={data_chart4.intermittent} label="Intermittent" defaultValue=" " variant="outlined" style={{ paddingRight: '100px'}} />
            <TextField onChange= {(e)=>handle_chart4(e)} id="consecutive_Days" value={data_chart4.consecutive_Days} label="Consecutive Days" defaultValue=" " variant="outlined" /></div>
            <br></br>
            
            <div style={{ width: '1450px'}}> 
             <ATAMainSelector 
                handleATAChange = {handleATAChange}
              /> 
              
             <div style={{ marginLeft:'325px', marginTop: '-60px',width: '1450px'}} > <EqIDSelector 
                handleEqIDChange = {handleEqIDChange}
              /> </div> </div>
            <br></br>
            
            <div style={{ width: '225px'}}> <AirlineOperatorSelector
                handleAirlineChange = {handleAirlineChange} 
              />     
            <div style={{ marginLeft:'325px', marginTop: '-60px',width: '500px'}} > 
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Current Messages</InputLabel>
              <Select labelId="demo-simple-select-outlined-label"  id="flight_phase" value={flightphase} onChange={handleflightphase}  label="Current Messages">
                <MenuItem value={0}>Exclude</MenuItem>
                <MenuItem value={1}>Include</MenuItem>
              </Select>
            </FormControl></div></div>
            <br></br>
            <div>  <TextField onChange= {(e)=>handle_chart4(e)} id="from_date" value={data_chart4.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{shrink: true, }} style={{ paddingRight: '180px'}} />
              <TextField onChange= {(e)=>handle_chart4(e)} id="to_date" value={data_chart4.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true,  }} /></div>
            <br></br>
            <div  style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit_chart4(e)} variant="contained" style={{backgroundColor:"#001C3E", color:"WHITE"}}>GENERATE  </Button>
            <Button onClick={(e) => save(e)}  variant="contained"style={{backgroundColor:"#001C3E", color:"WHITE",float:'right', marginRight:"1200px"}}>SAVE</Button></div>
          </form>

          <Paper className={classes.paper}>
            <Line
            id="chart5"
            data={chartData4}
            options={{
              // indexAxis: "y",
              title: {
                display: true,
                text: 'TOP ATA IN '+data_chart4.analysis_Type,
                fontSize: 20
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: false,
                      // maxTicksLimit: 10,
                      beginAtZero: true
                    },
                    gridLines: {
                      display: true
                    }
                    
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    },
                    gridLines: {
                      display: true
                    }
                  }
                ]
              },
              legend: {
                display: false,
                position: 'right'
              }
            }}
          />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
