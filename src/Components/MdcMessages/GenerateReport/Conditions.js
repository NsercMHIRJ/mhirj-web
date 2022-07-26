import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { OccurencesInput, LegsInput, IntermittentInput, DaysInput } from './AnalysisInput';
import DatePicker from './DatePicker';
import { AirlineOperatorSelector, ATAMainSelector, ACSNSelector, MessagesSelector, EqIDSelector } from './Selectors';
import Report from '../Reports/Report';
//Radio Button Imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import Button from '@material-ui/core/Button';
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
import Localbase from 'localbase'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button';
import { Heart } from "react-bootstrap-icons";
import { BsFillArchiveFill } from "react-icons/bs";
import { FaSave } from 'react-icons/fa';
import CorrelationAnalysisTable from '../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';

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
  const db = new Localbase('reportDatas');
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
  const [importedData, setImportedData] = useState({});
  const [checkHistory, setCheckHistory] = useState(true)
  const [isSavedFilter , setIsSavedFilter] = useState(false)
  let currentTimestamp = Date.now()
  let filter_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentTimestamp)

  const [validationResponse, setValidationResponse] = useState({});

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

  const handleAirlineChange = (Airline) => {
    setAilineType(Airline);
  };

  const handleATAChange = (ATA) => {
    setATAMain(ATA);
  };

  const handleACSNChange = (ACSN) => {
    setACSN(ACSN);
  };

  const handleEqIDChange = (eqIDList) => {
    setEqID(eqIDList);
  };

  useEffect(() => {
    const reportState = localStorage.getItem('report');
    const reportJson = JSON.parse(reportState);
    if (reportJson) {
      setImportedData(reportJson);
      if (reportJson.analysis) setAnalysisType(reportJson.analysis);
    }
  }, [])

  const handleGenerateReport = (event) => {
    db.collection('reporstLocal')
    .doc('historyData')
    .delete()
    .then(response => {
      localStorage.removeItem('report')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })

    db.collection('reporstLocal')
    .doc('deltaData')
    .delete()
    .then(response => {
      localStorage.removeItem('report')
      console.log('Delete successful, now do something.')
    })
    .catch(error => {
      console.log('There was an error, do something else.')
    })
    
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
        fromDate: dateFrom ? dateFrom : todayDate,
        toDate: dateTo ? dateTo : todayDate,
        deltaFrom: deltaFrom ? deltaFrom : todayDate,
        deltaTo: deltaTo ? deltaTo : todayDate,
      });
  }


  return (

    
  <Container fluid>
    <Row className='d-flex flex-row flex-nowrap overflow-auto'>
   
      <Col xs={3} style={{position:'fixed' , float: 'left', overflowY: 'scroll', maxHeight: '90vh'}} className="keep-scrolling">
        
        <Button size="lg" variant="outline-secondary" style={{width: '49%'}} onClick={ () => setIsSavedFilter(false)}>
          <BsFillArchiveFill/> Filters 
              </Button>{" "}
        <Button size="lg" variant="outline-secondary" style={{width: '49%'}} onClick={ () => setIsSavedFilter(true)}>
        Saved Filters <FaSave/> 
              </Button>{" "}
     
      <Card className="card card-block mx-2">

      {isSavedFilter ?  
        (
          <Card.Body>
            <p style={{fontSize: '16px'}}><strong>Watchlist:</strong></p>
            <Card >
              <p style={{padding: '4px'}}>Watchlist</p>
            </Card>
            <p style={{fontSize: '16px'}}><strong>Saved Filters:</strong></p>
            <ListGroup as="ol" numbered>
            <ListGroup.Item >
              <p>Saved Filter 1</p>
              <div style={{float: 'right'}}>
                <EditIcon />
                <DeleteIcon />
              </div>
              </ListGroup.Item>
            <ListGroup.Item >
              <p style={{float: 'left'}}>Spolier system </p>
              <div style={{float: 'right'}}>
                <EditIcon />
                <DeleteIcon />
              </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        )
        : 
        (<Card.Body>
   
        <div>

          <FormControl component="fieldset" className="form" >
          
            <Typography className='h3' style={{padding: '4px'}}>Report Type</Typography>

            <p className="validation-message">{validationResponse.analysisMessage}</p>
        
            <RadioGroup aria-label="analysis" name="analysis" value={analysis} style={{padding: '6px'}} >
         
              <FormControlLabel value="history" control={
                <Radio
                  size="medium"
                  color='default'
                  onChange={() => handleAnalysisChange("history")}
                />} label="History" />
                <br/>
              <FormControlLabel value="delta" control={
                <Radio
                  size="medium"
                  color='default'
                  onChange={() => handleAnalysisChange("delta")}
                />} label="Delta" />
          
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
             
                <p className="validation-message">{validationResponse.occurencesMessage ? validationResponse.occurencesMessage : ''}</p> 
                    
                <OccurencesInput
                  handleOccurencesChange={handleOccurencesChange}
                  occurrences={importedData.occurences}
                />
              
                <p className="validation-message">{validationResponse.legsMessage ? validationResponse.legsMessage : ''}</p>
                
                <LegsInput
                  handleLegsChange={handleLegsChange}
                  legs={importedData.legs}
                />
            
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

              <p className="validation-message">{validationResponse.operatorMessage ? validationResponse.operatorMessage : ''}</p>

              <AirlineOperatorSelector
                handleAirlineChange={handleAirlineChange}
                operator={importedData.operator}
              />
        
              <p className="validation-message">{validationResponse.ataMessage ? validationResponse.ataMessage : ''}</p>

              <ATAMainSelector
                handleATAChange={handleATAChange}
                ata={importedData.ata}
              />
        
              <p className="validation-message">{validationResponse.eqIDMessage ? validationResponse.eqIDMessage : ''}</p>

              <EqIDSelector
                handleEqIDChange={handleEqIDChange}
                eqID={importedData.eqID}
              />
          
              <p className="validation-message">{validationResponse.ACSNMessage ? validationResponse.ACSNMessage : ''}</p>

              <ACSNSelector
                handleACSNChange={handleACSNChange}
                ACSN={importedData.ACSN}
              />
                
            </AccordionDetails>

          </Accordion>

        </div>

  

  </Card.Body>)
        }
     
     <Card.Footer>
     <div style={{height: '71px'}}>

      <Button variant="text" >Clear</Button>

      <Button variant="text" onClick={async () => handleGenerateReport()} >{isSavedFilter ? "Search" : "Apply"}</Button>

      </div>
     </Card.Footer>
        </Card>
     
    
      </Col>
      <Col xs={9} style={{ position: 'absolute' , left: '24vw'}} >

      <Report reportConditions={reportConditions}
          setCheckHistory={setCheckHistory} />
    
          
      </Col>
    </Row>
  </Container>
     
    
       

  );
};

export default Conditions;
