import React, {useState,useEffect} from 'react';
import DailyReport from './DailyReport/DailyReport';
import FlagReport from './FlagReport/FlagReport';
import HistoryReport from './HistoryReport/HistoryReport';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Constants from '../../utils/const';
import TextField from '@material-ui/core/TextField';
import "../../../scss/_main.scss";
import JamsReport from './JamReport/JamsReport';
import {HistorySupportingSelector} from '../GenerateReport/Selectors';

const Report = (props) => {
  const [report, setReport] = useState(props.reportConditions);
  
  const [dailyReportData, setDailyReportData] = useState([]);
  const [dailyValue,setDailyValue] = useState(0);
  const [loadingDaily, setLoadingDaily] = useState();

  const [historyReportData, setHistoryReportData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState();
  const [histValue,setHistValue] = useState(0);

  const [flagData, setFlagData] = useState([]);
  const [flagList,setFlagList] = useState('');
  const [flagConditions,setFlagConditions] = useState({});
  const [flagValue,setFlagValue] = useState(0);
  const [loadingFlag, setLoadingFlag] = useState();
  
  const [jamACSNDailyValue, setJamACSNDailyValue] = useState('');
  const [jamACSNHistoryValue, setJamACSNHistoryValue] = useState('');
  const [jamDailyData, setJamDailyData] = useState([]);
  const [jamHistoryData, setJamHistoryData] = useState([]);
  const [loadingJam, setLoadingJam] = useState();
  const [loadingHistoryJam, setLoadingHistoryJam] = useState();
  const [jamValue, setJamValue] = useState(0);
  const [jamHistValue, setJamHistValue] = useState(0);
  const [jamConditions, setJamConditions] = useState({});
  
  const[reportType, setReportType] = useState('');

  const HandleMultipleRowSelectReport = (flagList) => {
    setFlagList(flagList);
  }

  const HandleSingleRowSelect = (jamACSNDailyValue) => {
    setJamACSNDailyValue(jamACSNDailyValue); 
  }

  const handleReportChange = (reportType) => {
    setReportType(reportType);
  }

  const handleGenerateHistorySupportingReport = (event) => {
    console.log(reportType);
    if ( reportType === 'Flag Report') {
      handleGenerateFlagReport(event);
    }
    else if ( reportType === 'Jam Report') {
      handleGenerateJamsReport(event);
    }
  }

  useEffect(() => {
    if (!Object.values(props.reportConditions).includes("")){
      setReport(props.reportConditions);
    }
  }, [props.reportConditions]);

  useEffect(() => {
    if(!Object.values(report).includes("")){
      let consecutiveDays = report.analysis === "daily" ? 0 : report.days; 
      const path = Constants.APIURL + 'GenerateReport/' + report.analysis + '/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
      consecutiveDays + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + report.messages + '/' + report.fromDate + '/' + report.toDate;

      console.log(path, "path");

      if (report.analysis === "daily"){
        localStorage.setItem('daily-report', JSON.stringify( report ) );
        setDailyValue(1);
        setDailyReportData([]);
        setLoadingDaily(true);

        axios.post(path).then(function (res){
          var data = JSON.parse(res.data);
          setDailyReportData(data);    
          setLoadingDaily(false);
        }).catch(function (err){
          console.log(err);
          setLoadingDaily(false);
        });
      }
      else{
        localStorage.setItem('history-report', JSON.stringify( report ) );
        setHistValue(1);
        setHistoryReportData([]);
        setLoadingHistory(true);

        axios.post(path).then(function (res){
          var data = JSON.parse(res.data);
          setHistoryReportData(data);  
          setLoadingHistory(false);  
        }).catch(function (err){
          console.log(err);    
          setLoadingHistory(false);
        });
      }
    }    
  }, [report]);

  const handleGenerateFlagReport = (event) => {
    setFlagConditions({
      ...props.reportConditions,
      flagList
    });
    setFlagData([]);
    setLoadingFlag(true);
    setFlagValue(1);
  }

  const handleGenerateJamsReport = (event) => {
    let jamParameters = [];
    let jamACSNValue;

    if ( event.currentTarget.id === 'daily-jam-button' ) {
      setJamConditions({
        ...props.reportConditions,
        jamACSNDailyValue
      });
      setJamDailyData([]);
      setLoadingJam(true);
      setJamValue(1);

      if ( Object.entries( localStorage.getItem( 'daily-report' ) ).length !== 0 ) {
        jamParameters = JSON.parse( localStorage.getItem( 'daily-report' ) );
        jamACSNValue = jamACSNDailyValue;
      }

    } else if ( event.currentTarget.id === 'history-supporting-button' ) {
      setJamConditions({
        ...props.reportConditions,
        jamACSNHistoryValue
      });
      setJamHistoryData([]);
      setLoadingHistoryJam(true);
      setJamHistValue(1);

      if ( Object.entries( localStorage.getItem( 'history-report' ) ).length !== 0 ) {
        jamParameters = JSON.parse( localStorage.getItem( 'history-report' ) );
        jamACSNValue = jamACSNHistoryValue;
      }
    }

    if (jamParameters.lenght !== 0) {
      const jamsPath = Constants.APIURL + 'GenerateReport/' + jamParameters.analysis + '/' + jamParameters.occurences + '/' + 
      jamParameters.legs + '/' + jamParameters.intermittent + '/' + jamParameters.days + '/' + jamParameters.ata + '/' + 
      jamParameters.eqID + '/'+ jamParameters.operator + '/' + jamParameters.messages + '/' + jamParameters.fromDate + '/' + 
      jamParameters.toDate + '/' + jamACSNValue;
      
      axios.post(jamsPath).then(function (res){
        var data = JSON.parse(res.data);
        console.log(data);
        if ( jamParameters.analysis === 'daily' ) {
          setJamDailyData(data);
          setLoadingJam(false);
        } else {
          setJamHistoryData(data);
          setLoadingHistoryJam(false);
        }
      }).catch(function (err){
        console.log(err);
        if ( jamParameters.analysis === 'daily' ) {  
          setLoadingJam(false);
        } else {
          setLoadingHistoryJam(false);
        }
      });
    } else {
      if ( jamParameters.analysis === 'daily' ) {  
        setLoadingJam(false);
      } else {
        setLoadingHistoryJam(false);
      }
    }
  }

  useEffect(() => {
    if (!(Object.keys(flagConditions).length === 0 || Object.values(flagConditions).includes(""))){
      const flagPath = Constants.APIURL + 'GenerateReport/' + flagConditions.analysis + '/' + flagConditions.occurences + '/' + 
      flagConditions.legs + '/' + flagConditions.intermittent + '/' + flagConditions.days + '/' + flagConditions.ata + '/' + 
      flagConditions.eqID + '/'+ flagConditions.operator + '/' + flagConditions.messages + '/' + flagConditions.fromDate + '/' + 
      flagConditions.toDate + '/1/' + flagConditions.flagList;

      console.log(flagPath);

      axios.post(flagPath).then(function (res){
        var data = JSON.parse(res.data);
        setFlagData(data);
        setLoadingFlag(false);
      }).catch(function (err){
        console.log(err);
        setLoadingFlag(false);
      });
    }
  },[flagConditions]);

  return(
    <div class="reports-root">
      {dailyReportData !== "" && dailyReportData !== "undefined" && dailyValue === 1 &&
        <>
          <div class="daily-report">
            <h2 class="report-parameters-h2">Daily Jam Report Parameters</h2>
            <form>
              <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                <Grid item xs={3} md={6} lg={3}>
                  <div class="daily-report-jam-parameters">
                    <label class="parameter-label">ACSN:</label>
                    <TextField 
                      required 
                      id="outlined-name"
                      variant = "outlined"   
                      value = {jamACSNDailyValue}
                      InputProps={{ readOnly: true, }}    
                    />
                  </div>
                </Grid>
                <Grid xs={3} md={6} lg={3}>
                  <div class="daily-report-jam-parameters">
                    <Button 
                      variant = "contained" 
                      class="reports-button MuiButtonBase-root MuiButton-root MuiButton-contained" 
                      id = "daily-jam-button"
                      onClick = {handleGenerateJamsReport} >
                      Generate Jams Report
                    </Button>
                  </div>        
                </Grid>      
              </Grid>
            </form>
            <Grid item lg={12}>
              <DailyReport 
                data = {dailyReportData} 
                title = "Daily Report" 
                reportConditions = {report} 
                loading = {loadingDaily}
                HandleSingleRowSelect = {HandleSingleRowSelect}
                />
            </Grid>
          </div>
        </>
      }
      {jamACSNDailyValue !== "" && jamDailyData !== "" && jamDailyData !== "undefined" && jamValue === 1 &&
      <>
        <JamsReport data = {jamDailyData} reportConditions = {props.reportConditions} title = "Daily" loading = {loadingJam}/>
      </>
      }
      {historyReportData !== "" && historyReportData !== "undefined" && histValue === 1 &&
        <>
          <div class="history-report">
            <h2 class="report-parameters-h2">History Report Parameters</h2>
            <form>
              <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                >
                  <Grid item xs={3} md={6} lg={2}>
                    <div class="history-report-jam-parameters select">
                      <HistorySupportingSelector 
                        handleReportChange = {handleReportChange}
                      />
                    </div>              
                  </Grid>
                  <Grid item xs={3} md={6} lg={3}>
                    <div class="history-report-jam-parameters">
                      <label class="parameter-label">Jam ACSN:</label>
                      <TextField 
                        required 
                        id="outlined-name"
                        variant = "outlined"   
                        value = {jamACSNHistoryValue}
                        InputProps={{ readOnly: true, }} />
                    </div>
                  </Grid>
                  <Grid item xs={3} md={6} lg={4}>
                  <div class="history-report-jam-parameters flag">
                    <label class="parameter-label">Flag ACSN:</label>
                      <TextField 
                        required 
                        id="outlined-name"
                        variant = "outlined"   
                        value = {flagList}
                        InputProps={{ readOnly: true, }}    
                      />
                  </div>
                  </Grid>
                  <Grid xs={3} md={6} lg={3}>
                    <Button 
                      variant = "contained" 
                      class="reports-button MuiButtonBase-root MuiButton-root MuiButton-contained" 
                      id = "history-supporting-button"
                      onClick = {handleGenerateHistorySupportingReport} >
                      Generate History Supporting Report
                    </Button>
                </Grid>      
              </Grid>
            </form>

            <Grid item md={12}>
              <HistoryReport 
                data = {historyReportData}  
                title = "History Report" 
                reportConditions = {report} 
                HandleMultipleRowSelectReport = {HandleMultipleRowSelectReport} 
                setJamACSNHistoryValue = {setJamACSNHistoryValue}
                loading = {loadingHistory} />
            </Grid>

            <Grid container>
              {jamACSNHistoryValue !== "" && jamHistoryData !== "" && jamHistoryData !== "undefined" && jamHistValue === 1 &&
              <>
                <Grid item md={12}>
                  <JamsReport data = {jamHistoryData} reportConditions = {props.reportConditions} title = "History" loading = {loadingHistoryJam}/>
                </Grid>
              </>
              }
          </Grid> 

          <Grid container>
          {flagData !== "" && flagData !== "undefined" && flagValue === 1 &&
              <>
                <Grid item md={12}>
                <FlagReport data = {flagData} reportConditions = {props.reportConditions} title = "History Flag Report" loading = {loadingFlag} flagReportConditions={flagConditions}/>
                </Grid>
              </>
              }
          </Grid>    
             
        </div>
        </>
      }
    </div>
  );    
};

export default Report;