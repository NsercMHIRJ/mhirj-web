import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import { DateConverter } from '../../../Helper/Helper';
import "../../../../scss/_main.scss";
import $ from 'jquery';

const RawDataTable = (props) => {
  const [ isDefault, setIsDefault ] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState('10');

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.raw-data .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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

  const columns = [
    {
      name: "aircraftModel",
      label: "Aircraft Model",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: "aircraft",
      label: "Aircraft",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'tail', 
      label: 'Tail#',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'operator', 
      label: 'Operator',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'type', 
      label: 'Type',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'software', 
      label: 'Software',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'version', 
      label: 'Version',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'date', 
      label: 'Date',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'flightNumber', 
      label: 'Flight Number',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'fightLeg', 
      label: 'Flight Leg',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'phase', 
      label: 'Flight Phase',
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
      name: 'ATAName', 
      label: 'ATA Name',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'LRU', 
      label: 'LRU',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'compId', 
      label: 'COMP ID',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'msgText', 
      label: 'Message Text',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'equationID', 
      label: 'Equation ID',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'intermittent', 
      label: 'Intermittent',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'eventNote', 
      label: 'Event Note',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'eqTsNote', 
      label: 'Equation TS Note',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'source', 
      label: 'Source',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
    {
      name: 'msgId', 
      label: 'Message ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'falseMsg', 
      label: 'False Message',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'status', 
      label: 'Status',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
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
      jumpToPage: true,
      resizableColumns: false,
      selectableRowsHideCheckboxes: true,
      selectableRowsOnClick: false,
      expandableRows: false,
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
            noMatch: props.loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
            toolTip: "Sort",
        columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
          },
      },
      onCellClick: (colData, cellMeta) => {
        setIsDefault(!isDefault);
        AddCellClass(cellMeta.rowIndex);
      },
      elevation: 4,
      rowsPerPage: rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '500px'
    };

  return (
    <div class="reports-root raw-data">
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

