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

    // Delta-Daily-History Report
    if (report.analysis !== "" && report.occurences !== "" && report.legs !== "" && report.eqID !== "" && report.intermittent !== "" && 
      report.days !== "" && report.operator !== "" && report.ata !== "" && report.fromDate !== undefined && report.toDate !== undefined ) {
        if (report.analysis === "delta") {
          if (report.deltaFrom !== undefined && report.deltaTo !== undefined ) {
            path = Constants.APIURL + 'GenerateReport/history/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
            report.days + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + 1 + '/' + report.ACSN + '/' + 1 + '/' + report.fromDate + '/' + report.toDate + 
            '/' + report.deltaFrom + '/' + report.deltaTo;
          }
          localStorage.setItem('report', JSON.stringify( report ) );
          localStorage.setItem('delta-report', JSON.stringify( report ) );
          setDeltaValue(1);
          setDeltaData([]);
          setLoadingDelta(true);
          setDeltaDisplay('')
          axios.post(path).then(function (res){
            // var data = JSON.parse(res.data);
            setDeltaData(res.data);   
            console.log(res.data)
            db.collection('reporstLocal').add({data: res.data},"deltaData")
            setLoadingDelta(false);
          }).catch(function (err){
            console.log(err);
            setLoadingDelta(false);
          });

        }
        else if (report.analysis === "daily") {
          let consecutiveDays = 0;
          path = Constants.APIURL + 'GenerateReport/' + report.analysis + '/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
          consecutiveDays + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + 1 + '/' + report.ACSN + '/' + report.fromDate + '/' + report.toDate;

          localStorage.setItem('report', JSON.stringify( report ) );
          localStorage.setItem('daily-report', JSON.stringify( report ) );
          setDailyValue(1);
          setDailyReportData([]);
          setLoadingDaily(true);
          setDailyDisplay('')

          axios.post(path).then(function (res){
            var data = JSON.parse(res.data);
            console.log(data)
            setDailyReportData(data);    
            setLoadingDaily(false);
            db.collection('reporstLocal').add({data: data},"dailyData")
          }).catch(function (err){
            console.log(err);
            setLoadingDaily(false);
          });
        }
        else if (report.analysis === "history") {
          path = Constants.APIURL + 'GenerateReport/' + report.analysis + '/' + report.occurences + '/' + report.legs + '/' + report.intermittent + '/' +
          report.days + '/' + report.ata + '/' + report.eqID + '/'+ report.operator + '/' + 1 + '/' + report.ACSN + '/' + report.fromDate + '/' + report.toDate;
          
          localStorage.setItem('report', JSON.stringify( report ) );
          
          setHistValue(1);
          setHistoryReportData([]);
          setLoadingHistory(true);
          localStorage.setItem( 'history-report', JSON.stringify( report ))
          setHistDisplay('')
          axios.post(path).then(function (res){
            var data = JSON.parse(res.data);
            console.log(data)
            setHistoryReportData(data);  
            setLoadingHistory(false);  
            db.collection('reporstLocal').add({data: data},"historyData")
          }).catch(function (err){
            console.log(err);    
            setLoadingHistory(false);
          });
        }
        else if (report.analysis === "flag"){
          const historyReport = JSON.parse(localStorage.getItem('history-report'));
          setFlagConditions({
            ...historyReport,
            flagList
          });
          setFlagData([]);
          setLoadingFlag(true);
          setFlagValue(1);
          setFlagDisplay('')
          const flagPath = Constants.APIURL + 'GenerateReport/' + flagConditions.analysis + '/' + flagConditions.occurences + '/' + 
          flagConditions.legs + '/' + flagConditions.intermittent + '/' + flagConditions.days + '/' + flagConditions.ata + '/' + 
          flagConditions.eqID + '/'+ flagConditions.operator + '/' + 1 + '/' + flagConditions.ACSN + '/' + flagConditions.fromDate + '/' + 
          flagConditions.toDate + '/1/' + flagConditions.flagList;
    
          axios.post(flagPath).then(function (res){
            var data = JSON.parse(res.data);
            setFlagData(data);
            setLoadingFlag(false);
            db.collection('reporstLocal').add({data: data},"flagData");
          }).catch(function (err){
            console.log(err);
            setLoadingFlag(false);
          });
          
        }else if (report.analysis === "surrounding"){
          let jamParameters = [];
          let jamACSNValue;
          setJamConditions({
            ...props.reportConditions,
            jamACSNHistoryValue
          });
          setJamHistoryData([]);
          setLoadingHistoryJam(true);
          setJamHistValue(1);
          setJamDisplay('')
          if ( Object.entries( JSON.parse( localStorage.getItem( 'history-report' ) ) ).length !== 0 ) {
            jamParameters = JSON.parse( localStorage.getItem( 'history-report' ) );
            jamACSNValue = jamACSNHistoryValue;
            setJamHistTitle("Surrounding Messages Report for ACSN " + jamACSNValue);
          }
          if (jamParameters.lenght !== 0) {
            const jamsPath = Constants.APIURL + 'GenerateReport/' + jamParameters.analysis + '/' + jamParameters.occurences + '/' + 
            jamParameters.legs + '/' + jamParameters.intermittent + '/' + jamParameters.days + '/' + jamParameters.ata + '/' + 
            jamParameters.eqID + '/'+ jamParameters.operator + '/' + 1 + '/' + jamParameters.ACSN + '/' + jamParameters.fromDate + '/' + 
            jamParameters.toDate + '/' + jamACSNValue;
      
            axios.post(jamsPath).then(function (res){
              var data = JSON.parse(res.data);
              setJamHistoryData(data);
              setLoadingHistoryJam(false);
              db.collection('reporstLocal').add({data: data},"surroundingData");
            }).catch(function (err){
              console.log(err);
              setLoadingHistoryJam(false);
            });
          } else {
              setLoadingHistoryJam(false);
          }
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

  useEffect( async()=> {
      setIsFetching(true);
      
      try {
        const daily = await (async function() {return db.collection('reporstLocal').doc("dailyData").get()})();
        const history = await (async function() {return db.collection('reporstLocal').doc("historyData").get()})();
        const delta = await (async function() {return db.collection('reporstLocal').doc("deltaData").get()})();
        const flag = await (async function() {return db.collection('reporstLocal').doc("flagData").get()})();
        const surrounding = await (async function() {return db.collection('reporstLocal').doc("surroundingData").get()})();
        if(daily){
          setDailyValue(1);
          setDailyReportData(daily.data);
        }
        if(history){
          setHistValue(1);
          setHistoryReportData(history.data);
        }
        if(delta){
          setDeltaValue(1);
          setDeltaData(delta.data);
        }
        if(flag){
          setFlagValue(1);
          setFlagData(flag.data);
        }
        if(surrounding){
          setJamHistoryData(surrounding.data);
          setJamHistValue(1);

        }
        setIsFetching(false);
      }
      catch(error) {
        console.log('error: ', error)
      }
  },[setDailyValue, setDailyReportData, setHistValue, setHistoryReportData, setDeltaValue, setDeltaData, setFlagData, setJamHistoryData])

  const closeDailyReport = () => {
    db.collection('reporstLocal')
    .doc('dailyData')
    .delete()
    .then(response => {
      setDailyDisplay('none')
      setDailyReportData([])
      localStorage.removeItem('daily-report')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })
  }

  const closeDeltaReport = () => {
    db.collection('reporstLocal')
    .doc('deltaData')
    .delete()
    .then(response => {
      setDeltaDisplay('none')
      setDeltaData([])
      localStorage.removeItem('delta-report')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })

  }

  const closeFlagReport = () => {
    db.collection('reporstLocal')
    .doc('flagData')
    .delete()
    .then(response => {
      setFlagDisplay('none')
      setFlagData([])
      localStorage.removeItem('flag-report')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })
  }

  const closeHistReport = () => {
    db.collection('reporstLocal')
    .doc('historyData')
    .delete()
    .then(response => {
      setHistDisplay('none')
      setHistoryReportData([])
      localStorage.removeItem('history-report')
      localStorage.removeItem('flagList')
      localStorage.removeItem('jamACSNHistory')
      localStorage.removeItem('indexSelected')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })

  }

  
  const closeJamReport = () => {
    db.collection('reporstLocal')
    .doc('surroundingData')
    .delete()
    .then(response => {
      setJamDisplay('none')
      setJamHistoryData([])
      localStorage.removeItem('jamReportExpandedRows')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })

  }

  return(
    <div className="reports-root">
      <Grid item lg={12}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {isFetching ? <Skeleton animation="wave" height='650px' style={{margin: '-5% 0px 0px 0px'}} /> : <div></div>} 
          </Grid>
        </Grid>
      </Grid>
     
      {dailyReportData !== "" && dailyReportData !== "undefined" && dailyValue === 1 &&
        <>
          <div className="daily-report">
            <Grid item lg={12}>
        
              <DailyReport 
                data = {dailyReportData} 
                title = "Daily Report" 
                reportConditions = {report} 
                loading = {loadingDaily}
                db = {db}
                display = {dailyDisplay}
                closeReport = {closeDailyReport}
                />
            </Grid>
          </div>
        </>
      }
      {historyReportData !== "" && historyReportData !== "undefined" && histValue === 1 &&
        <>
          <div className="history-report">
            <Grid item={true} md={12}>
              <HistoryReport 
                data = {historyReportData}  
                title = "History Report" 
                reportConditions = {report} 
                HandleMultipleRowSelectReport = {HandleMultipleRowSelectReport} 
                setJamACSNHistoryValue = {setJamACSNHistoryValue}
                loading = {loadingHistory} 
                db = {db}
                display = {histDisplay}
                closeReport = {closeHistReport}
              />
            </Grid>

            <Grid container item={true}>
              {jamACSNHistoryValue !== "" && jamHistoryData !== "" && jamHistoryData !== "undefined" && jamHistValue === 1 &&
              <>
                <Grid item md={12}>
                <JamsReport data = {jamHistoryData} 
                reportConditions = {JSON.parse(localStorage.getItem('history-report'))} 
                title = {jamHistTitle} 
                loading = {loadingHistoryJam}
                db = {db}
                display = {jamDisplay}
                closeReport = {closeJamReport}
                />
                
                </Grid>
                </>
              }
          </Grid> 

          <Grid container>
            {flagData !== "" && flagData !== "undefined" && flagValue === 1 &&
              <>
                <Grid item md={12}>
                <FlagReport data = {flagData}
                reportConditions = {props.reportConditions}
                title = "History Flag Report"
                loading = {loadingFlag}
                flagReportConditions={flagConditions}
                db = {db}
                display = {flagDisplay}
                closeReport = {closeFlagReport}
                />
                </Grid>
              </>
              }
          </Grid>    
        
        </div>
        </>
      }

      {deltaData !== "" && deltaData !== "undefined" && deltaValue === 1 &&
        <>
          <div className="delta-report">
            {/* <h2 className="report-parameters-h2">Delta Report Parameters - To be Defined</h2> */}
            <Grid item md={12}>
              <DeltaReport 
                data = {deltaData}
                title = "Delta Report" 
                reportConditions = {report}  
                loading = {loadingDelta} 
                db = {db}
                display = {deltaDisplay}
                closeReport = {closeDeltaReport}
              />
            </Grid>
          </div>
        </>
      }

    </div>
  );    
};

export default Report;