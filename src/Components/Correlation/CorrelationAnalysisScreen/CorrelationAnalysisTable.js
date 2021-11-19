import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {DateConverter} from '../../Helper/Helper';
import Constants from '../../utils/const';
import "../../../scss/_main.scss";
import moment from "moment";

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

  useEffect(() => {
    if ( PMConditions.dateFrom !== undefined  && PMConditions.dateTo !== undefined && PMConditions.EqID !== '' && PMConditions.tail !== '') {
      let path = Constants.APIURL + 'corelation/' + PMConditions.dateFrom + '/' + PMConditions.dateTo + '/' + PMConditions.EqID + '/' + PMConditions.tail;
      
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
  },[PMConditions]);

  const columns = [
    {
      name: 'p_id', 
      label: 'ID',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: {minWidth:'150px'}})
      }
    },
    {
      name: 'ATA', 
      label: 'ATA',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: {minWidth:'150px'}})
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
        setCellProps: () => ({style: {minWidth:'150px'}})
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
        setCellProps: () => ({style: {minWidth:'300px'}})
      }
    },
  ];

  let responseData = [];
  if (data) {
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
}

const options = {
  filter: true,
  filterType: 'multiselect',
  responsive: "standard",
  fixedHeader: true,
  fixedSelectColumn: true,
  jumpToPage: true,
  resizableColumns: false,
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
        noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display"
    },
  },
  elevation: 0,
  rowsPerPage: 10,
  rowsPerPageOptions: [10,20,50],
  selectToolbarPlacement:"none",
  };

  return (
    <div class="reports-root analysis-correlation">
      <MUIDataTable
        title="Correlation Report"
        data={responseData}
        columns={columns}
        options={options}
      />
</div>
);}

export default CorrelationAnalysisTable;

