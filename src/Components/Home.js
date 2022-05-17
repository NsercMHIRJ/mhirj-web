import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Scatter, HorizontalBar, Bar } from 'react-chartjs-2';
import axios from 'axios';
import Constants from './utils/const'

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


export default function Chart1() {

  const classes = useStyles();
  const ChartJsImage = require('chartjs-to-image');
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});

  let pmMessage = [];
  let aircraftno_scatter = [];

  useEffect(() => {
    //const path = 'http://mhirjapi.azurewebsites.net/api/Landing_Chart_B'
   const path = Constants.APIURL+'Landing_Chart_B'


    axios.post(path)
      .then(res => {
        let data = JSON.parse(res.data);
        let aircraftNos = Object.keys(data);
        let dataMetaData = {};
        aircraftNos.map(no => {
          let airCraftObj = data[no];
          for (let x in airCraftObj) {
            if (dataMetaData[x]) dataMetaData[x].push(airCraftObj[x]);
            else dataMetaData[x] = [airCraftObj[x]];
          }
        })


        const getUniqueBackgroundColor = (code) => {
          // eslint-disable-next-line default-case
          switch (code) {
            case '21':
              return "#ef5350";
            case '22':
              return "#ec407a";
            case '23':
              return "#ab47bc";
            case '24':
              return "#7e57c2";
            case '26':
              return "#5c6bc0";
            case '27':
              return "#42a5f5";
            case '28':
              return "#29b6f6";
            case '30':
              return "#26c6da";
            case '31':
              return "#26a69a";
            case '32':
              return "#66bb6a";
            case '33':
              return "#9ccc65";
            case '34':
              return "#d4e157";
            case '36':
              return "#ffee58";
            case '38':
              return "#ffca28";
            case '45':
              return "#ffa726";
            case '49':
              return "#8d6e63";
            case '71':
              return "#bdbdbd";
            case '77':
              return "#9e9d24";
            case '78':
              return "#ff7043";
          }
        }

        const intiDataSet = (dataMetaData) => {
          let codes = Object.keys(dataMetaData);
          let finalDataset = [];
          codes.map(code => {
            let dataObj = {};
            dataObj.label = code;
            dataObj.data = dataMetaData[code];
            dataObj.backgroundColor = getUniqueBackgroundColor(code);
            finalDataset.push(dataObj);
            dataObj.borderWidth = 0.5;
            dataObj.borderColor = "black";
          });
          return finalDataset;
        }
        // console.log("aircraftNos=",aircraftNos);
        setChartData1({
          labels: aircraftNos,
          datasets: intiDataSet(dataMetaData)

        });

      })
      .catch(err => {
        //console.log(err);
      });

    

  }, []);

  return (

    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <form className={classes.root1}>
              <div><h2 style={{ color: "#001C3E", textAlign: "center" }}>MAGNITUDE OF MESSAGES IN DATA</h2></div>
            </form>
            <HorizontalBar
              data={chartData1}
              options={{

                legend: {
                  display: true,
                  position: 'right'
                },
                scales: {
                  xAxes: [{
                    stacked: true
                  }],
                  yAxes: [{
                    barPercentage: 0.5,
                    scaleLabel: {
                      display: true,
                      labelString: 'Aircraft Serial Number',
                      fontStyle: 'bold',
                      fontColor: '#001C3E'
                    },
                    stacked: true
                  }]
                }
              }}
            /></Paper>
        </Grid>
      </Grid>
    </div>
  );

}
