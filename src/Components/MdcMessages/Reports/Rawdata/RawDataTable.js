import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import { DateConverter } from '../../../Helper/Helper';
import "../../../../scss/_main.scss";

const RawDataTable = (props) => {

  const columns = [
    {
      name: "aircraftModel",
      label: "Aircraft Model",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
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
      name: 'operator', 
      label: 'Operator',
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
      name: 'software', 
      label: 'Software',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'version', 
      label: 'Version',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'date', 
      label: 'Date',
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
      name: 'phase', 
      label: 'Flight Phase',
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
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'ATAName', 
      label: 'ATA Name',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
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
      name: 'compId', 
      label: 'COMP ID',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'msgText', 
      label: 'Message Text',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
    },
    {
      name: 'equationID', 
      label: 'Equation ID',
      options: {
       filter: false,
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
      name: 'eventNote', 
      label: 'Event Note',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'eqTsNote', 
      label: 'Equation TS Note',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'source', 
      label: 'Source',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'msgId', 
      label: 'Message ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
      }
     },
     {
      name: 'falseMsg', 
      label: 'False Message',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'120px'}}),
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
    ];

    let data = [];
    props.data?.map((item => {
      data.push(
          {
            aircraftModel: item["AC_MODEL"],
            BOOKMARK: item["BOOKMARK"],
            aircraft: item["AC_SN"],
            tail: item["AC_TN"],
            operator: item["OPERATOR"],
            type: item["MSG_TYPE"],
            software: item["MDC_SOFTWARE"],
            version: item["MDT_VERSION"],
            date: DateConverter(item["MSG_Date"]),
            flightNumber: item["FLIGHT_NUM"],
            fightLeg: item["FLIGHT_LEG"],
            phase: item["FLIGHT_PHASE"],
            ATA: item["ATA"], 
            ATAName: item["ATA_NAME"],
            LRU: item["LRU"], 
            compId: item["COMP_ID"],
            msgText: item["MSG_TXT"],
            equationID: item["EQ_ID"],
            intermittent: item["INTERMITNT"],
            eventNote: item["EVENT_NOTE"],
            eqTsNote: item["EQ_TS_NOTE"],
            source: item["SOURCE"],
            msgId: item["MSG_ID"],
            falseMsg: item["FALSE_MSG"],
            status: item["msg_status"],    
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

