import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import { DateConverter } from '../../../Helper/Helper';
import "../../../../scss/_main.scss";

const RawDataTable = (props) => {

  const columns = [
    {
      name: "aircraft",
      label: "Aircraft",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'tail', 
      label: 'Tail#',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'fightLeg', 
      label: 'Flight Leg',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'ATAMain', 
      label: 'ATA Main',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'ATASub', 
      label: 'ATA Sub',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'ATA', 
      label: 'ATA',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'ATADesc', 
      label: 'ATA Description',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'200px'}}),
      }
    },
    {
      name: 'LRU', 
      label: 'LRU',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'date', 
      label: 'Date and Time',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'200px'}}),
       
      }
     },
     {
      name: 'MDCMessages', 
      label: 'MDC Messages',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'200px'}}),
      }
     },
     {
      name: 'status', 
      label: 'Status',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'phase', 
      label: 'Phase',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'type', 
      label: 'Type',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'intermittent', 
      label: 'Intermittent',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'equationID', 
      label: 'Equation ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'150px'}}),
      }
     },
     {
      name: 'diagnostic', 
      label: 'Diagnostic',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'400px'}})
      }
     },
     {
      name: 'data', 
      label: 'Data Used to Determine Msg',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: {minWidth:'300px'}})
      }
     },
     {
      name: 'id', 
      label: 'ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'flightNumber', 
      label: 'Flight Number',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
     },
    ];

    let data = [];
    props.data?.map((item => {
      data.push(
          {
            aircraft: item["Aircraft"], 
            tail: item["Tail#"], 
            fightLeg: item["Flight Leg No"], 
            ATAMain: item["ATA Main"],  
            ATASub: item["ATA Sub"],  
            ATA: item["ATA"],  
            ATADesc: item["ATA Description"],  
            LRU: item["LRU"],   
            date: DateConverter(item["DateAndTime"]),   
            MDCMessages: item["MDC Message"],  
            status: item["Status"],  
            phase: item["Flight Phase"],  
            type: item["Type"],   
            intermittent: item["Intermittent"],   
            equationID: item["Equation ID"],  
            source: item["Source"], 
            diagnostic: item["Diagnostic Data"],  
            data: item["Data Used to Determine Msg"],  
            id:item["ID"],
            flightNumber: item["Flight"],
          }
        );
        return data;
      }));

    const options = {
      filter: true,
      filterType: 'multiselect',
      responsive: "standard",
      fixedHeader: true,
      fixedSelectColumn: true,
      downloadOptions: {
        filename: 'MDC Raw Data from ' + props.rawDataConditions.fromDate + ' to ' + props.rawDataConditions.toDate + '.csv',
        separator: ',',
      },
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      textLabels: {
        body: {
            noMatch: props.loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display"
        },
      },
      elevation: 4,
      rowsPerPage: 7,
      rowsPerPageOptions: [7,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '500px'
    };

  return (
    <div class="reports-root">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MUIDataTable
           title="MDC Raw Data"
            data={data}
            columns={columns}
            options={options}
          />
        </Grid> 
      </Grid> 
    </div>
  );
}
export default RawDataTable;

