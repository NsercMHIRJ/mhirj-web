import React, {useState,useEffect} from 'react';
import DailyReport from './DailyReport/DailyReport';
import FlagReport from './FlagReport/FlagReport';
import HistoryReport from './HistoryReport/HistoryReport';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'50px auto',
    width:'95vw',
  },
  flagFilters: {
    margin: '20px',
    maxWidth: '100%',
    display: 'flex',
  },  
  flagH3: {
    marginLeft: '24px',
  },
  button:{
    margin:'9px 30px',
    backgroundColor:"#C5D3E0",
    width: '600px',
    height: '51px',
  },
  buttonFlag:{
    margin:'0px 50px 15px 0px',
    backgroundColor:"#C5D3E0",
    width: '89%',
  },
}));

const Report = (props) => {
  const classes = useStyles();
  const [report, setReport] = useState(props.reportConditions);
  const [dailyReportData, setDailyReportData] = useState([]);
  const [historyReportData, setHistoryReportData] = useState([]);
  const [flagData, setFlagData] = useState([]);
  const [flagList,setFlagList] = useState('');
  const [flag,setFlag] = useState(false);
  const [flagConditions,setFlagConditions] = useState('');
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingFlag, setLoadingFlag] = useState(true);

  const HandleMultipleRowSelectReport = (flagList) => {
    setFlagList(flagList);
  }

  const [dailyValue,setDailyValue] = useState(0);
  const [histValue,setHistValue] = useState(0);
  const [flagValue,setFlagValue] = useState(0);

  useEffect(() => {
      setReport(props.reportConditions);
      let flag = false;
      for (var item in Object.entries(props.reportConditions)) {
        if (Object.entries(props.reportConditions)[item][1] === "" | Object.entries(props.reportConditions)[item][1] === undefined || Object.entries(props.reportConditions)[item][1] === "('')") {
          flag = true;
          if (report.analysis === "daily"){
            setLoadingDaily(false);
          }
          else if (report.analysis === "history"){
            setLoadingHistory(false);
          }
        }
      }
      setFlag(flag);
      
    if (flag === false){
      localStorage.setItem("last",JSON.stringify(props.reportConditions)); 
      if(props.reportConditions.analysis === "daily"){
        localStorage.setItem("daily",JSON.stringify(props.reportConditions)); 
      }
      else if(props.reportConditions.analysis === "history"){
        localStorage.setItem("history",JSON.stringify(props.reportConditions));
      } 
    } 

  }, [props.reportConditions]);

  useEffect( () => {
      if (report.analysis === "daily"){
        setDailyValue(1);
        setDailyReportData([]);
        setLoadingDaily(true);
      }
      else if (report.analysis === "history"){
        setHistValue(1);
        setHistoryReportData([]);
        setLoadingHistory(true);
      }
    if (flag === false){
      let consecutiveDays = report.analysis === "daily" ? 0 : report.days; 
      const path = 'http://20.85.211.143:8080/api/GenerateReport/' + report.analysis + '/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
      consecutiveDays + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + report.messages + '/' + report.fromDate + '/' + report.toDate;

      axios.post(path).then(function (res){
        var data = JSON.parse(res.data);
        if (report.analysis === "daily") {
          setDailyReportData(data);
          setLoadingDaily(false);
        }
        else if (report.analysis === "history") {
          setHistoryReportData(data);
          setLoadingHistory(false);
        }           
      }).catch(function (err){
        console.log(err);
        if (report.analysis === "daily"){
          setLoadingDaily(false);
        }
        else if (report.analysis === "history"){
          setLoadingHistory(false);
        }
      });
    }
    else{
      if (report.analysis === "daily"){
        setLoadingDaily(false);
      }
      else if (report.analysis === "history"){
        setLoadingHistory(false);
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

  useEffect(() => {
    let flag = false;
    Object.values(flagConditions).map(item => {
      if (item === "" || item === undefined || item === "('')"){
        flag = true;
        setLoadingFlag(false);
      }
    });

    if (flag === false) {        
      const flagPath = 'http://20.85.211.143:8080/api/GenerateReport/' + flagConditions.analysis + '/' + flagConditions.occurences + '/' + 
      flagConditions.legs + '/' + flagConditions.intermittent + '/' + flagConditions.days + '/' + flagConditions.ata + '/' + 
      flagConditions.eqID + '/'+ flagConditions.operator + '/' + flagConditions.messages + '/' + flagConditions.fromDate + '/' + 
      flagConditions.toDate + '/' + flagConditions.flagList;

      axios.post(flagPath).then(function (res){
        var data = JSON.parse(res.data);
        setFlagData(data);
        setLoadingFlag(false);
      }).catch(function (err){
        console.log(err);
        setLoadingFlag(false);
      })
    }
  },[flagConditions]);

  return(
    <div className={classes.root}>
      {historyReportData !== "" && historyReportData !== "undefined" && histValue === 1 &&
        <>
          <div>
            <Grid container spacing={0}>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Button 
                  variant="contained" 
                  onClick = {()=>handleGenerateFlagReport()}
                  className={classes.buttonFlag}>
                    Generate Flag Report
                </Button>
              </Grid>
              <Grid item xs={12}>
                <HistoryReport data = {historyReportData}  title = "History Report" reportConditions = {report} HandleMultipleRowSelectReport = {HandleMultipleRowSelectReport} loading = {loadingHistory}/>
              </Grid>
            </Grid>
          </div>
        </>
      }
      {dailyReportData !== "" && dailyReportData !== "undefined" && dailyValue === 1 &&
        <>
          <DailyReport data = {dailyReportData} title = "Daily Report" reportConditions = {report} loading = {loadingDaily}/>
        </>
      }
      {flagData !== "" && flagData !== "undefined" && flagValue === 1 &&
        <>
          <FlagReport data = {flagData} flagReportConditions = {flagConditions} title = "Flag Report" loading = {loadingFlag}/>
        </>
      }
    </div>  
  );    
};

export default Report;