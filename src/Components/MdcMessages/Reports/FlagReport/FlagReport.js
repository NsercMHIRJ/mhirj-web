import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//Date Imports
import {DateConverter} from '../../../Helper/Helper';
import '../../../../scss/_main.scss';

const FlagReport = (props) => {

  const columns = [
    {
      name: "MSN",
      label: "MSN",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {paddingLeft:'20px'}}),
       setCellHeaderProps: () => ({style: {paddingLeft:'30px'}})
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
      name: 'code', 
      label: 'B1-Equation',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
      }
    },
    {
      name: 'LRU', 
      label: 'LRU',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'message', 
      label: 'Message',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {maxWidth: "200px"}})
      }
    },
    {
      name: 'type', 
      label: 'Type',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'FDE', 
      label: 'Potential FDE',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {maxWidth: "200px"}})
      }
    },
    {
      name: 'dateFrom', 
      label: 'Date From',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'150px'}}),
      }
    },
    {
      name: 'dateTo', 
      label: 'Date To',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'150px'}}),
      }
     },
     {
      name: 'action', 
      label: 'SKW action WIP',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {maxWidth: "200px"}})
      }
     },
     {
      name: 'input', 
      label: 'Input',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth: "300px"}})
      }
     },
     {
      name: 'iseRecAct', 
      label: 'Rec Act',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth: "300px"}})
      }
     },
    ];

    let data = [];
      props.data?.map((item => {
        data.push(
          {
            MSN: item["AC SN"], 
            ATA: item["ATA"], 
            code: item["B1-Equation"], 
            LRU: item["LRU"],  
            message: item["Message"],  
            type: item["Type"],  
            FDE: item["Potential FDE"],  
            dateFrom: DateConverter(item["Date From"]),   
            dateTo: DateConverter(item["Date To"]),   
            action: item["SKW WIP"],  
            input: item["ISE Input"],  
            iseRecAct: item["ISE Rec Act"],  
          }
        );
        return data;
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
      selectableRowsHideCheckboxes: true,
      downloadOptions: {
        filename: 'Flag Report from ' + props.flagReportConditions.fromDate + ' to ' + props.flagReportConditions.toDate + '.csv',
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
      rowsPerPage: 10,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '160px' : `${200+data.length*60}px`
    };

  
  return (
    <div className="reports-root">
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <MUIDataTable
          title={"Flag Report"} 
          data={data}
          columns={columns}
          options={options}
        />
      </Grid> 
    </Grid> 
  </div>
  );
}
export default FlagReport;

