import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import DatePicker from '../MdcMessages/GenerateReport/DatePicker';
import {ATAMainSelector,EqIDSelector} from '../MdcMessages/GenerateReport/Selectors';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationSubTable from './CorrelationSubTable';
import {DateConverter} from '../Helper/Helper';
import Constants from '../utils/const';
import {GenerateCorrelationValidation, NotFirstRender} from '../Helper/Helper';
import "../../scss/_main.scss";

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
        if ( PMConditions.EqID !== '' ) {
          path += '/' + PMConditions.EqID;
        }
        if ( PMConditions.ATAMain !== '' ) {
          path += '/' + PMConditions.ATAMain;
        }
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
    name: "p_id",
    label: "p_id",
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'operator', 
    label: 'Operator',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'model', 
    label: 'Model',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
    }
  },
  {
    name: 'type', 
    label: 'Type',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'serialNo', 
    label: 'Serial_No',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'date', 
    label: 'Date',
    options: {
      filter: false,
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
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'maintTrans', 
    label: 'MaintTrans',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'maintCanc', 
    label: 'Maintenance Cancellations',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'maintDel', 
    label: 'Maintenance Delays',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "120px"}})
    }
    },
    {
    name: 'inspection', 
    label: 'Inspection',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'campType', 
    label: 'Camp Type',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'MRB', 
    label: 'MRB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap',minWidth: "100px"}})
    }
    },
    {
    name: 'discrepancy', 
    label: 'Discrepancy',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'corActions', 
    label: 'Corrective Action',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'totalHours', 
    label: 'AC Total Hours',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'totalCycles', 
    label: 'AC Total Cycles',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'squawkSource', 
    label: 'Squawk Source',
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
    name: 'station', 
    label: 'Station',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'ATA_SUB', 
    label: 'ATA SUB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
    },
    {
    name: 'ATA_Main', 
    label: 'ATA Main',
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
        p_id: item["p_id"], 
        operator: item["Operator"], 
        model: item["Model"], 
        type: item["Type"],  
        serialNo: item["Serial_No"],  
        date: DateConverter(item["date"]),  
        failureFlag: item["Failure Flag"],  
        maintTrans: item["Maint Trans"],   
        maintCanc: item["Maintenance Cancellations"],   
        maintDel: item["Maintenance Delays"],  
        inspection: item["Inspection"],  
        campType: item["CampType"],   
        MRB: item["MRB"],   
        discrepancy: item["Discrepancy"],  
        corActions: item["Corrective Action"], 
        totalHours: item["AC Total Hours"],  
        totalCycles: item["AC Total Cycles"],  
        squawkSource:  item["Squawk Source"],
        ATA: item["ATA"],
        station: item["Station"],
        ATA_SUB: item["ATA_SUB"],
        ATA_Main: item["ATA_Main"],
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
  downloadOptions: {
    filename: 'PM Report from ' + dateFrom + ' to ' + dateTo + '.csv',
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
              title="PM Report"
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

