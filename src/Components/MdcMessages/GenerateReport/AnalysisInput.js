import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';

export const OccurencesInput = (props) => {
  const [occurences, setOccurrences] = React.useState('0');
  const handleOccurencesChange = (event) => {
    event.target.value < 0 ?  setOccurrences(event.target.value = 0) :setOccurrences(event.target.value);
    props.handleOccurencesChange(event.target.value);
  };
  useEffect(() => {
    if(props.occurrences){
      props.handleOccurencesChange(props.occurrences);
      setOccurrences(props.occurrences);
    } 
  },[props.occurrences]);
  return(
    <TextField
      label="Min Occurences Logged"
      type="number"
      onChange = {handleOccurencesChange}
      value = {occurences}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
  );
}
export const LegsInput = (props) => {
  const [legs, setLegs] = React.useState('0');
  const handleLegsChange = (event) => {
    event.target.value < 0 
  ?  setLegs(event.target.value = 0) 
  :  setLegs(event.target.value);
    props.handleLegsChange(event.target.value);
  };
  
  useEffect(() => {
    if(props.legs){
      props.handleLegsChange(props.legs);
      setLegs(props.legs);
    } 
  },[props.legs]);
  return(
    <TextField
    label="Min Consecutive Legs"
    type="number"
    onChange = {handleLegsChange}
    value = {legs}
    InputLabelProps={{
      shrink: true,
    }}
    variant="outlined"
  />
  );
}
export const IntermittentInput = (props) => {
  const [intermittent, setIntermittent] = React.useState('0');
  const handleIntermittentChange = (event) => {
    event.target.value < 0 
    ?  setIntermittent(event.target.value = 0) 
    :  setIntermittent(event.target.value);
    props.handleIntermittentChange(event.target.value);
  };
  useEffect(() => {
    if(props.intermittent){
      props.handleIntermittentChange(props.intermittent);
      setIntermittent(props.intermittent);
    } 
  },[props.intermittent]);

  return(
    <TextField
      label="Min Intermittency Per Leg"
      type="number"
      onChange = {handleIntermittentChange}
      value = {intermittent}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
  );
}
export const DaysInput = (props) => {
  const [days, setDays] = React.useState('0');
  const [disabled, setDisabled] = React.useState('');

  const handleDaysChange = (event) => {
    event.target.value < 0 
    ?  setDays(event.target.value = 0) 
    :  setDays(event.target.value);
    props.handleDaysChange(event.target.value);
  };
  useEffect(() => {
    if (props.analysis === 'daily'){
      setDisabled(prevState => ({ disabled: true}));
    }
    else {
      setDisabled(prevState => ({  disabled: false}));
    }    
  }, [props.analysis]);
  
  useEffect(() => {
    if(props.days){
      props.handleDaysChange(props.days);
      setDays(props.days);
    } 
  },[props.days]);
  
  return(
    <TextField
      {...disabled}
      label="Min Consecutive Days"
      type="number"
      onChange = {handleDaysChange}
      value = {days}
      InputLabelProps={{
        shrink: true,       
      }}
      variant="outlined"
    />
  );
}
const AnalysisInput = (props) => {
  return (
    <div></div>
  );
};

export default AnalysisInput;