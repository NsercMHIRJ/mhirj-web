import React, {useRef,useEffect} from 'react';
import moment from 'moment'

export const DateConverter = (date) => {
  var t = moment.utc(date);
  var formatted = t.format('DD-MMM-YYYY HH:mm');
  return formatted;
}

export const ConvertToTimestamp = (date) => {
  var timestamp = moment(date).format("X");
  return timestamp;
}

export const DateConverterCorrelation = (date) => {
  var t = moment.utc(date);
  var formatted = t.format('LL');
  return formatted;
}

export const GenerateReportValidation = (report) => {
  let validationResponse = {};
  validationResponse.status = true;

  if ( report.analysis === "" ) {
    validationResponse.analysisMessage = "Analysis type is a required field.";
    validationResponse.status = false;
  } 
  
  if ( report.occurences == 0 ) {
    validationResponse.occurencesMessage = "Occurences must be higher than 0.";
    validationResponse.status = false;
  } 
  
  if ( report.legs == 0 ) {
    validationResponse.legsMessage = "Consecutive legs must be higher than 0.";
    validationResponse.status = false;
  }
  
  if ( report.eqID === "" ) {
    validationResponse.eqIDMessage = "Exclude Equation ID is a required field."
    validationResponse.status = false;
  } 
  
  if ( report.intermittent == 0 ) {
    validationResponse.intermittentMessage = "Intermittency must be higher than 0.";
    validationResponse.status = false;
  } 
  
  if ( report.days == 0 ) {
    if (report.analysis !== "daily") {
      validationResponse.daysMessage = "Consecutive days must be higher than 0.";
      validationResponse.status = false;
    }
  } 
  
  if ( report.operator === "" ) {
    validationResponse.operatorMessage = "Airline Operator is a required field.";
    validationResponse.status = false;
  }
  
  if ( report.ata === "" ) {
    validationResponse.ataMessage = "ATA Main is a required field";
    validationResponse.status = false;
  } 
  
  if ( report.messages === "" ) {
    validationResponse.currentMessage = "Current Messages is a required field";
    validationResponse.status = false;
  } 

  if ( report.fromDate === undefined ) {
    validationResponse.fromDateMessage = "From date is a required field."
    validationResponse.status = false;
  }

  if ( report.toDate === undefined ) {
    validationResponse.toDateMessage = "To date is a required field."
    validationResponse.status = false;
  }

  if ( report.deltaFrom === undefined ) {
    if (report.analysis === "delta") {
      validationResponse.fromDeltaMessage = "Delta from date is a required field."
      validationResponse.status = false;
    }
  }

  if ( report.deltaTo === undefined ) {
    if (report.analysis === "delta") {
      validationResponse.toDeltaMessage = "Delta to date is a required field."
      validationResponse.status = false;
    }
  }

  return validationResponse;
}

export const GenerateCorrelationValidation = (report) => {
  let validationResponse = {};
  validationResponse.status = true;
  
  if ( report.dateFrom === undefined ) {
    validationResponse.fromDateMessage = "From date is a required field."
    validationResponse.status = false;
  }

  if ( report.dateTo === undefined ) {
    validationResponse.toDateMessage = "To date is a required field."
    validationResponse.status = false;
  }

  return validationResponse;
}

export const NotFirstRender = () => {
  const firstRender = useRef(false);

  useEffect(() => {
      firstRender.current = true;
  }, []);

  return firstRender.current;
}

const Helper = () => {

}

export default Helper;