import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import "../../../../scss/_main.scss";
import { DateConverter } from '../../../Helper/Helper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';
import ExpandIcon from '@mui/icons-material/SettingsOverscan';
import AnalysisCustomToolbar from '../../GenerateReport/AnalysisCustomToolbar';
import SearchTab from '../../GenerateReport/Search';
import { Button } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import "../../../../../src/scss/components/_analysis.scss"
import { DataGrid } from '@mui/x-data-grid';
import {randomId} from '@mui/x-data-grid-generator';
import { Theme, styled } from '@mui/material/styles';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    left: '89vw',
    alignSelf: 'flex-end'
  }
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 1,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
 
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
    
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
      fontWeight: 'bold',
      fontSize: '12px',

  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },

}));

const HistoryReport = (props) => {
  const [pageSize, setPageSize] = React.useState(20);
  const [flagList, setFlagList] = useState();
  const [rowsSelectedState, setRowsSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [ isDefault, setIsDefault ] = useState(true);
  const [ searchParameters, setSearchParameters ] = useState([]);
  const [ openSearch, setOpenSearch ] = useState(false);
  const [ searchLoading, setSearchLoading ] = useState(false);
  const [ searchError, setSearchError ] = useState(false);
  const [ firstData, setFirstData ] = useState([]);
  const [ data, setData ] = useState([]);
  const [pageNo, setPageNo] = useState(0) 
  const [arrayOfRows, setArrayOfRows] = useState([]) 
  const classes = useStyles();
  const [ display, setDisplay ] = useState('');
  const [rowExpand, setRowExpand] = useState({});
  const [expand, setExpand] = useState(true);

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.history-report .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.history-report .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const toggleSearchModal = () => {
    setOpenSearch(!openSearch);
  }

  const handleSearchChange = ( column, operator, value ) => {
    setSearchLoading(true);
    const searchParametersCopy = [];
    searchParametersCopy.push(column);
    searchParametersCopy.push(operator);
    searchParametersCopy.push(value);
    setSearchParameters(searchParametersCopy);
  }

  useEffect(()=> {

    if ( searchParameters.length ) {
      let isFound = false;
      setSearchError(false);
      let columnKey;
      columns.map( (column, index ) => {
        if ( column.label === searchParameters[0] ) {
          columnKey = column.name;
        }
      })
      let dataCopy = [];
      switch( searchParameters[1] ) {
        case 'contains':
          firstData.map( (item, index) => {
            isFound = item?.[columnKey]?.toLowerCase()?.includes(searchParameters[2]?.toLowerCase());
            if ( isFound ) {
              dataCopy.push(item);
            } 
          });
          if( dataCopy.length === 0 ) {
            setSearchError(true);
          }
          setSearchLoading(false);
          setData(dataCopy);
        break;
        case 'equal':
          firstData.map( (item, index) => {
            isFound = item?.[columnKey]?.toString()?.toLowerCase() === searchParameters[2]?.toString()?.toLowerCase();
            if ( isFound ) {
              dataCopy.push(item);
            } 
          });
          if( dataCopy.length === 0 ) {
            setSearchError(true);
          }
          setSearchLoading(false);
          setData(dataCopy);
        break;
        case 'starts with':
          firstData.map( (item, index) => {
            isFound = item?.[columnKey]?.toString()?.toLowerCase()?.startsWith(searchParameters[2]?.toString()?.toLowerCase());
            if ( isFound ) {
              dataCopy.push(item);
            } 
          });
          if( dataCopy.length === 0 ) {
            setSearchError(true);
          }
          setSearchLoading(false);
          setData(dataCopy);
          break;
        case 'ends with':
          firstData.map( (item, index) => {
            isFound = item?.[columnKey]?.toString()?.toLowerCase()?.endsWith(searchParameters[2]?.toString()?.toLowerCase());
            if ( isFound ) {
              dataCopy.push(item);
            } 
          });
          if( dataCopy.length === 0 ) {
            setSearchError(true);
          }
          setSearchLoading(false);
          setData(dataCopy);
          break;
        case 'is empty':
          firstData.map( (item, index) => {
            isFound = item?.[columnKey]?.toString() === "";
            if ( isFound ) {
              dataCopy.push(item);
            } 
          });
          if( dataCopy.length === 0 ) {
            setSearchError(true);
          }
          setSearchLoading(false);
          setData(dataCopy);
          break;
        case 'is not empty':
          firstData.map( (item, index) => {
            isFound = item?.[columnKey]?.toString() !== "";
            if ( isFound ) {
              dataCopy.push(item);
            } 
          });
          if( dataCopy.length === 0 ) {
            setSearchError(true);
          }
          setSearchLoading(false);
          setData(dataCopy);
          break;
        default:
          setSearchLoading(false);
          setData(firstData);
          break;
      }
    }
  }, [searchParameters, setPageNo])

  const HandleMultipleRowSelect = (rowsSelectedData, allRows, rowsSelected) => {
    const arrayOfRows = allRows.map((row)=> {
      return row.dataIndex;
    })
    localStorage.setItem('indexSelected' ,  JSON.stringify(arrayOfRows))
    // setRowsSelected(rowsSelected);
    let FlagArray = [];
    let ACSNArray = [];
    rowsSelected.map((item => {
      ACSNArray.push(data[item].ACSN);
      FlagArray.push("('"+ data[item].ACSN +"','"+ data[item].B1Equation +"')");
      return FlagArray;
    }));
    let flagList =  FlagArray.join(",");
    props.setJamACSNHistoryValue(ACSNArray[ACSNArray.length-1]);
    localStorage.setItem('jamACSNHistory', ACSNArray[ACSNArray.length-1])

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
    // {
    //   name: 'action', 
    //   label: <ExpandIcon className="reports-expand-icon header"/>,
    //   options: {
    //    filter: false,
    //    sort: false,
    //    empty: true,
    //   customBodyRenderLite: (dataIndex, rowIndex) => {
    //     return (
    //       <ExpandIcon 
    //         className="reports-expand-icon"
    //         label="Expand Row"
    //       />
    //     );
    //   },
    //   setCellProps: () => ({
    //     style: {
    //       maxWidth:'60px',
    //       padding: '5px 13px 0 0',
    //       textAlign:"left",
    //       margin: '0px',
    //       color: 'grey'
    //     }}
    //   ),
    //   setCellHeaderProps: () => ({
    //     style: {
    //       maxWidth:'60px',
    //       padding:'5px',
    //       textAlign:"center",
    //       margin: '0px',
    //       whiteSpace: 'normal',
    //     }}),
    //   }
    // },
    {
      field: 'tail',
      headerName: 'Tail#',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'tail', 
      // label: 'Tail#',
      // options: {
      //  filter: true,
      //  filterType: 'dropdown',
      //  sort: true,
      // }
    },
    {
      field: 'ACSN',
      headerName: 'ACSN#',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'ACSN', 
      // label: 'ACSN',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'EICASMessages',
      headerName: 'EICAS Message',
      width:130,
      renderCell: (params) => { return <ExpandCell {...params} /> },

      // name: 'EICASMessages', 
      // label: 'EICAS Message',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'mdcMessages',
      headerName: 'MDC Message',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'mdcMessages', 
      // label: 'MDC Message',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'LRU',
      headerName: 'LRU',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'LRU', 
      // label: 'LRU',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'ATA',
      headerName: 'ATA',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'ATA', 
      // label: 'ATA',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'B1Equation',
      headerName: 'B1-Equation',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'B1Equation', 
      // label: 'B1-Equation',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'type',
      headerName: 'Type',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'type', 
      // label: 'Type',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'equationDescription',
      headerName: 'Equation Description',
      width:130,
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'equationDescription', 
      // label: 'Equation Description',
      // options: {
      //  filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({
      //     style: {
      //       maxWidth:'400px',
      //       padding:'13px',
      //       textAlign:"left",
      //       margin: '0px',
      //     }}
      //   ),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'totalOccurences',
      headerName: 'Occ',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'totalOccurences', 
      // label: 'Occ',
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   secondaryLabel: 'Total Occurrences',
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'consecutiveDays',
      headerName: 'Cons. Days',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'consecutiveDays', 
      // label: 'Cons. Days',
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   secondaryLabel: 'Consecutive Days',
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'ConsecutiveFlights',
      headerName: 'Cons. Legs',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'ConsecutiveFlights', 
      // label: 'Cons. Legs', 
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   secondaryLabel: 'Consecutive Flight Legs',
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'intermittent',
      headerName: 'Int.',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'intermittent', 
      // label: 'Int.', 
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   secondaryLabel: 'Intermittent',
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'dateFrom',
      headerName: 'Date from',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'dateFrom', 
      // label: 'Date from',
      // options: {
      //  filter: true,
      //  filterType: 'dropdown',
      //  sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'dateTo',
      headerName: 'Date to',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'dateTo', 
      // label: 'Date to',
      // options: {
      //  filter: true,
      //  filterType: 'dropdown',
      //  sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'reasons',
      headerName: 'Reason(s) for flag',
      width:150,
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'reasons', 
      // label: 'Reason(s) for flag',
      // options: {
      //  filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'priority',
      headerName: 'Priority',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'priority', 
      // label: 'Priority',
      // options: {
      //  filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'topMessage',
      headerName: 'Known Top Message',
      width:150,
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'topMessage', 
      // label: 'Known Top Message',
      // options: {
      //   filter: false,
      //   sort: true,
      //   secondaryLabel: 'Known Top Message - Recommended Documents',
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'mel',
      headerName: 'MEL or No-Dispatch',
      width:150,
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'mel', 
      // label: 'MEL or No-Dispatch',
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'input',
      headerName: 'MHIRJ Input',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'input', 
      // label: 'MHIRJ Input',
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({
      //     style: {
      //       maxWidth:'300px',
      //       padding:'13px',
      //       textAlign:"left",
      //       margin: '0px',
      //     }}
      //   ),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'recommendation',
      headerName: 'MHIRJ Recommendation',
      width:150,
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'recommendation', 
      // label: 'MHIRJ Recommendation',
      // options: {
      //   filter: false,
      //   setCellProps: () => ({
      //     style: {
      //       maxWidth:'400px',
      //       padding:'13px',
      //       textAlign:"left",
      //       margin: '0px',
      //     }}
      //   ),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'comments',
      headerName: 'Additional Comments',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'comments', 
      // label: 'Additional Comments',
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({
      //     style: {
      //       maxWidth:'300px',
      //       padding:'13px',
      //       textAlign:"left",
      //       margin: '0px',
      //     }}
      //   ),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
     },
     {
      field: 'isJam',
      headerName: 'Jam',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'isJam', 
      // label: 'Jam',
      // options: {
      //  filter: true,
      //  filterType: 'dropdown',
      //  customFilterListOptions: {
      //   render: item => item == false ? "False Jams" : "True Jams"
      // },
      //  sort: false,
      //  display: false,
      // }
     },
     {
      field: 'keywords',
      headerName: 'Correlation Keywords',
      renderCell: (params) => { return <ExpandCell {...params} /> },
      // name: 'keywords', 
      // label: 'Correlation Keywords',
      // options: {
      //  filter: false,
      //  sort: false
      // }
     },
    ];

    const ExpandCell = (params) => {
      if(rowExpand.hasOwnProperty(params.id)){
        if(rowExpand[params.id]){
          return(
            <div className='cellIsExpand'>
              {params.value}
            </div>
          )
        }else{
          return(
            <div className='cellIsCollapse'>
              {params.value}
            </div>
          )
        }
      }else{
        return(
          <div className='cellIsCollapse'>
          {params.value}
        </div>
        )
      }
    }

  useEffect(()=> {
    let dataCopy = [];

   
    props.data?.map((item => {
    
      dataCopy.push(
        {
          ACSN: item["AC SN"],
          tail: item["AC_TN"], 
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
          intermittent: item["INTERMITNT"],  
          reasons: item["Reason(s) for flag"],   
          priority: item["Priority"],   
          topMessage: item["Known Top Message - Recommended Documents"],  
          recommendation: item["MHIRJ Recommendation"], 
          comments: item["Additional Comments"], 
          input: item["MHIRJ Input"],  
          isJam: item["is_jam"], 
          mel: item["MEL or No-Dispatch"], 
          dateFrom: DateConverter(item["Date from"]), 
          dateTo: DateConverter(item["Date to"]), 
          keywords: item["Keywords"],
          id: randomId()
        }
      );
    }
    ));
    setData(dataCopy);
    setFirstData(dataCopy);
  }, [props.data])

  useEffect(()=> {
    let pageNumber = localStorage.getItem('historyReportPageNum');
    if(pageNumber){
      setPageNo(parseInt(pageNumber));
    }
  })

    const options = {
      selectableRows: 'multiple',

      onRowSelectionChange: HandleMultipleRowSelect,
      selectableRowsOnClick: false,
      resizableColumns: false,
      expandableRows: true,
      sortOrder: {
        name: 'totalOccurences',
        direction: 'desc'
      },
      customToolbar: () => {
        return (
          <AnalysisCustomToolbar 
            toggleSearchModal={toggleSearchModal}
            openSearch = {openSearch}
          />
        );
      },
      page: pageNo,
      onChangePage: (currentPage) => {
        localStorage.setItem('historyReportPageNum' , currentPage);
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
        localStorage.setItem('historyReportExpandedRows', JSON.stringify(arrayOfRows1));
      },
      rowsExpanded: JSON.parse(localStorage.getItem('historyReportExpandedRows')),
      renderExpandableRow: (rowData, rowMeta) => {
        return (    
        <TableRow >
          <TableCell colSpan={rowData.length+1}>
            <CorrelationAnalysisTable
              dateFrom = {rowData[14]}
              dateTo = {rowData[15]}
              tail = {rowData[1]}
              EqID = {rowData[7]}
              correlationKeywords = {rowData[24]} 
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
      setRowProps: (row, index1 , rowIndex1) => {
        for(let i = 0; i < arrayOfRows.length; i++){
          if(arrayOfRows[i] === index1){
            return {style: {backgroundColor:'#F3FFD0'}}
          }
        }
    
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
      rowsSelected: JSON.parse(localStorage.getItem('indexSelected')),
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions:  [20 ,50,100],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '550px'
    };
    useEffect(()=>{
      if(localStorage.getItem('historyReportExpandedRows')){
        setArrayOfRows(JSON.parse(localStorage.getItem('historyReportExpandedRows')))
      }
    },[setArrayOfRows])

    const getRowHeights = ({ id, densityFactor }) => {
      if(rowExpand.hasOwnProperty(id)){
        if(rowExpand[id] === true){
          return 340 * densityFactor;
        }else{
          return 30 * densityFactor;
        }
      }      
    }
    const onCellClicked = (params) => {
      if(params.field !== "actions"){
        if(params.cellMode === "view"){
          setExpand(!expand)
          rowExpand[params.id] = expand 
          setRowExpand(rowExpand) 
        }
      }
    }

    const onCellDoubleClicked = (params, event) => {
      if (!event.ctrlKey) {
        event.defaultMuiPrevented = true;
      }
    }

    const sxStyle = {
      borderColor: 'primary.light',
      '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
      },
      whiteSpace: 'normal',
      '& .MuiDataGrid-cell[data-field*="actions"]': {
        position: '-webkit-sticky',
        position: 'sticky',
        background: '#fff',
        left: 0,
        zIndex: 1,
      },
  
    }

  return (
    <>
      {/* <div style={{display: `${props.display}`}} className="reports-root history-report"> */}
        {/* { openSearch &&
            <SearchTab 
              columns={columns}
              handleSearchChange={handleSearchChange}
              searchLoading={searchLoading}
              searchError = {searchError}
            />  
          } */}
        {/* <Grid container spacing={0}>
          <Grid item xs={12}>
          <Button onClick={props.closeReport} className={classes.customHoverFocus}>
            <CloseIcon />
            </Button>
      
          </Grid> 
        </Grid>  */}
        {/* <MUIDataTable
              title= {<h2 style={{padding: '3px'}}>{props.title}</h2>}
              data={data}
              columns={columns}
              options={options}
              
            /> */}
             <div style={{ width: '97%', height: 650 }}>
               <h2 style={{height: '20px', padding: '8px'}}>{props.title}</h2>
            <StyledDataGrid  disableVirtualization
              rows={data}
              
              columns={columns}
              getrowExpand={row => row.id}
              checkboxSelection
              getRowHeight={getRowHeights}
              onCellClick={onCellClicked}
              onCellDoubleClick={onCellDoubleClicked}
              columnBuffer={2}
              columnThreshold={2}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              rowHeight={30}
            />
            </div>
      {/* </div> */}
    </>
  );
}
export default HistoryReport;

{/* <div style={{ width: '97%', height: height }}>
<DataGrid disableVirtualization disableClickEventBubbling 
  getrowExpand={row => row.id}
  title={"INPUT MESSAGE DATA "}
  rows={updateData}
  columns={columns}
  columnBuffer={2}
  columnThreshold={2}
  editMode='row'
  loading={loading}
 
  getRowHeight={getRowHeights}
  onCellClick={onCellClicked}
  onCellDoubleClick={onCellDoubleClicked}
  sx={sxStyle}
  pageSize={pageSize}
  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
  rowsPerPageOptions={[20, 50, 100]}
  pagination
/>

</div> */}