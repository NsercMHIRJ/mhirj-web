import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//Multiple select filters
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Constants from './utils/const';

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
    width:'15.5%',
    minWidth: 50,
  }
}));


export const ATAMainSelector = (props) => {
    const classes = useStyles();
    const [ATAMain, setATAMain] = useState([]);
    const [ATAMainList, setATAMainList] = useState([]);
    useEffect(() => {
        const path = Constants.APIURL+ '/GenerateReport/ata_main/ALL'

        try {
            axios.post(path).then(function(res) {
                var data = JSON.parse(res.data);
                let ATAArray = ['ALL'];
                Object.values(data).map((item => {
                    ATAArray.push(item.ATA_Main.toString());
                }))
                setATAMainList(ATAArray);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleATAChange = (event, values) => {
        const ATAValues = [];
        if (values.includes("ALL")) {
            ATAValues.push("ALL");
            setATAMain(ATAValues);
            props.handleATAChange("ALL");
        } else {
            setATAMain(values);
            let ataList = Object.values(values).length > 0 ? "('" + values.join("','") + "')" : "";
            props.handleATAChange(ataList);
        }
    };

    return ( <
        Autocomplete className = { classes.autocomplete }
        multiple options = { ATAMainList }
        getOptionLabel = {
            (item => item) }
        value = { ATAMain }
        filterSelectedOptions onChange = { handleATAChange }
        renderInput = {
            (params) => ( <
                TextField {...params }
                variant = "outlined"
                label = "ATA Main"
                placeholder = "ATA Main" /
                >
            )
        }
        />
    );
}

export const EqIDSelector = (props) => {
  const classes = useStyles();
  const [EqID, setEqID] = React.useState([]);
  const [EqList,setEqIDList] = useState([]);
  useEffect(() => {
    const path = Constants.APIURL+ '/GenerateReport/equation_id/ALL'

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
    var copy = [];
    //Analysis inputs, as soon as one ATA under “ATA Main” is selected the “ALL” should de-select. 
    if(Object.values(values)[0] === "NONE" && EqID.length !== 0){
      copy.push(Object.values(values)[1]);
      setEqID(copy);
      }
    else{
      setEqID(values);
    }
   
    if(values.includes("NONE")){
      props.handleEqIDChange("NONE");
    }
    else{
      let eqIDLIST =  "('"+ values.join("','") +"')";
      props.handleEqIDChange(eqIDLIST);
    }
  };

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
            label="Equation ID"
            placeholder="EqID"
            />
        )}
      />
  );
};


const ATAGraphSelectors = (props) => {

  return (
    <div></div>
  );
};

  export default ATAGraphSelectors;
