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
    $('.reports-root .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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
    {
      name: 'ATASub', 
      label: 'ATA Sub',
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
       filter: false,
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'ATADesc', 
      label: 'ATA Description',
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
      name: 'MDCMessages', 
      label: 'MDC Messages',
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
     {
      name: 'phase', 
      label: 'Phase',
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
      name: 'intermittent', 
      label: 'Int.', 
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        secondaryLabel: 'Intermittency',
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'equationID', 
      label: 'Equation ID',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'diagnostic', 
      label: 'Diagnostic',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'data', 
      label: 'Data Used to Determine Msg',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
          setCellProps: () => ({style: columnStyle}),
          setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'id', 
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
      jumpToPage: true,
      resizableColumns: false,
      selectableRowsHideCheckboxes: true,
      selectableRowsOnClick: false,
      downloadOptions: {
        filename: 'MDC Raw Data from ' + props.rawDataConditions.fromDate + ' to ' + props.rawDataConditions.toDate + '.csv',
        separator: ',',
      },
      onCellClick: (colData, cellMeta) => {
        setIsDefault(!isDefault);
        AddCellClass(cellMeta.rowIndex);
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
      elevation: 4,
      rowsPerPage:  rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [10,20,50],
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

