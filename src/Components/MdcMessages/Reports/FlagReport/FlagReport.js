import React,{useState} from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
//Date Imports
import {DateConverter} from '../../../Helper/Helper';
import '../../../../scss/_main.scss';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';

const FlagReport = (props) => {
  const [ isDefault, setIsDefault ] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState('10');

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.flag-report .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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
      name: "MSN",
      label: "MSN",
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: "tail",
      label: "Tail#",
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
      name: 'code', 
      label: 'B1-code',
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
      name: 'message', 
      label: 'Message',
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
       filter: false,
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'FDE', 
      label: 'Potential FDE',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'dateFrom', 
      label: 'Date From',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'dateTo', 
      label: 'Date To',
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
      label: 'SKW action WIP',
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
      name: 'mel', 
      label: 'MEL or No-Dispatch',
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
      name: 'input', 
      label: 'MHIRJ Input',
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
      name: 'recommendation', 
      label: 'MHIRJ Recommendation',
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
      name: 'comments', 
      label: 'Additional Comments',
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

    let data = [];
      props.data?.map((item => {
        let input = item["MHIRJ Input"] === '0' ? '' : item["MHIRJ Input"];
        let recommendation = item["MHIRJ Recommendation"] === '0' ? '' : item["MHIRJ Recommendation"];
        let action = item["SKW action WIP"] === '0' ? '' : item["SKW action WIP"];
        
        data.push(
          {
            MSN: item["MSN"], 
            tail: item["AC_TN"],
            ATA: item["ATA"], 
            code: item["B1-code"], 
            LRU: item["LRU"],  
            message: item["Message"],  
            type: item["Type"],  
            FDE: item["Potential FDE"],  
            dateFrom: DateConverter(item["Date From"]),   
            dateTo: DateConverter(item["Date To"]),   
            action: action,  
            mel: item["MEL or No-Dispatch"],
            input: input,  
            recommendation: recommendation,  
            comments: item["Additional Comments"]
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
          <TableRow className="correlation-analysis-subtable">
            <TableCell colSpan={rowData.length+1}>
              <CorrelationAnalysisTable
                dateFrom = {rowData[8]} 
                dateTo = {rowData[9]} 
                tail = {rowData[1]}  
                EqID = {rowData[3]} 
              />
              </TableCell>
          </TableRow>
        );
      },
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
            noMatch: props.loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
            toolTip: "Sort",
            columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
        },
    },
      elevation: 4,
      rowsPerPage: rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '160px' : `${200+data.length*60}px`
    };

  
  return (
    <div className="reports-root flag-report">
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

