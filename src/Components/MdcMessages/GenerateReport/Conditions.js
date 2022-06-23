import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { OccurencesInput, LegsInput, IntermittentInput, DaysInput } from './AnalysisInput';
import Card from '@material-ui/core/Card';
import DatePicker from './DatePicker';
import { AirlineOperatorSelector, ATAMainSelector, ACSNSelector, MessagesSelector, EqIDSelector } from './Selectors';
import Report from '../Reports/Report';
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import "../../../scss/_main.scss";
import "../../../../src/scss/components/_analysis.scss"
import { GenerateReportValidation, NotFirstRender } from '../../Helper/Helper';
import moment from "moment";
// Accordion Imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StickyBox from "react-sticky-box";
import { Paper } from '@material-ui/core';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import SaveIcon from '@mui/icons-material/Save';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
  const [deltaDisable, setDeltaDisable] = useState(true);
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

  const handleOccurencesChange = (occurences) => {
    setOccurrences(occurences);
  };

  const handleLegsChange = (legs) => {
    setLegs(legs);
  };

  const handleIntermittentChange = (intermittent) => {
    setIntermittent(intermittent);
  };

  const handleDaysChange = (days) => {
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

  const SaveFilter = (jsonData, filename) => {
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
    const blob = new Blob([fileData], { type: "text/plain" });
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
      if (data.analysis) setAnalysisType(data.analysis);

      alert("File uploaded!")
    }
  }

  useEffect(() => {
    const reportState = localStorage.getItem('report');
    const reportJson = JSON.parse(reportState);
    if (reportJson) {
      setImportedData(reportJson);
      if (reportJson.analysis) setAnalysisType(reportJson.analysis);
    }
  }, [])

  return (
    <div className="row">
      
        <div class="column selectorCard">
       
        {/* <Button variant="contained">Contained</Button> */}
        <Button variant="outlined" href="#contained-buttons" style={{width: '50%', height: '52px', borderRadius: '11px', padding: '25px 18px 10px 0px'}}>
          
          <ViewWeekIcon color="primary" style={{ fontSize: '25px'}}/>
          <p style={{ fontSize: '15px'}}>Filters</p>
          <VerticalAlignTopIcon color="primary" style={{fontSize: '25px'}}/>
          <SaveIcon color="primary" style={{fontSize: '25px'}}/>
          
    
        </Button>
        <Button variant="outlined" href="#contained-buttons" style={{ width: '50%', height: '52px', borderRadius: '11px', padding: '25px 18px 10px 0px'}}>
          <FavoriteIcon color="primary" style={{fontSize: '21px'}}/>
          <h2  style={{fontSize: '16px'}}>/</h2>
          <RemoveRedEyeIcon color="primary"  style={{fontSize: '21px'}}/>
          <p style={{ fontSize: '11px'}}>Saved Filters</p>
        </Button>
          <Paper variant="outlined">
          <div>
          {/* <div className="analysis-card">
            <h2>REPORT ANALYSIS</h2>
          </div> */}

          <div className='analysis-selectors'>

            {/* <Grid className={classes.Grid}> */}

              {/* <Grid item xs={12} style={{height: '36px'}}> */}

                <div >
                <FormControl component="fieldset" className="form" >
              
              <Typography className='h3' style={{padding: '4px'}}>Report Type</Typography>
              <p className="validation-message">{validationResponse.analysisMessage}</p>
              <RadioGroup aria-label="analysis" name="analysis" value={analysis} style={{padding: '6px'}} >
                {/* <FormControlLabel value="daily" className="RadioButton" control={
                  <Radio
                    size="medium"
                    color='default'
                    onChange={() => handleAnalysisChange("daily")}
                  />} label="Daily" /> */}
                <FormControlLabel value="history" control={
                  <Radio
                    size="medium"
                    color='default'
                    onChange={() => handleAnalysisChange("history")}
                  />} label="History" />
                <FormControlLabel value="delta" control={
                  <Radio
                    size="medium"
                    color='default'
                    onChange={() => handleAnalysisChange("delta")}
                  />} label="Delta" />
                {/* <FormControlLabel value="flag" control={
                  <Radio
                    size="medium"
                    color='default'
                    onChange={() => handleAnalysisChange("flag")}
                  />} label="Flag"
                  disabled={checkHistory} /> */}
                {/* <FormControlLabel value="surrounding" control={
                  <Radio
                    size="medium"
                    color='default'
                    onChange={() => handleAnalysisChange("surrounding")}
                  />} label="Surrounding"
                  disabled={checkHistory} /> */}
              </RadioGroup>
            </FormControl>
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className='accordion-titles'>Date/Time(UTC)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div style={{display: 'inline-flex'}}>
                        <p className="validation-message">{validationResponse.fromDateMessage}</p>
                        <DatePicker
                          label="From"
                          handleDateFrom={handleDateFrom}
                          dateFrom={importedData.fromDate}
                        />
                        <p className="validation-message">{validationResponse.toDateMessage}</p>
                        <DatePicker
                          label="To"
                          handleDateTo={handleDateTo}
                          dateTo={importedData.toDate}
                          variant="inline"
                        />
                        </div>
                      <div style={{display: 'inline-flex'}}>
                      <p className="validation-message">{validationResponse.fromDeltaMessage}</p>
                        <DatePicker
                          label="Delta From"
                          handleDateFrom={handleDeltaFrom}
                          disabled={deltaDisable}
                        //dateFrom = {importedData.fromDate}
                        />
                        <p className="validation-message">{validationResponse.toDeltaMessage}</p>
                        <DatePicker
                          label="Delta To"
                          handleDateTo={handleDeltaTo}
                          disabled={deltaDisable}
                          style={{width: '40%'}}
                        //dateTo = {importedData.toDate}
                        />
                      </div>
                    

                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className='accordion-titles'>Analysis Input</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div style={{display: 'inline-flex', padding: '6px'}}>
                    <Typography>
                        <p className="validation-message">{validationResponse.occurencesMessage}</p>
                        
                        <OccurencesInput
                          handleOccurencesChange={handleOccurencesChange}
                          occurrences={importedData.occurences}
                        />
                      </Typography>

                      <Typography>
                        <p className="validation-message">{validationResponse.legsMessage}</p>
                    
                        <LegsInput
                          handleLegsChange={handleLegsChange}
                          legs={importedData.legs}
                        />
                      </Typography>
                      </div>
                      <div style={{display: 'inline-flex', padding: '6px'}}>
                      <Typography>
                        <p className="validation-message">{validationResponse.daysMessage}</p>
                      
                        <DaysInput
                          analysis={analysis}
                          handleDaysChange={handleDaysChange}
                          days={importedData.days}
                        />
                      </Typography>

                      <Typography>
                        <p className="validation-message">{validationResponse.intermittentMessage}</p>
                        <IntermittentInput
                          handleIntermittentChange={handleIntermittentChange}
                          intermittent={importedData.intermittent}
                        />
                      </Typography>
                        </div>

                
                    </AccordionDetails>
                  </Accordion>

            



                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className='accordion-titles'>Raw Data Conditions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography  style={{padding: '4px'}}>
                        <p className="validation-message">{validationResponse.operatorMessage}</p>
                        <AirlineOperatorSelector
                          handleAirlineChange={handleAirlineChange}
                          operator={importedData.operator}
                        />
                      </Typography>

                      <Typography style={{padding: '4px'}}>
                        <p className="validation-message">{validationResponse.ataMessage}</p>
                        <ATAMainSelector
                          handleATAChange={handleATAChange}
                          ata={importedData.ata}
                        />
                      </Typography>

                      <Typography  style={{padding: '4px'}}>
                        <p className="validation-message">{validationResponse.eqIDMessage}</p>
                        <EqIDSelector
                          handleEqIDChange={handleEqIDChange}
                          eqID={importedData.eqID}
                        />
                      </Typography>

                      <Typography  style={{padding: '4px'}}>
                        <p className="validation-message">{validationResponse.ACSNMessage}</p>
                        <ACSNSelector
                          handleACSNChange={handleACSNChange}
                          ACSN={importedData.ACSN}
                        />
                      </Typography>

                    </AccordionDetails>
                  </Accordion>

                  {/* <p className="validation-message">{validationResponse.currentMessage}</p> */}
                  {/* <MessagesSelector 
                handleMessagesChange = {handleMessagesChange}
                messages = {importedData.messages}
              />    */}

                </div>
                <div style={{height: '71px'}}>
                <Button variant="text" style={{left: '1vw', top: '3vh' }}>Clear</Button>
                  <Button variant="text"
                  onClick={async () => handleGenerateReport()} style={{left: '9vw',  top: '3vh'}} >Apply</Button>
                </div>
              
{/*                
              </Grid> */}

              {/* <Grid item xs={2} > */}
             
                  
    
                  {/* <Button
                    variant="contained"
                    onClick={() => SaveFilter("", "Filter_" + filter_date)}
                  >
                    Save Filter
                  </Button> */}
                  {/* <br></br> */}
                  {/* <input
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => upload_filter(e)}
                  /> */}
                  {/* <label htmlFor="contained-button-file" style={{ margin: '40px auto', width: '70%', backgroundColor: "#C5D3E0", textAlign: "center" }}>
                    <Button id="upload" variant="contained" component="span" className={classes.button}>
                      Upload
                    </Button>
                  </label> */}
               
              {/* </Grid> */}
            {/* </Grid> */}
          </div>
        </div>
          </Paper>
      
      </div>
      <div className="column reportCard">
    
      <Report reportConditions={reportConditions}
        setCheckHistory={setCheckHistory} />

   </div>

    </div>
  );
};

export default Conditions;



//  <Accordion>
//                       <AccordionSummary
//                         expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                       >
//                         <Typography>Are you open on holidays?</Typography>
//                       </AccordionSummary>
//                       <AccordionDetails>
//                         <Typography>
//                           We are open for service during any holiday except New Years.
//                         </Typography>
//                       </AccordionDetails>
//                     </Accordion> 
