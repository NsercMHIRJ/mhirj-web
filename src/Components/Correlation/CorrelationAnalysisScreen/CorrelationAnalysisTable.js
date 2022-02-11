import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {DateConverter} from '../../Helper/Helper';
import Constants from '../../utils/const';
import "../../../scss/_main.scss";
import moment from "moment";
import $ from 'jquery';
import Grid from '@material-ui/core/Grid';
import CorrelationCustomToolbar from "../CorrelationCustomToolbar";

const CorrelationAnalysisTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correlationReportStatus, setCorrelationReportStatus] = useState(true);
  const [correlationReportButtonLabel, setCorrelationReportButtonLabel] = useState("Load Bad Matches");
  const [PMConditions,setPMConditions] = useState(
    {         
      dateFrom: moment(props.dateFrom).format('YYYY-MM-DD'),
      dateTo: moment(props.dateTo).format('YYYY-MM-DD'),
      EqID: props.EqID,
      tail: props.tail
    },
  );
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [ isDefault, setIsDefault ] = useState(true);

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.analysis-correlation .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.analysis-correlation .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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

  useEffect(() => {
    if ( PMConditions.dateFrom !== undefined  && PMConditions.dateTo !== undefined && PMConditions.EqID !== '' && PMConditions.tail !== '') {

      let status = correlationReportStatus ? 3 : 1;
      let path = Constants.APIURL + 'corelation_tail/' + PMConditions.dateFrom + '/' + PMConditions.dateTo + '/' + PMConditions.EqID + '/' + PMConditions.tail + '/' + status;

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
  },[PMConditions, correlationReportStatus]);

  const columns = [
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
      name: 'ATA', 
      label: 'ATA',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
          setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
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
      label: 'Date and Time',
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
    //     setCellHeaderProps: () => ({ style: headingStyle }),
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
    //         maxWidth:'400px',
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
  if (data) {
    data.map((item => {
      responseData.push(
        {
          p_id: item["MaintTransID"], //ok
          ATA: item["ATA_Main"], //ok
          PM_ATA: item["PM_ATA"], //ok
          discrepancy: item["Discrepancy"], //ok
          action: item["CorrectiveAction"], //ok
          date: DateConverter(item["TransDate"]), //ok
          // failureFlag: item["Failure_Flag"],
          // squawkSource: item["SquawkSource"],
          // MRB: item["MRB"],
        }
      );
      return responseData
    }
  ));
}

const options = {
  filter: true,
  filterType: 'multiselect',
  selectableRowsHideCheckboxes: true,
  selectableRowsOnClick: false,
  responsive: "standard",
  fixedHeader: true,
  fixedSelectColumn: true,
  jumpToPage: true,
  resizableColumns: false,
  onCellClick: (colData, cellMeta) => {
    setIsDefault(!isDefault);
    AddCellClass(cellMeta.rowIndex);
  },
  customToolbar: () => {
    return (
      <CorrelationCustomToolbar 
        label = {correlationReportButtonLabel}
        handleCorrelationReportChange = {handleCorrelationReportChange}
      />
    );
  },
  downloadOptions: {
    filename: 'Correlation Report from ' + PMConditions.dateFrom + ' to ' + PMConditions.dateTo + ' from '+ PMConditions.tail +'.csv',
    separator: ',',
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 300,
  },
  textLabels: {
    body: {
        noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
        toolTip: "Sort",
        columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
    },
  },
  elevation: 1,
  rowsPerPage:  rowsPerPage,
  onChangeRowsPerPage: onChangeRowsPerPage,
  rowsPerPageOptions: [10,20,50],
  selectToolbarPlacement:"none",
  };

  return (
    <div class="reports-root analysis-correlation">
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
);}

export default CorrelationAnalysisTable;

