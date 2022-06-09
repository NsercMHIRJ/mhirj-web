import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import {DateConverter} from '../../../Helper/Helper';
import '../../../../scss/_main.scss';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';
import ExpandIcon from '@mui/icons-material/SettingsOverscan';
import { Button } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    left: '89vw',
    alignSelf: 'flex-end'
  }
}));

const JamsReport = (props) => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [ isDefault, setIsDefault ] = useState(true);
  const [pageNo, setPageNo] = useState(0); 
  const [arrayOfRows, setArrayOfRows] = useState([]) 
  const classes = useStyles();
  const [ display, setDisplay ] = useState('');

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.jam-report .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.jam-report .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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
      name: 'action', 
      label: <ExpandIcon className="reports-expand-icon header"/>,
      options: {
       filter: false,
       sort: false,
       empty: true,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <ExpandIcon 
            className="reports-expand-icon"
            label="Expand Row"
          />
        );
      },
      setCellProps: () => ({
        style: {
          maxWidth:'60px',
          padding: '5px 13px 0 0',
          textAlign:"left",
          margin: '0px',
          color: 'grey'
        }}
      ),
      setCellHeaderProps: () => ({
        style: {
          maxWidth:'60px',
          padding:'5px',
          textAlign:"center",
          margin: '0px',
          whiteSpace: 'normal',
        }}),
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
      name: 'EICASMessages', 
      label: 'EICAS Message',
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
      name: 'B1Equation', 
      label: 'B1-Equation',
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
    // {
    //   name: 'totalOccurences', 
    //   label: 'Occ',
    //   options: {
    //     filter: false,
    //     filterType: 'dropdown',
    //     sort: true,
    //     secondaryLabel: 'Total Occurrences',
    //     setCellProps: () => ({style: columnStyle}),
    //     setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
    // {
    //   name: 'consecutiveDays', 
    //   label: 'Cons. Days',
    //   options: {
    //     filter: false,
    //     filterType: 'dropdown',
    //     sort: true,
    //     secondaryLabel: 'Consecutive Days',
    //     setCellProps: () => ({style: columnStyle}),
    //     setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
    // {
    //   name: 'ConsecutiveFlights', 
    //   label: 'Cons. Legs', 
    //   options: {
    //     filter: false,
    //     filterType: 'dropdown',
    //     sort: true,
    //     secondaryLabel: 'Consecutive Flight Legs',
    //     setCellProps: () => ({style: columnStyle}),
    //     setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
    {
      name: 'intermittent', 
      label: 'Int.', 
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        secondaryLabel: 'Intermittent',
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'DateAndTime', 
      label: 'Date',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: columnStyle}),
       setCellHeaderProps: () => ({ style: headingStyle }),
      }
    },
    // {
    //   name: 'reasons', 
    //   label: 'Reason(s) for flag',
    //   options: {
    //    filter: false,
    //     filterType: 'dropdown',
    //     sort: true,
    //     setCellProps: () => ({style: columnStyle}),
    //     setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
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
    // {
    //   name: 'topMessage', 
    //   label: 'Known Top Message',
    //   options: {
    //     filter: false,
    //     sort: true,
    //     secondaryLabel: 'Known Top Message - Recommended Documents',
    //     setCellProps: () => ({style: columnStyle}),
    //     setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
     {
      name: 'mel', 
      label: 'MEL or No-Dispatch',
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
      label: 'MHIRJ Recommendation',
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
      label: 'Additional Comments',
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
      name: "flightLegNumber",
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
       filter: false,
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
    //  {
    //   name: 'diagnosticData', 
    //   label: 'Diagnostic Data',
    //   options: {
    //    filter: true,
    //    filterType: 'dropdown',
    //    sort: true,
    //    setCellProps: () => ({style: columnStyle}),
    //    setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
    //  {
    //   name: 'determineData', 
    //   label: 'Data Used to Determine Msg',
    //   options: {
    //    filter: true,
    //    filterType: 'dropdown',
    //    sort: true,
    //    setCellProps: () => ({style: columnStyle}),
    //    setCellHeaderProps: () => ({ style: headingStyle }),
    //   }
    //  },
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
    {
      name: 'keywords', 
      label: 'Correlation Keywords',
      options: {
      filter: false,
      sort: false
      }
     },
    ];

    const flightNumber = props.data ? props.data :  '';
    const [flightLegNumber,setFlightLegNumber] = useState(flightNumber);
    useEffect(()=> {
      const pageNumber = localStorage.getItem('jamReportPageNum');
      if(pageNumber){
        setPageNo(parseInt(pageNumber));
      }
    })

    

     let data = [];
      props.data?.map((item => {
        let input = item["MHIRJ_ISE_inputs"] === '0' ? '' : item["MHIRJ_ISE_inputs"];
        let recommendation = item["MHIRJ_ISE_Recommended_Action"] === '0' ? '' : item["MHIRJ_ISE_Recommended_Action"];
        let comments = item["Additional_Comments"] === '0' ? '' : item["Additional_Comments"];
       //let topMessage = item["Known Top Message - Recommended Documents"] === '0' ? '' : item["Known Top Message - Recommended Documents"];

        data.push(
          {
            tail: item["AC_TN"],
            EICASMessages: item["EICAS"], 
            MDCMessage: item["Message"],
            LRU: item["LRU"], 
            ATA: item["ATA"], 
            B1Equation: item["Equation_ID"],  
            type: item["MSG_TYPE"],   
            equationDescription: item["Equation_Description"], 
            // totalOccurences: item["Total Occurrences"],   // Not currently available on API response
            // consecutiveDays: item["Consecutive Days"],  // Not currently available on API response
            // ConsecutiveFlights: item["Consecutive FL"],   // Not currently available on API response
            intermittent: item["INTERMITNT"], 
            // reasons: item["Reason(s) for flag"],    // Not currently available on API response
            priority: item["Priority"],  
            // topMessage: topMessage,   // Not currently available on API response
            recommendation: recommendation,
            comments: comments,
            input: input, 
            mel: item["MEL_or_No_Dispatch"],
            flight: item["FLIGHT_NUM"],
            ATAMain: item["ATA_Main"],
            ATASub: item["ATA_SUB"],
            ATADescription: item["ATA_NAME"],
            DateAndTime: DateConverter(item["MSG_Date"]), 
            status: item["msg_status"],
            flightPhase: item["FLIGHT_PHASE"],
            source: item["SOURCE"],
            //diagnosticData: item["Diagnostic Data"],  // Not currently available on API response
            //determineData: item["Data Used to Determine Msg"],   // Not currently available on API response
            ID: item["MSG_ID"],
            flightLegNumber: item["FLIGHT_LEG"],
            keywords: item["Keywords"],
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
      selectableRows:'multiple',
      selectableRowsHideCheckboxes: true,
      selectableRowsOnClick: false,
      expandableRows: true,
      sortOrder: {
        name: 'DateAndTime',
        direction: 'desc'
      },
      onCellClick: (colData, cellMeta) => {
        setIsDefault(!isDefault);
        AddCellClass(cellMeta.rowIndex);
      },
      onRowExpansionChange: (currentRowsExpanded, allRowsExpanded, rowsExpanded) => {
        let arrayOfRows1 = allRowsExpanded.map((row)=> {
          return row.dataIndex;
        })
        setArrayOfRows(arrayOfRows1)
        localStorage.setItem('jamReportExpandedRows', JSON.stringify(arrayOfRows1));
      },
      page: pageNo,
      onChangePage: (currentPage) => {
        localStorage.setItem('jamReportPageNum' , currentPage);
      },
      rowsExpanded: JSON.parse(localStorage.getItem('jamReportExpandedRows')),
      renderExpandableRow: (rowData, rowMeta) => {
        return (    
        <TableRow>
          <TableCell colSpan={rowData.length+1}>
            <CorrelationAnalysisTable
              dateFrom = {rowData[10]} 
              dateTo = {rowData[10]} 
              tail = {rowData[1]}
              EqID = {rowData[6]}
              correlationKeywords = {rowData[25]} 
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
    setRowProps: (row, index1 , rowIndex1) => {
   
 
      for(let i = 0; i < arrayOfRows.length; i++){
        if(arrayOfRows[i] === index1){
          return {style: {backgroundColor:'#F3FFD0'}}
        }
      }
    },
      elevation: 4,
      rowsPerPage: rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [20,50,100],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : `650px`
    };

    useEffect(()=>{
      if(localStorage.getItem('jamReportExpandedRows')){
        setArrayOfRows(JSON.parse(localStorage.getItem('jamReportExpandedRows')))
      }
    },[setArrayOfRows])


  return (
    <div  style={{display: `${data.length !== 0 ? '' : 'none'}`}} className="reports-root jam-report">
      <Grid container spacing={0}>
        <Grid item xs={12}>
        <Button onClick={props.closeReport} className={classes.customHoverFocus}>
            <CloseIcon />
            </Button>
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

