import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {OccurencesInput,LegsInput,IntermittentInput,DaysInput} from './AnalysisInput';
import Paper from '@material-ui/core/Paper';
import DatePicker from './DatePicker';
import {AirlineOperatorSelector,ATAMainSelector,MessagesSelector,EqIDSelector} from './Selectors';
import Report from '../Reports/Report';
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import "../../../scss/_main.scss";

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
  var todayDate = new Date().toISOString().slice(0, 10);
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
  const [messagesChoice, setIncludeMessages] = useState("");
  const [importedData, setImportedData] = useState({});
  let newDate = new Date();
  let currDate = newDate.getDate();
  let currMonth = newDate.getMonth()+1;
  let currYear = newDate.getFullYear();
  
 
  const [reportConditions, setReportConditions] = useState(
  {
    analysis: '',
    occurences: '',
    legs: '',
    intermittent: '',
    days: '',
    operator: '',
    ata: '',
    eqID: '',
    messages: '',
    fromDate: '',
    toDate: '',
    deltaFrom: '',
    deltaTo: '',
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
      messages: messagesChoice,
      fromDate: dateFrom,
      toDate: dateTo,
      deltaFrom: deltaFrom,
      deltaTo: deltaTo,
    });
  }    
const SaveFilter = (jsonData,filename) => {
  
    const fileData = JSON.stringify(jsonData);
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
    console.log(data)
    setImportedData(data);
    if(data.analysis) setAnalysisType(data.analysis); 
     
    alert("File uploaded!")
  }
}

  return (
    <div class="analysis-root">
      <form class="analysis-form">
        <Paper className={classes.paper}>
        <div class="analysis-card">
          <h2>REPORT ANALYSIS</h2>
        </div>
        
          <div>

          <Grid className={classes.Grid} container spacing={3}> 
          
            <Grid item xs={2}>
            <div class="analysis-type-container">

              <FormControl component="fieldset" className="form" >
              <FormLabel component="legend" class="analysis-type-label" focused="false">Analysis Type</FormLabel>
              
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
              </RadioGroup>
              </FormControl> 
            </div>           
            </Grid>
            <Grid item xs={2}>     
              <div>
                <h3>Analysis Input</h3>   
                <OccurencesInput 
                  handleOccurencesChange = {handleOccurencesChange}
                  occurrences={importedData.occurences}
                />
                <LegsInput 
                  handleLegsChange = {handleLegsChange}
                  legs={importedData.legs}
                />  
                <IntermittentInput 
                  handleIntermittentChange = {handleIntermittentChange}
                  intermittent={importedData.intermittent}
                />
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
            <AirlineOperatorSelector
                handleAirlineChange = {handleAirlineChange}
                operator = {importedData.operator}
              />         
              <MessagesSelector 
                handleMessagesChange = {handleMessagesChange}
                messages = {importedData.messages}
              />   
              <ATAMainSelector 
                handleATAChange = {handleATAChange}
                ata = {importedData.ata}
              />   
              <EqIDSelector 
                handleEqIDChange = {handleEqIDChange}
                eqID = {importedData.eqID}
              />  
            </div>                    
            </Grid>       
            <Grid item xs={3}>     
              <h3>Report Date</h3> 
              <DatePicker 
                label = "From"
                handleDateFrom = {handleDateFrom}
                dateFrom = {importedData.fromDate}
              />   
              <DatePicker 
                label = "To"
                handleDateTo = {handleDateTo}
                dateTo = {importedData.toDate}
              />   
               <DatePicker 
                label = "Delta From"
                handleDateFrom = {handleDeltaFrom}
                disabled = {deltaDisable}
                //dateFrom = {importedData.fromDate}
              />   
              <DatePicker 
                label = "Delta To"
                handleDateTo = {handleDeltaTo}
                disabled = {deltaDisable}
                //dateTo = {importedData.toDate}
              />   
            </Grid>    
            <Grid item xs={2}> 
              <div class="buttons-container">
                <Button 
                  variant="contained" 
                  onClick = {async()=>handleGenerateReport()}>
                    Generate Report
                </Button>  
                <Button 
                  variant="contained" 
                  onClick = {async()=>SaveFilter(reportConditions,"Filter_"+ currDate+"-"+currMonth+"-"+currYear)}
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
        <Report reportConditions = {reportConditions}/>
        
    </div>
  );
};

export default Conditions;
