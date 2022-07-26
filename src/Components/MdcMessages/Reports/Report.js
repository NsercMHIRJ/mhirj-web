import React, {useState,useEffect} from 'react';
import DailyReport from './DailyReport/DailyReport';
import FlagReport from './FlagReport/FlagReport';
import HistoryReport from './HistoryReport/HistoryReport';
import DeltaReport from './DeltaReport/DeltaReport';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Constants from '../../utils/const';
import TextField from '@material-ui/core/TextField';
import "../../../scss/_main.scss";
import JamsReport from './JamReport/JamsReport';
import {HistorySupportingSelector} from '../GenerateReport/Selectors';
import Localbase from 'localbase'
import Skeleton from '@mui/material/Skeleton';
import "../../../../src/scss/components/_analysis.scss"
import { Card } from '@material-ui/core';
import { randomId } from '@mui/x-data-grid-generator';

const Report = (props) => {
  const [report, setReport] = useState(props.reportConditions);
  
  const [dailyReportData, setDailyReportData] = useState([]);
  const [dailyValue,setDailyValue] = useState(0);
  const [loadingDaily, setLoadingDaily] = useState();
  const [dailyDisplay, setDailyDisplay] = useState('')

  const [historyReportData, setHistoryReportData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState();
  const [histValue,setHistValue] = useState(0);
  const [histDisplay, setHistDisplay] = useState('')

  const [deltaData, setDeltaData] = useState([]);
  const [deltaValue, setDeltaValue] = useState(0);
  const [loadingDelta, setLoadingDelta] = useState();
  const [deltaDisplay, setDeltaDisplay] = useState('')

  const [flagData, setFlagData] = useState([]);
  const [flagList,setFlagList] = useState('');
  const [flagConditions,setFlagConditions] = useState({});
  const [flagValue,setFlagValue] = useState(0);
  const [loadingFlag, setLoadingFlag] = useState();
  const [flagDisplay, setFlagDisplay] = useState('')

  const [jamACSNHistoryValue, setJamACSNHistoryValue] = useState('');
  const [jamHistoryData, setJamHistoryData] = useState([]);
  const [loadingHistoryJam, setLoadingHistoryJam] = useState();
  const [jamHistValue, setJamHistValue] = useState(0);
  const [jamHistTitle, setJamHistTitle] = useState('');
  const [jamConditions, setJamConditions] = useState({});
  const [jamDisplay, setJamDisplay] = useState('');

  const [reportType, setReportType] = useState('');
  const db = new Localbase('reportDatas');
  const [isFetching, setIsFetching] = useState(false);
  const [histErrorMessage, setHistErrorMessage] = useState('')
  const [deltaErrorMessage, setdeltaErrorMessage] = useState('')

  
  useEffect(()=> {
    if (localStorage.getItem('flagList')) {
      setFlagList(localStorage.getItem('flagList'))
    }
  })
  

  const HandleMultipleRowSelectReport = (flagList) => {
    localStorage.setItem('flagList', flagList)
    setFlagList(flagList);
  }


  useEffect(() => {
    setReport(props.reportConditions);
  }, [props.reportConditions]);
  

  
  

  useEffect(() => {
    let path = "";
    setHistValue(0)
    setHistoryReportData([])
    setDeltaData([])
    setDeltaValue(0)
    if (report.analysis !== "" && report.occurences !== "" && report.legs !== "" && report.eqID !== "" && report.intermittent !== "" && 
      report.days !== "" && report.operator !== "" && report.ata !== "" && report.fromDate !== undefined && report.toDate !== undefined ) {
        if (report.analysis === "delta") {
          if (report.deltaFrom !== undefined && report.deltaTo !== undefined ) {
            path = Constants.APIURL + 'GenerateReport/history/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
            report.days + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + 1 + '/' + report.ACSN + '/' + 1 + '/' + report.fromDate + '/' + report.toDate + 
            '/' + report.deltaFrom + '/' + report.deltaTo;
          }
          localStorage.setItem('report', JSON.stringify( report ) );
          setDeltaValue(1);
          setDeltaData([]);
          setLoadingDelta(true);
          setDeltaDisplay('')
          axios.post(path).then(function (res){
            db.collection('reporstLocal').add({data: res.data},"deltaData").then(response => {
              setDeltaData(response.data.data.data);   
              setLoadingDelta(false)
            })
          }).catch(function (err){
            console.log(err);
            setdeltaErrorMessage(err.message)
            setLoadingDelta(false);
          });
        }
        else if (report.analysis === "history") {
          path = Constants.APIURL + 'GenerateReport/' + report.analysis + '/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
          report.days + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + 1 + '/' + report.ACSN + '/' + report.fromDate + '/' + report.toDate;
          localStorage.setItem('report', JSON.stringify( report ) );
          setHistValue(1);
          setHistoryReportData([]);
          setLoadingHistory(true);
          setHistDisplay('')
          axios.post(path).then(function (res){
            var data = JSON.parse(res.data);
            console.log(data)
            data.map((row)=> {
              row['id'] = randomId();
            })
            db.collection('reporstLocal').add({data: data},"historyData").then(response => {
              setHistoryReportData(response.data.data.data);  
              setLoadingHistory(false);  
            })
          }).catch(function (err){
            console.log(err);    
            setHistErrorMessage(err.message)
            setLoadingHistory(false);
          });
        }
     }
  }, [report]);

  useEffect(()=> {
    let jamACSNHistory = localStorage.getItem('jamACSNHistory');
    setJamACSNHistoryValue(jamACSNHistory);
    setJamHistTitle("Surrounding Messages Report for ACSN " + jamACSNHistory);
  })

  useEffect(()=> {
    if (historyReportData.length !== 0){
      props.setCheckHistory(false)
    }else {
      props.setCheckHistory(true)
    }
  }, [historyReportData])

  useEffect(()=> {
    setIsFetching(true);
      db.collection('reporstLocal').doc("historyData").get().then(response => {
        if (response) {
          setHistValue(1);
          setHistoryReportData(response.data);
        }
        db.collection('reporstLocal').doc("deltaData").get().then(response => {
          if (response) {
            setDeltaValue(1);
            setDeltaData(response.data);

          }
          setIsFetching(false);
        })
      })
  },[])

  return(
    <div className="reports-root">
      <Grid item lg={12}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {isFetching ? <Skeleton animation="wave" height='650px' style={{margin: '-5% 0px 0px 0px'}} /> : <div></div>} 
          </Grid>
        </Grid>
      </Grid>
      {histValue === 1 && historyReportData !== "" && historyReportData !== "undefined" ?
          <>
              <HistoryReport 
                  data = {historyReportData}  
                  title = "History Report" 
                  reportConditions = {report} 
                  HandleMultipleRowSelectReport = {HandleMultipleRowSelectReport} 
                  setJamACSNHistoryValue = {setJamACSNHistoryValue}
                  loading = {loadingHistory} 
                  db = {db}
                  display = {histDisplay}
                  errorMessage={histErrorMessage}
                  setErrorMessage={setHistErrorMessage}
                />
          </>
         : deltaValue === 1 && deltaData !== "" && deltaData !== "undefined" ? 
          
              <DeltaReport 
                  data = {deltaData}
                  title = "Delta Report" 
                  reportConditions = {report}  
                  loading = {loadingDelta} 
                  db = {db}
                  display = {deltaDisplay}
                  setErrorMessage = {setdeltaErrorMessage}
                  errorMessage={deltaErrorMessage}
                />
       
         : <div></div>
         }
    </div>
  );    
};

export default Report;