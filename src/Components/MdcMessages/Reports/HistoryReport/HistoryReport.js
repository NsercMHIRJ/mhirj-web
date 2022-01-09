import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import "../../../../scss/_main.scss";
import { DateConverter } from '../../../Helper/Helper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';

const HistoryReport = (props) => {
  const [flagList, setFlagList] = useState();
  const [rowsSelectedState, setRowsSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [ isDefault, setIsDefault ] = useState(true);

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const HandleMultipleRowSelect = (rowsSelectedData, allRows, rowsSelected) => {
    setRowsSelected(rowsSelected);
    let FlagArray = [];
    let ACSNArray = [];
    Object(rowsSelected).map((item => {
      ACSNArray.push(data[item].ACSN);
      FlagArray.push("('"+ data[item].ACSN +"','"+ data[item].B1Equation +"')");
      return FlagArray;
    }));
    let flagList =  FlagArray.join(", ");
    props.setJamACSNHistoryValue(ACSNArray[ACSNArray.length-1]);
    setFlagList(flagList);
    props.HandleMultipleRowSelectReport(flagList);
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
      name: 'EICASMessages', 
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
      name: 'consecutiveDays', 
      label: 'Cons. Days',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        secondaryLabel: 'Consecutive Days',
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
     {
      name: 'isJam', 
      label: 'Jam',
      options: {
       filter: true,
       filterType: 'dropdown',
       customFilterListOptions: {
        render: item => item == false ? "False Jams" : "True Jams"
      },
       sort: false,
       display: false,
      }
     },
    ];

    let data = [];
      props.data?.map((item => {
        let input = item["MHIRJ Input"] === '0' ? '' : item["MHIRJ Input"];
        let recommendation = item["MHIRJ Recommendation"] === '0' ? '' : item["MHIRJ Recommendation"];
        let comments = item["Additional Comments"] === '0' ? '' : item["Additional Comments"];
        let topMessage = item["Known Top Message - Recommended Documents"] === '0' ? '' : item["Known Top Message - Recommended Documents"];

        data.push(
          {
            ACSN: item["AC SN"], 
            tail: item["Tail#"],
            EICASMessages: item["EICAS Message"], 
            mdcMessages: item["MDC Message"],  
            LRU: item["LRU"],  
            ATA: item["ATA"],  
            B1Equation: item["B1-Equation"],  
            type: item["Type"],   
            equationDescription: item["Equation Description"],   
            totalOccurences: item["Total Occurrences"],  
            consecutiveDays: item["Consecutive Days"],
            ConsecutiveFlights: item["Consecutive FL"],  
            intermittent: item["Intermittent"],  
            reasons: item["Reason(s) for flag"],   
            priority: item["Priority"],   
            topMessage: topMessage,  
            recommendation: recommendation, 
            comments: comments, 
            input: input,  
            isJam: item["is_jam"],
            honey: item["MEL or No-Dispatch"],
            dateFrom: DateConverter(item["Date from"]),
            dateTo: DateConverter(item["Date to"]),
          }
        );
        return data;
      }
      ));

    const options = {
      selectableRows: 'multiple',
      rowsSelected: rowsSelectedState,
      onRowSelectionChange: HandleMultipleRowSelect,
      selectableRowsOnClick: false,
      resizableColumns: false,
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
              dateFrom = {rowData[13]}
              dateTo = {rowData[14]}
              tail = {rowData[0]}
              EqID = {rowData[6]}
            />
            </TableCell>
        </TableRow>
        );
      },
      filter: true,
      filterType: 'multiselect',
      responsive: "standard",
      fixedHeader: true,
      fixedSelectColumn: true,
      jumpToPage: true,
      downloadOptions: {
        filename: 'History Report from ' + props.reportConditions.fromDate + ' to ' + props.reportConditions.toDate + '.csv',
        separator: ',',
      },
      setRowProps: (row, index) => {
        if (row[22] === true){
          return {style: {background:'#FF7F50'}}
        }
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
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
    };
  

  return (
    <div class="reports-root">
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
export default HistoryReport;

