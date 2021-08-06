import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width:'90%',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  container:{
    margin: '0px 50px 0px 0px',
  },
  autocomplete:{
    margin: theme.spacing(0),
    width:'90%',
    minWidth: 120,
  }
}));

const AirlineList = ['SKW'];
const MessagesList = ['Include', 'Exclude'];

export const AirlineOperatorSelector = (props) => {
  const classes = useStyles();
  const [airline, setAirline] = useState('');

  useEffect(() => {
    if(props.operator){
      props.handleAirlineChange(props.operator);
      setAirline(props.operator);
    } 
  },[props.operator]);

  const handleAirlineChange = (event) => {
    if ( event.target.value === "none"){
      setAirline("");
      props.handleAirlineChange("");
    }
    else{
      setAirline(event.target.value);
      props.handleAirlineChange(event.target.value);
    }  
  };

  return(
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Airline Operator</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={airline}
        onChange={handleAirlineChange}
        label="Airline Operator"
      >
      <MenuItem value="none"> </MenuItem>
      {AirlineList.map( item => 
        <MenuItem value={item} key={item}> {item} </MenuItem>
      )};
      </Select>
    </FormControl>
  );
}

export const ATAMainSelector = (props) => {
  const classes = useStyles();
  const [ATAMain, setATAMain] = useState([]);
  const [ATAMainList,setATAMainList] = useState([]);
  useEffect(() => {
    const path = 'http://20.85.211.143:8080/api/GenerateReport/ata_main/ALL'

    try{
      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        let ATAArray = ['ALL'];
        Object.values(data).map((item=>{
          ATAArray.push(item.ATA_Main.toString());
        }))
        setATAMainList(ATAArray);
      });
    } catch (err) {
      console.error(err);
    }
},[]);

 
  const handleATAChange = (event, values) => {
    const ATAValues = [];
    if(values.includes("ALL")){
      ATAValues.push("ALL");
      setATAMain(ATAValues);
      props.handleATAChange("ALL");
    }
    else{
      setATAMain(values);    
      let ataList = Object.values(values).length >0 ?  "('"+ values.join("','") +"')" : "";
      props.handleATAChange(ataList);
    }
  };

  useEffect(() => {
    if(props.ata){
      if(props.ata == 'ALL') {
          setATAMain(['ALL']);
          props.handleATAChange("ALL");
      }
      else {
          var pattern = /(\d+)/g;
          let vals = props.ata.match(pattern);
          setATAMain(vals);
          props.handleATAChange(props.ata);
          //console.log("vals =",vals);
      } 
    }
  },[props.ata])

  return(
    <Autocomplete
    className={classes.autocomplete}
    multiple
    options={ATAMainList}
    getOptionLabel={(item => item)}
    value = {ATAMain}
    filterSelectedOptions
    onChange = {handleATAChange}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        label="ATA Main"
        placeholder="ATA Main"
        />
    )}
  />
  );
}

export const EqIDSelector = (props) => {
  const classes = useStyles();
  const [EqID, setEqID] = useState([]);
  const [EqList,setEqIDList] = useState([]);
  useEffect(() => {
    const path = 'http://20.85.211.143:8080/api/GenerateReport/equation_id/ALL'

    try{
      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        let EQArray = ['NONE'];
        Object.values(data).map((item=>{
          EQArray.push(item.Equation_ID.toString());
        }))
        setEqIDList(EQArray);
      });
    } catch (err) {
      console.error(err);
    }
},[]);

  const handleEqIDChange = (event, values) => {
    const EqIDValues = [];
    if(values.includes("NONE")){
      EqIDValues.push("NONE");
      setEqID(EqIDValues);
      props.handleEqIDChange("NONE");
    }
    else{
      setEqID(values);    
      let eqIDLIST = Object.values(values).length >0 ?  "('"+ values.join("','") +"')" : "";
      props.handleEqIDChange(eqIDLIST);
    }
  };

  useEffect(() => {
    if(props.eqID){
      if(props.eqID == 'NONE') {
          setEqID(['NONE']);
          props.handleEqIDChange("NONE");
      }
      else {
          props.handleEqIDChange(props.eqID);
          // console.log(props.eqID)
          let var1 = props.eqID.substring(1);
      

          var1 = var1.substring(0, var1.length - 1).replace(/'/g,'').split(',');
          console.log("vals = ", var1)
          setEqID(var1);
          
      } 
    }
  },[props.eqID])

  return(

    <Autocomplete
        className={classes.autocomplete}
        multiple
        options={EqList}
        getOptionLabel={(item => item)}
        value = {EqID}
        filterSelectedOptions
        onChange = {handleEqIDChange}
        searchEnabled = {true}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Exclude Equation ID"
            placeholder="EqID"
            />
        )}
      />
  );
};

export const MessagesSelector = (props) => {
  const classes = useStyles();
  const [messages, setIncludeMessages] = useState('');

  const handleMessagesChange = (event) => {
    let value;
    if (event.target.value === "none"){
      value = "";
    }
    else if (event.target.value === 'Include'){
      value = 1;
    }
    else{
      value = 0;
    }
    setIncludeMessages(event.target.value);
    props.handleMessagesChange(value);
  };

  useEffect(() => {
    
    if (props.messages === 0 || props.messages === 1 ) {
    
      if (props.messages == 0 || props.messages == "0") 
      {
          setIncludeMessages('Exclude');
          props.handleMessagesChange("0");
          
      }
      else if (props.messages === 1 || props.messages === "1"){
          setIncludeMessages('Include');
          props.handleMessagesChange("1");
          console.log("include =", props.messages)
      }
    }
  },[props.messages]);

  return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Current Messages</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={messages}
        onChange={handleMessagesChange}
        label="Current Messages"
      >
      <MenuItem value="none"> </MenuItem>
      {MessagesList.map( item => 
        <MenuItem value={item} key={item} >{item} </MenuItem>
      )};
      </Select>
    </FormControl>
  );
}

const Selectors = (props) => {

  return (
    <div></div>
  );
};

  export default Selectors;