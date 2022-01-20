import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { HorizontalBar, Bar } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {ATAMainSelector} from './ATAGraphSelectors';
import Constants from './utils/const'
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
        height: theme.spacing(120),
    },
}));


export default function ChartB() {
    const classes = useStyles();
    const ChartJsImage = require('chartjs-to-image');
    const [chartDataB, setChartDataB] = useState({});
    const [ATAMain, setATAMain] = useState('');

    const [data_chartB, setData_chartB] = useState({
        aircraft_no: "",     
        from_date: "",
        to_date: ""
    });

    function save(e) {
        //save to png
        const canvasSave = document.getElementById('chartB');
        canvasSave.toBlob(function(blob) {
            saveAs(blob, "ChartB.png")
        })
    }

  
    const [loadProgress , setLoadProgress] = useState();
    function submit(e) {
      setLoadProgress(true);
        e.preventDefault();
        let ATA = [];
        let messageOcc = [];
        
        //const path = 'http://mhirjapi.azurewebsites.net/api/chart_one/' + data_chart1.top_value + '/' + data_chart1.aircraft_no + '/' + ATAMain + '/' + data_chart1.from_date + '/' + data_chart1.to_date;
         const path = Constants.APIURL+'chart_b/' + data_chartB.from_date + '/' + data_chartB.to_date + '/' + data_chartB.aircraft_no ;
        console.log("path is : "+path)
        
        axios.post(path)
            .then(res => {
                console.log(res, "response");
                var info = JSON.parse(res.data)
                
                let breakdown_data = {};
                for(let key in info)
                {
                    breakdown_data=info[key]
                }
                console.log(breakdown_data)
                ATA = Object.keys(breakdown_data)
                messageOcc = Object.values(breakdown_data)

                console.log("ATA", ATA)
                console.log("messageOcc", messageOcc)
                setChartDataB({
                    labels: ATA,
                    datasets: [{
                        label: data_chartB.aircraft_no,
                        data: messageOcc,
                        backgroundColor: "#d8e4f0",
                        borderWidth: 2,
                        borderColor: "black"
                    }]
                });
                setLoadProgress(false);
            })
            .catch(err => {
                //console.log(err);
            });
        //console.log(msgName, messageOcc);
    }

    function handle(e) {
        const newdata = {...data_chartB }
        newdata[e.target.id] = e.target.value
        setData_chartB(newdata)
            //console.log(newdata)

    }


return (
    
    <div className={classes.root}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <form className={classes.root1}>
              <div><h1 style={{ color: "#001C3E", textAlign: "center" }}>ATA BREAKDOWN FOR AIRCRAFT</h1></div>
              <div> <TextField onChange={(e) => handle(e)} id="aircraft_no" value={data_chartB.aircraft_no} label="Aircraft MSN" defaultValue=" " variant="outlined" /></div>
              <br></br>
            
  
             
              <div>  <TextField onChange={(e) => handle(e)} id="from_date" value={data_chartB.from_date} label=" SELECT FROM DATE &nbsp; &nbsp;" type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} />
                <TextField onChange={(e) => handle(e)} id="to_date" value={data_chartB.to_date} label=" SELECT TO DATE " type="date" defaultValue="2017-05-24" className={classes.textField} InputLabelProps={{ shrink: true, }} /></div>
              <br></br>
              <div style={{ paddingBottom: "20px" }}><Button onClick={(e) => submit(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE" }}>GENERATE  </Button>
                <Button onClick={(e) => save(e)} variant="contained" style={{ backgroundColor: "#001C3E", color: "WHITE", float: 'right', marginRight: "1200px" }}>SAVE</Button></div>
            </form>
            {loadProgress ? <CircularProgress /> : ""}
            <Paper className={classes.paper}>
              <Bar
                id="chartB"
                data={chartDataB}
                options={{
                  title: {
                    display: true,
                    text: 'ATA Breakdown for Aircraft ' + data_chartB.aircraft_no,
                    fontSize: 20
                  },
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          autoSkip: true,
                          beginAtZero: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Count',
                            fontStyle: 'bold',
                            fontColor: '#001C3E'
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
                        scaleLabel: {
                          display: true,
                          labelString: 'ATA',
                          fontStyle: 'bold',
                          fontColor: '#001C3E'
                        },
                        gridLines: {
                          display: false
                        }
                      }
                    ]
                  },
                  legend: {
                    display: true,
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
