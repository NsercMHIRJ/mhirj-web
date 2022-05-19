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
import $ from 'jquery';
import CorrelationCustomToolbar from "../CorrelationCustomToolbar";
import ExpandIcon from '@mui/icons-material/SettingsOverscan';

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
  const [correlationReportStatus, setCorrelationReportStatus] = useState(true);
  const [correlationReportButtonLabel, setCorrelationReportButtonLabel] = useState("Load Bad Matches");
  const [PMConditions,setPMConditions] = useState(
    {         
      dateFrom: todayDate,
      dateTo: todayDate,
      EqID: '',
      ATAMain: '',
    },
  );
  const [ isDefault, setIsDefault ] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCorrelationModal, setOpenCorrelationModal] = useState(false);

  const toggleKeyword = (event) => {
    setOpenCorrelationModal(!openCorrelationModal);
  }

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.correlation-pm-table .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.correlation-pm-table .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const handleCorrelationReportChange = (event) => {
    if (correlationReportButtonLabel === "Load Bad Matches") {
      setCorrelationReportButtonLabel("Load Good Matches");
    } else {
      setCorrelationReportButtonLabel("Load Bad Matches");
    }
    setCorrelationReportStatus(!correlationReportStatus);
    setLoading(true);
  }

  const onChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
  };

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
    setCorrelationReportButtonLabel("Load Bad Matches");
    setCorrelationReportStatus(true);
  }

  const notFirstRender = NotFirstRender();

  useEffect(() => {
    if (notFirstRender) {
      let validationResponse = GenerateCorrelationValidation(PMConditions);
      setValidationResponse(validationResponse);
    }
    if ( PMValue !== 0) {
      if ( PMConditions.dateFrom !== undefined  && PMConditions.dateTo !== undefined) {
        let status = correlationReportStatus ? 3 : 1;
        let path = Constants.APIURL + 'corelation_ata/' + PMConditions.dateFrom + '/' + PMConditions.dateTo  + '/' + status;
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
  },[PMConditions, correlationReportStatus]);


  const headingStyle = {
    maxWidth:'200px',
    minWidth:'50px',
    padding:'5px',
    textAlign:"center",
    margin: '0px',
    whiteSpace: 'normal',
  }

  const columnStyle = {
    maxWidth:'150px',
    padding:'13px',
    textAlign:"left",
    margin: '0px',
  }

const columns = [
  {
    name: 'action', 
    label: <ExpandIcon className="reports-expand-icon header"/>,
    options: {
     filter: false,
     sort: false,
     empty: true,
    customBodyRenderLite: (dataIndex, rowIndex) => {
      return (
        <ExpandIcon 
          className="reports-expand-icon"
          label="Expand Row"
        />
      );
    },
    setCellProps: () => ({
      style: {
        maxWidth:'60px',
        padding: '5px 13px 0 0',
        textAlign:"left",
        margin: '0px',
        color: 'grey'
      }}
    ),
    setCellHeaderProps: () => ({
      style: {
        maxWidth:'60px',
        padding:'5px',
        textAlign:"center",
        margin: '0px',
        whiteSpace: 'normal',
      }}),
    }
  },
  {
    name: 'p_id', 
    label: 'ID',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  {
    name: 'ATAMain', 
    label: 'ATA Main',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  // {
  //   name: 'ATASub', 
  //   label: 'ATA Sub',
  //   options: {
  //     filter: true,
  //     filterType: 'dropdown',
  //     sort: true,
  //     setCellProps: () => ({style: columnStyle}),
  //     setCellHeaderProps: () => ({ style: headingStyle }),
  //   }
  // },
  {
    name: 'PM_ATA', 
    label: 'PM ATA',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  {
    name: 'discrepancy', 
    label: 'Discrepancy',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({
        style: {
          maxWidth:'400px',
          padding:'13px',
          textAlign:"left",
          margin: '0px',
        }}
      ),
        setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  {
    name: 'action', 
    label: 'Corrective Action',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({
        style: {
          maxWidth:'300px',
          padding:'13px',
          textAlign:"left",
          margin: '0px',
        }}
      ),
        setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  {
    name: 'date', 
    label: 'Reported Date',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  // {
  //   name: 'failureFlag', 
  //   label: 'Failure Flag',
  //   options: {
  //     filter: true,
  //     filterType: 'dropdown',
  //     sort: true,
  //     setCellProps: () => ({
  //       style: {
  //         maxWidth:'300px',
  //         padding:'13px',
  //         textAlign:"left",
  //         margin: '0px',
  //       }}
  //     ),
  //       setCellHeaderProps: () => ({ style: headingStyle }),
  //   }
  // },
  // {
  //   name: 'squawkSource', 
  //   label: 'Squawk Source',
  //   options: {
  //     filter: true,
  //     filterType: 'dropdown',
  //     sort: true,
  //     setCellProps: () => ({style: columnStyle}),
  //     setCellHeaderProps: () => ({ style: headingStyle }),
  //   }
  // },
  // {
  //   name: 'MRB', 
  //   label: 'MRB',
  //   options: {
  //     filter: true,
  //     filterType: 'dropdown',
  //     sort: true,
  //     setCellProps: () => ({
  //       style: {
  //         maxWidth:'300px',
  //         padding:'13px',
  //         textAlign:"left",
  //         margin: '0px',
  //       }}
  //     ),
  //     setCellHeaderProps: () => ({ style: headingStyle }),
  //   }
  // },
];

  let responseData = [];
  data.map((item => {
    responseData.push(
      {
        p_id: item["MaintTransID"], //ok
        ATAMain: item["ATA_Main"], //ok
        //ATASub: item["ATA_Sub"], 
        PM_ATA: item["PM_ATA"], //ok
        discrepancy: item["Discrepancy"], //ok
        action: item["CorrectiveAction"], //ok
        date: item["TransDate"], //ok
        // failureFlag: item["Failure_Flag"],
        // squawkSource: item["SquawkSource"],
        // MRB: item["MRB"],
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
  fixedSelectColumn: true,
  jumpToPage: true,
  resizableColumns: false,
  selectableRows:'multiple',
selectableRowsHideCheckboxes: true,
  selectableRowsOnClick: false,
  expandableRows: true,
  sortOrder: {
    name: 'date',
    direction: 'desc'
  },
  onCellClick: (colData, cellMeta) => {
    setIsDefault(!isDefault);
    AddCellClass(cellMeta.rowIndex);
  },
  // customToolbar: () => {
  //   return (
  //     <CorrelationCustomToolbar 
  //       label = {correlationReportButtonLabel}
  //       handleCorrelationReportChange = {handleCorrelationReportChange}
  //       analysis={false}
  //       toggleKeyword = {toggleKeyword}
  //       openCorrelationModal={openCorrelationModal}
  //     />
  //   );
  // },
  renderExpandableRow: (rowData, rowMeta) => {
    return ( 
    <TableRow>
        <TableCell colSpan={rowData.length+1}>
        <CorrelationSubTable
          p_id = {rowData[1]}
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
        noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
        toolTip: "Sort",
        columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
      },
},
  downloadOptions: {
    filename: 'Correlation Report from ' + dateFrom + ' to ' + dateTo + '.csv',
    separator: ',',
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 300,
  },
  elevation: 4,
  rowsPerPage: rowsPerPage,
  onChangeRowsPerPage: onChangeRowsPerPage,
  rowsPerPageOptions: [10,20,50],
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
                      Generate Correlation
                  </Button>  
                </Grid>     
              </Grid>      
            </div>
        </Paper>
      </form>
    {data !== "" && data !== "undefined" && PMValue === 1 && validationResponse.status === true &&
      <>
      <div className="reports-root correlation-pm-table">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <MUIDataTable
              title= {correlationReportStatus ? "Correlation Report: Good Matches" : "Correlation Report: Bad Matches"}
              data={ loading ? [] : responseData }
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

