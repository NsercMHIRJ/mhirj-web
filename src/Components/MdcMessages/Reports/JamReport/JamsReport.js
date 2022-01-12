import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import {DateConverter} from '../../../Helper/Helper';
import '../../../../scss/_main.scss';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';

const JamsReport = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [ isDefault, setIsDefault ] = useState(true);

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
      name: "flight",
      label: "Flight Leg No",
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
      label: 'ATASub',
      options: {
       filter: false,
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
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'ATADescription', 
      label: 'ATA Description',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'LRU', 
      label: 'LRU',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'DateAndTime', 
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
      name: 'MDCMessage', 
      label: 'MDC Message',
      options: {
       filter: false,
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
      name: 'flightPhase', 
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
      name: 'diagnosticData', 
      label: 'Diagnostic Data',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'determineData', 
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
      name: 'ID', 
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
      name: 'flight', 
      label: 'Flight #',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
    ];

    const flightNumber = props.data ? props.data :  '';
    const [flightLegNumber,setFlightLegNumber] = useState(flightNumber);

    let data = [];
      props.data?.map((item => {
        
        data.push(
          {
            flightLegNumber: item["Flight"], 
            tail: item["Tail#"], 
            ATAMain: item["ATA Main"],
            ATASub: item["ATA Sub"],
            ATA: item["ATA"],
            ATADescription: item["ATA Description"], 
            LRU: item["LRU"],  
            DateAndTime: DateConverter(item["DateAndTime"]),  
            MDCMessage: item["MDC Message"],
            status: item["Status"],  
            flightPhase: item["Flight Phase"],  
            type: item["Type"],   
            intermittent: item["Intermittent"],   
            equationID: item["Equation ID"],  
            source: item["Source"],  
            diagnosticData: item["Diagnostic Data"],  
            determineData: item["Data Used to Determine Msg"],   
            ID: item["ID"],   
            flight: item["aircraftno"],  
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
      selectableRowsOnClick: false,
      expandableRows: true,
      onCellClick: (colData, cellMeta) => {
        setIsDefault(!isDefault);
        AddCellClass(cellMeta.rowIndex);
      },
      renderExpandableRow: (rowData, rowMeta) => {
        return (    
        <TableRow>
          <TableCell colSpan={rowData.length+1}>
            <CorrelationAnalysisTable
              dateFrom = {rowData[7]} 
              dateTo = {rowData[7]} 
              tail = {rowData[1]}
              EqID = {rowData[13]}
            />
            </TableCell>
        </TableRow>
        );
      },
      downloadOptions: {
        filename: props.title + ' from ' + props.reportConditions.fromDate + ' to ' + props.reportConditions.toDate + '.csv',
        separator: ',',
      },
      expandableRows: true,
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      textLabels: {
        body: {
          noMatch: props.loading ? ' Please wait, loading data ...' : "Sorry, there is no matching data to display",
          toolTip: "Sort",
          columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
      },
    },
      elevation: 4,
      rowsPerPage: rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : `${200+data.length*60}px`
    };

  return (
    <div className="reports-root">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MUIDataTable
            title= {props.title}
            data={data}
            columns={columns}
            options={options}
          />
        </Grid> 
      </Grid> 
    </div>
  );
}
export default JamsReport;

