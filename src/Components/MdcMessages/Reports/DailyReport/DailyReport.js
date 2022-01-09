import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import {DateConverter} from '../../../Helper/Helper';
import "../../../../scss/_main.scss";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';

const DailyReport = (props) => {
  const [rowsSelectedState, setRowsSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [ isDefault, setIsDefault ] = useState(true);
  
  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const HandleSingleRowSelect = (rowsSelectedData, allRows, rowsSelected) => {
    if (rowsSelected.length !== 0 && data[rowsSelected].isJam === true) {
      setRowsSelected(rowsSelected);
      props.HandleSingleRowSelect(data[rowsSelected].ACSN);
    }
    else {
      setRowsSelected(rowsSelected);
    }
  };

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
      name: 'tail', 
      label: 'Tail#',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
       filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'ACSN', 
      label: 'ACSN',
      options: {
       filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'EICASRelated', 
      label: 'EICAS Related',
      options: {
       filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    {
      name: 'mdcMessages', 
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
      name: 'B1Equation', 
      label: 'B1 Equation',
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
      name: 'equationDescription', 
      label: 'Equation Description',
      options: {
       filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'totalOccurences', 
      label: 'Occ',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        secondaryLabel: 'Total Occurences',
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'ConsecutiveFlights', 
      label: 'Cons. Legs', 
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        secondaryLabel: 'Consecutive Flight Legs',
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
      name: 'reasons', 
      label: 'Reasons For Flag',
      options: {
       filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'priority', 
      label: 'Priority',
      options: {
       filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'topMessage', 
      label: 'MHIRJ Known Message',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'honey', 
      label: 'Mel or No-Dispatch',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'input', 
      label: 'MHIRJ Input',
      options: {
        filter: false,
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
      name: 'recommendation', 
      label: 'MHIRJ Recommended Action',
      options: {
        filter: false,
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
      label: 'MHIRJ Additional Comment',
      options: {
        filter: false,
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
    ];

    let data = [];
      props.data?.map((item => {
        let input = item["MHIRJ ISE Input"] === '0' ? '' : item["MHIRJ ISE Input"];
        let recommendation = item["MHIRJ ISE Recommendation"] === '0' ? '' : item["MHIRJ ISE Recommendation"];
        let comments = item["Additional Comments"] === '0' ? '' : item["Additional Comments"];
        let topMessage = item["Known Top Message - Recommended Documents"] === '0' ? '' : item["Known Top Message - Recommended Documents"];

        data.push(
          {
            date: DateConverter(item["Date"]), 
            ACSN: item["AC SN"], 
            tail: item["Tail#"],
            EICASRelated: item["EICAS Message"], 
            mdcMessages: item["MDC Message"],  
            LRU: item["LRU"],  
            ATA: item["ATA"],  
            B1Equation: item["B1-Equation"],  
            type: item["Type"],   
            equationDescription: item["Equation Description"],   
            totalOccurences: item["Total Occurences"],  
            ConsecutiveFlights: item["Consecutive FL"],  
            intermittent: item["Intermittent"],  
            reasons: item["Reason(s) for flag"],   
            priority: item["Priority"],   
            topMessage: topMessage,  
            recommendation: recommendation, 
            comments: comments, 
            input: input,  
            honey: "",
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
                dateFrom = {rowData[1]} 
                dateTo = {rowData[1]}
                tail = {rowData[0]}
                EqID = {rowData[7]}
              />
              </TableCell>
          </TableRow>
        );
      },
      rowsSelected: rowsSelectedState,
      onRowSelectionChange: HandleSingleRowSelect,
      downloadOptions: {
        filename: 'Daily Report from ' + props.reportConditions.fromDate + ' to ' + props.reportConditions.toDate + '.csv',
        separator: ',',
      },
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
      rowsPerPage:  rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
    };
  
  return (
    <div className="reports-root">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MUIDataTable
            title={props.title}
            data={data}
            columns={columns}
            options={options}
          />
        </Grid> 
      </Grid> 
    </div>
  );
}
export default DailyReport;

