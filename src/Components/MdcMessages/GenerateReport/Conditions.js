import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {OccurencesInput,LegsInput,IntermittentInput,DaysInput} from './AnalysisInput';
import Paper from '@material-ui/core/Paper';
import DatePicker from './DatePicker';
import {AirlineOperatorSelector, ATAMainSelector, ACSNSelector, MessagesSelector, EqIDSelector} from './Selectors';
import Report from '../Reports/Report';
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import "../../../scss/_main.scss";
import {GenerateReportValidation, NotFirstRender} from '../../Helper/Helper';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    maxWidth: '220px',
    backgroundColor: '#C5D3E0',
    margin: '10px auto',
    display: 'block',
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const Conditions = (props) => {
  const classes = useStyles();

  const [analysis, setAnalysisType] = useState("daily");
  const [EqID, setEqID] = useState("");
  var todayDate = new Date();
  if (todayDate) {
    todayDate = moment(todayDate).format("YYYY-MM-DD")
  }
  const [dateFrom, setDateFrom] = useState(todayDate);
  const [dateTo, setDateTo] = useState(todayDate);
  const [deltaFrom, setDeltaFrom] = useState(todayDate);
  const [deltaTo, setDeltaTo] = useState(todayDate);
  const [deltaDisable, setDeltaDisable]  = useState(true);
  const [occurences, setOccurrences] = useState(0);
  const [legs, setLegs] = useState(0);
  const [intermittent, setIntermittent] = useState(0);
  const [days, setDays] = useState(0);
  const [airline, setAilineType] = useState("");
  const [ATAMain, setATAMain] = useState("");
  const [ACSN, setACSN] = useState("");
  const [messagesChoice, setIncludeMessages] = useState("");
  const [importedData, setImportedData] = useState({});
  const [checkHistory, setCheckHistory] = useState(true)

  let currentTimestamp = Date.now()
  let filter_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp)
  
  const [validationResponse, setValidationResponse] = useState('');
 
  const [reportConditions, setReportConditions] = useState(
  {
    analysis: 'daily',
    occurences: '',
    legs: '',
    intermittent: '',
    days: '',
    operator: '',
    ACSN: '',
    ata: '',
    eqID: '',
    messages: '',
    fromDate: todayDate,
    toDate: todayDate,
    deltaFrom: todayDate,
    deltaTo: todayDate,
  }
  );

  const handleAnalysisChange = (analysis) => {
    setAnalysisType(analysis);
    if (analysis === "delta") {
      setDeltaDisable(false);
    } else {
      setDeltaDisable(true);
    }
  };

  const handleDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleDateTo = (date) => {
    setDateTo(date);
  };

  const handleDeltaFrom = (date) => {
    setDeltaFrom(date);
  };

  const handleDeltaTo = (date) => {
    setDeltaTo(date);
  };

  const handleOccurencesChange = (occurences) =>{
    setOccurrences(occurences);
  };

  const handleLegsChange = (legs) =>{
    setLegs(legs);
  };

  const handleIntermittentChange = (intermittent) =>{
    setIntermittent(intermittent);
  };

  const handleDaysChange = (days) =>{
    setDays(days);
  };
 
  const handleAirlineChange = (Airline) => {
    setAilineType(Airline);
  };

  const handleATAChange = (ATA) => {
    setATAMain(ATA);
  };

  const handleACSNChange = (ACSN) => {
    setACSN(ACSN);
  };

  const handleMessagesChange = (messages) => {
    setIncludeMessages(messages);
  };

  const handleEqIDChange = (eqIDList) => {
    setEqID(eqIDList);
  };

  const handleGenerateReport = (event) => {
    setReportConditions(
    {
      analysis: analysis,
      occurences: occurences,
      legs: legs,
      eqID: EqID,
      intermittent: intermittent,
      days: days,
      operator: airline,
      ata: ATAMain,
      ACSN: ACSN,
      messages: messagesChoice,
      fromDate: dateFrom ? dateFrom : todayDate,
      toDate: dateTo ? dateTo : todayDate,
      deltaFrom: deltaFrom ? deltaFrom : todayDate,
      deltaTo: deltaTo ? deltaTo : todayDate,
    });
  }    

const notFirstRender = NotFirstRender();

useEffect(() => {
  if (notFirstRender) {
    let validationResponse = GenerateReportValidation(reportConditions);
    setValidationResponse(validationResponse);
  }
}, [reportConditions]);

const SaveFilter = (jsonData,filename) => {
    const filterObj = {
    analysis,
    occurences,
    legs,
    eqID: EqID,
    intermittent,
    days,
    operator: airline,
    ACSN: ACSN,
    ata: ATAMain,
    messages: messagesChoice,
    fromDate: dateFrom,
    toDate: dateTo,
    deltaFrom,
    deltaTo

  }
  
    const fileData = JSON.stringify(filterObj);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    link.click(); 
} 


function upload_filter(e) {
  
  let files = e.target.files;
  let reader = new FileReader();
  reader.readAsText(files[0]);
  
  reader.onload = (e) => {
    const file_Content = e.target.result;
    var data = JSON.parse(file_Content);
    setImportedData(data);
    if(data.analysis) setAnalysisType(data.analysis); 
     
    alert("File uploaded!")
  }
}

useEffect(()=>{
  const reportState = localStorage.getItem('report');
  const reportJson = JSON.parse(reportState);
  if(reportJson){
    setImportedData(reportJson);
    if(reportJson.analysis) setAnalysisType(reportJson.analysis);
  }
},[])

  return (
    <div className="analysis-root">
      <form className="analysis-form">
        <Paper className={classes.paper}>
        <div className="analysis-card">
          <h2>REPORT ANALYSIS</h2>
        </div>
        
          <div>

          <Grid className={classes.Grid} container spacing={3}> 
          
            <Grid item xs={2}>
            <div className="analysis-type-container">

              <FormControl component="fieldset" className="form" >
              <FormLabel component="legend" className="analysis-type-label" focused={false}>Analysis Type</FormLabel>
              <p className="validation-message">{validationResponse.analysisMessage}</p>
              <RadioGroup aria-label="analysis" name="analysis" value={analysis} >
                <FormControlLabel value="daily" className="RadioButton" control={
                  <Radio 
                    size="medium"
                    color = 'default'
                    onChange={()=>handleAnalysisChange("daily")} 
                  />} label="Daily" />
                <FormControlLabel value="history" control={
                  <Radio 
                  size="medium"
                  color = 'default'
                  onChange={()=>handleAnalysisChange("history")} 
                  />} label="History" />
                <FormControlLabel value="delta" control={
                  <Radio 
                  size="medium"
                  color = 'default'
                  onChange={()=>handleAnalysisChange("delta")} 
                  />} label="Delta" />
                  <FormControlLabel value="flag" control={
                  <Radio 
                  size="medium"
                  color = 'default'
                  onChange={()=>handleAnalysisChange("flag")} 
                  />} label="Flag"
                  disabled = {checkHistory} />
                  <FormControlLabel value="surrounding" control={
                  <Radio 
                  size="medium"
                  color = 'default'
                  onChange={()=>handleAnalysisChange("surrounding")} 
                  />} label="Surrounding" 
                  disabled = {checkHistory}/>
              </RadioGroup>
              </FormControl> 
            </div>           
            </Grid>
            <Grid item xs={2}>     
              <div>
                <h3>Analysis Input</h3>   
                <p className="validation-message">{validationResponse.occurencesMessage}</p>
                <OccurencesInput 
                  handleOccurencesChange = {handleOccurencesChange}
                  occurrences={importedData.occurences}
                />
                <p className="validation-message">{validationResponse.legsMessage}</p>
                <LegsInput 
                  handleLegsChange = {handleLegsChange}
                  legs={importedData.legs}
                />  
                <p className="validation-message">{validationResponse.intermittentMessage}</p>
                <IntermittentInput 
                  handleIntermittentChange = {handleIntermittentChange}
                  intermittent={importedData.intermittent}
                />
                <p className="validation-message">{validationResponse.daysMessage}</p>
                <DaysInput 
                analysis = {analysis}  
                handleDaysChange = {handleDaysChange}
                days={importedData.days}
                />   
              </div>           
            </Grid>  
            <Grid item xs={3}>     
            <div>
            <h3>Raw Data Conditions</h3> 
            <p className="validation-message">{validationResponse.operatorMessage}</p>
            <AirlineOperatorSelector
                handleAirlineChange = {handleAirlineChange}
                operator = {importedData.operator}
              />         
              <p className="validation-message">{validationResponse.currentMessage}</p>
              <MessagesSelector 
                handleMessagesChange = {handleMessagesChange}
                messages = {importedData.messages}
              />   
              <p className="validation-message">{validationResponse.ataMessage}</p>
              <ATAMainSelector 
                handleATAChange = {handleATAChange}
                ata = {importedData.ata}
              />   
              <p className="validation-message">{validationResponse.eqIDMessage}</p>
              <EqIDSelector 
                handleEqIDChange = {handleEqIDChange}
                eqID = {importedData.eqID}
              />  
              <p className="validation-message">{validationResponse.ACSNMessage}</p>
              <ACSNSelector 
                handleACSNChange = {handleACSNChange}
                ACSN = {importedData.ACSN}
              />   
            </div>                    
            </Grid>       
            <Grid item xs={3}>     
              <h3>Report Date</h3> 
              <p className="validation-message">{validationResponse.fromDateMessage}</p>
              <DatePicker 
                label = "From"
                handleDateFrom = {handleDateFrom}
                dateFrom = {importedData.fromDate}
              />   
              <p className="validation-message">{validationResponse.toDateMessage}</p>
              <DatePicker 
                label = "To"
                handleDateTo = {handleDateTo}
                dateTo = {importedData.toDate}
              />   
              <p className="validation-message">{validationResponse.fromDeltaMessage}</p>
               <DatePicker 
                label = "Delta From"
                handleDateFrom = {handleDeltaFrom}
                disabled = {deltaDisable}
                //dateFrom = {importedData.fromDate}
              />   
              <p className="validation-message">{validationResponse.toDeltaMessage}</p>
              <DatePicker 
                label = "Delta To"
                handleDateTo = {handleDeltaTo}
                disabled = {deltaDisable}
                //dateTo = {importedData.toDate}
              />   
            </Grid>    
            <Grid item xs={2}> 
              <div className="buttons-container">
                <Button 
                  variant="contained" 
                  onClick = {async()=>handleGenerateReport()}>
                    Generate Report
                </Button>  
                <Button 
                  variant="contained" 
                  onClick = {()=>SaveFilter("","Filter_"+filter_date)}
                  >
                    Save Filter
                </Button>
                {/* <br></br> */}
                <input
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange = {(e) => upload_filter(e)}
                />
                <label htmlFor="contained-button-file" style={{ margin:'40px auto', width:'70%', backgroundColor:"#C5D3E0", textAlign:"center"}}>
                  <Button id="upload" variant="contained" component="span"  className={classes.button}>
                    Upload
                  </Button>
                </label>
              </div>                  
            </Grid>         
        </Grid>
      </div>
        </Paper>
      </form>
        <Report reportConditions = {reportConditions}
         setCheckHistory = {setCheckHistory}/>
        
    </div>
  );
};

export default Conditions;
