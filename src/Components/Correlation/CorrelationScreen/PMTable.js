import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DatePicker from '../../MdcMessages/GenerateReport/DatePicker';
import {ATAMainSelector,EqIDSelector} from '../../MdcMessages/GenerateReport/Selectors';
import CorrelationSubTable from './CorrelationSubTable';
import {DateConverter,GenerateCorrelationValidation, NotFirstRender} from '../../Helper/Helper';
import Constants from '../../utils/const';
import "../../../scss/_main.scss";

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    height: '56px',
    backgroundColor: '#C5D3E0',
    margin: '10px auto',
    display: 'block',
  },
}));

const PMTable = (props) => {
  const classes = useStyles();

  var todayDate = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(todayDate);
  const [dateTo, setDateTo] = useState(todayDate);
  const [ATAMain, setATAMain] = useState("");
  const [EqID, setEqID] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [PMValue,setPMValue] = useState(0);
  const [validationResponse, setValidationResponse] = useState('');
  const [PMConditions,setPMConditions] = useState(
    {         
      dateFrom: todayDate,
      dateTo: todayDate,
      EqID: '',
      ATAMain: '',
    },
  );

  const handleDateFrom = (date) => {
    setDateFrom(date);
  };

  const handleDateTo = (date) => {
    setDateTo(date);
  };

  const handleATAChange = (ATA) => {
    setATAMain(ATA);
  };

  const handleEqIDChange = (eqIDList) => {
    setEqID(eqIDList);
  };

  const handleGeneratePMTable = ()=> {
    setPMConditions(
    {         
      dateFrom: dateFrom,
      dateTo: dateTo,
      EqID: EqID,
      ATAMain: ATAMain,
    });
    setData([]);
    setPMValue(1);
    setLoading(true);
  }

  const notFirstRender = NotFirstRender();

  useEffect(() => {
    if (notFirstRender) {
      let validationResponse = GenerateCorrelationValidation(PMConditions);
      setValidationResponse(validationResponse);
    }
    if ( PMValue !== 0) {
      if ( PMConditions.dateFrom !== undefined  && PMConditions.dateTo !== undefined) {
        let path = Constants.APIURL + 'corelation/' + PMConditions.dateFrom + '/' + PMConditions.dateTo;
        if ( PMConditions.EqID !== '' && PMConditions.ATAMain !== '') {
          path += '?equation_id=' + PMConditions.EqID + '&ata=' + PMConditions.ATAMain;
        }else {
          if ( PMConditions.EqID !== '' ) {
            path += '?equation_id=' + PMConditions.EqID;
          }
          if ( PMConditions.ATAMain !== '' ) {
            path += '?ata=' + PMConditions.ATAMain;
          }
        }
        console.log(path);
        axios.post(path).then(function (res) {
          var data = JSON.parse(res.data);
          setData(data);
          setLoading(false);
        }).catch(function (err){
          console.log(err);
          setLoading(false);
        })
      } else {
        setLoading(false);
      }
    }
  },[PMConditions]);

const columns = [
  {
    name: 'p_id', 
    label: 'ID',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'ATA', 
    label: 'ATA',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'discrepancy', 
    label: 'Discrepancy',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'400px'}})
    }
  },
  {
    name: 'action', 
    label: 'Corrective Action',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'400px'}})
    }
  },
  {
    name: 'date', 
    label: 'Date and Time',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'failureFlag', 
    label: 'Failure Flag',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'300px'}})
    }
  },
  {
    name: 'squawkSource', 
    label: 'Squawk Source',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'200px'}})
    }
  },
  {
    name: 'MRB', 
    label: 'MRB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
];

  let responseData = [];
  data.map((item => {
    responseData.push(
      {
        p_id: item["MaintTransID"],
        ATA: item["ATA"],
        discrepancy: item["Discrepancy"],
        action: item["CorrectiveAction"],
        date: DateConverter(item["DateAndTime"]),
        failureFlag: item["Failure_Flag"],
        squawkSource: item["SquawkSource"],
        MRB: item["MRB"],
      }
    );
     return responseData
   }
  ));

const options = {
  filter: true,
  filterType: 'multiselect',
  responsive: "standard",
  fixedHeader: true,
  expandableRows: true,
  renderExpandableRow: (rowData, rowMeta) => {
    return ( 
    <TableRow>
        <TableCell colSpan={rowData.length+1}>
        <CorrelationSubTable
          p_id = {rowData[0]}
          dateFrom = {dateFrom}
          dateTo = {dateTo}
          EqID = {EqID}
          ATAMain = {ATAMain}
        />
        </TableCell>
    </TableRow>
    );
  },
  textLabels: {
    body: {
        noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display"
    },
},
  fixedSelectColumn: true,
  selectableRowsHideCheckboxes: true,
  selectableRowsOnClick: false,
  downloadOptions: {
    filename: 'Correlation Report from ' + dateFrom + ' to ' + dateTo + '.csv',
    separator: ',',
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 300,
  },
  elevation: 4,
  rowsPerPage: 20,
  rowsPerPageOptions: [20, 50],
  selectToolbarPlacement:"none",
};

  return (
    <div>
      <div class="analysis-root">
        <form class="analysis-form">
          <Paper className={classes.paper}>
            <div class="analysis-card">
              <h2>CORRELATION</h2>
            </div>
            <div>
              <Grid className={classes.Grid} container spacing={3}> 
                <Grid item xs={3}>  
                  <ATAMainSelector 
                    handleATAChange = {handleATAChange}
                  />              
                </Grid>     
                <Grid item xs={3}>     
                  <EqIDSelector 
                    handleEqIDChange = {handleEqIDChange}
                  />                   
                </Grid>    
                <Grid item xs={2}>    
                  <DatePicker 
                    label = "From"
                    handleDateFrom = {handleDateFrom}
                  />   
                  <p class="validation-message">{validationResponse.fromDateMessage}</p>  
                </Grid>
                <Grid item xs={2}>         
                  <DatePicker 
                    label = "To"
                    handleDateTo = {handleDateTo}
                  />   
                  <p class="validation-message">{validationResponse.toDateMessage}</p>
                </Grid>
                <Grid item xs={2}>  
                  <Button 
                    variant="contained" 
                    onClick = {async()=>handleGeneratePMTable()}
                    className={classes.button}>
                      Generate Correlation Table
                  </Button>  
                </Grid>     
              </Grid>      
            </div>
        </Paper>
      </form>
    {data !== "" && data !== "undefined" && PMValue === 1 && validationResponse.status === true &&
      <>
      <div className="reports-root">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <MUIDataTable
              title="Correlation Report "
              data={responseData}
              columns={columns}
              options={options}
            />
          </Grid> 
        </Grid> 
      </div>
      </>
    }
    </div>
  </div>
);}

export default PMTable;

