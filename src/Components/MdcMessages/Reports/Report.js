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
  const [flagConditions,setFlagConditions] = useState({});
  const [loadingDaily, setLoadingDaily] = useState();
  const [loadingHistory, setLoadingHistory] = useState();
  const [loadingFlag, setLoadingFlag] = useState();
  const [dailyValue,setDailyValue] = useState(0);
  const [histValue,setHistValue] = useState(0);
  const [flagValue,setFlagValue] = useState(0);

  const HandleMultipleRowSelectReport = (flagList) => {
    setFlagList(flagList);
  }

  useEffect(() => {
    if (!Object.values(props.reportConditions).includes("")){
      setReport(props.reportConditions);
    }
  }, [props.reportConditions]);

  useEffect(() => {
    console.log("before empty value check");
    if(!Object.values(report).includes("")){
      let consecutiveDays = report.analysis === "daily" ? 0 : report.days; 
      const path = 'https://mhirjapi.azurewebsites.net/api/GenerateReport/' + report.analysis + '/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
      consecutiveDays + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + report.messages + '/' + report.fromDate + '/' + report.toDate;

      if (report.analysis === "daily"){
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

  useEffect(() => {
    if (!(Object.keys(flagConditions).length === 0 || Object.values(flagConditions).includes(""))){
      const flagPath = 'https://mhirjapi.azurewebsites.net/api/GenerateReport/' + flagConditions.analysis + '/' + flagConditions.occurences + '/' + 
      flagConditions.legs + '/' + flagConditions.intermittent + '/' + flagConditions.days + '/' + flagConditions.ata + '/' + 
      flagConditions.eqID + '/'+ flagConditions.operator + '/' + flagConditions.messages + '/' + flagConditions.fromDate + '/' + 
      flagConditions.toDate + '/' + flagConditions.flagList;
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
