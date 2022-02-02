import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {DateConverter} from '../../Helper/Helper';
import Constants from '../../utils/const';
import "../../../scss/_main.scss";
import moment from "moment";
import $ from 'jquery';
import Grid from '@material-ui/core/Grid';

const CorrelationAnalysisTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    $('.reports-root.analysis-correlation .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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

      let path = Constants.APIURL + 'corelation_tail/' + PMConditions.dateFrom + '/' + PMConditions.dateTo + '/' + PMConditions.EqID + '/' + PMConditions.tail;
      //let path = Constants.APIURL + 'corelation_tail/' + '2021-05-01' + '/' + '2021-05-05' + '/' + "B1-005804" + '/' + "773SK"; 

      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        console.log(data);
        setData(data);
        setLoading(false);
      }).catch(function (err){
        console.log(err);
        setLoading(false);
      })
    } else {
      setLoading(false);
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
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    // {
    //   name: 'ATA', 
    //   label: 'ATA',
    //   options: {
    //     filter: true,
    //     filterType: 'dropdown',
    //     sort: true,
    //     setCellProps: () => ({style: columnStyle}),
          //setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    // },
    {
      name: 'discrepancy', 
      label: 'Discrepancy',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
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
    {
      name: 'failureFlag', 
      label: 'Failure Flag',
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
      name: 'squawkSource', 
      label: 'Squawk Source',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'MRB', 
      label: 'MRB',
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
  ];

  let responseData = [];
  if (data) {
    data.map((item => {
      responseData.push(
        {
          p_id: item["MaintTransID"],
          //ATA: item["ATA"],
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
            title="Correlation Report"
            data={responseData}
            columns={columns}
            options={options}
          />
        </Grid> 
      </Grid> 
    </div>
);}

export default CorrelationAnalysisTable;

