import React, {useEffect, useState} from 'react';
import MUIDataTable, { icons  } from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import {DateConverter} from '../../../Helper/Helper';
import "../../../../scss/_main.scss";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';
import ExpandIcon from '@mui/icons-material/SettingsOverscan';
import AnalysisCustomToolbar from '../../GenerateReport/AnalysisCustomToolbar';
import SearchTab from '../../GenerateReport/Search';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    left: '89vw',
    alignSelf: 'flex-end'
  }
}));

const DailyReport = (props) => {
  const classes = useStyles();
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

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.daily-report .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.daily-report .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
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
    let pageNumber = localStorage.getItem('dailyReportPageNum');
    if(pageNumber){
      setPageNo(parseInt(pageNumber));
    }
  })

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

  const HandleSingleRowSelect = (rowsSelectedData, allRows, rowsSelected) => {
    if (rowsSelected.length !== 0 && data[rowsSelected].isJam === true) {
      setRowsSelected(rowsSelected);
      props.HandleSingleRowSelect(data[rowsSelected].ACSN);
    }
    else {
      setRowsSelected(rowsSelected);
    }
  };

  



const CustomCheckbox = () => {
  return (<CloseIcon />);
}

  const onChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
  };

  const headingStyle = {
    // maxWidth:'200px',
    // minWidth:'50px',
    // padding:'5px',
    // textAlign:"center",
    // margin: '0px',
    // whiteSpace: 'normal',
  }

  const columnStyle = {
    maxWidth:'100px',
    // padding:'0',
    // textAlign:"left",
    // margin: '0px',
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
      className: 'daily-column-header',
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
      name: 'EICASMessage', 
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
      name: 'mdcMessages', 
      label: 'MDC Message',
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
        secondaryLabel: 'Total Occurrences',
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
        secondaryLabel: 'Intermittent',
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'reasons', 
      label: 'Reason(s) for flag',
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
      label: 'Known Top Message',
      options: {
        filter: false,
        sort: true,
        secondaryLabel: 'Known Top Message - Recommended Documents',
        setCellProps: () => ({style: columnStyle}),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
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
      name: 'keywords', 
      label: 'Correlation Keywords',
      options: {
      filter: false,
      sort: false
      }
     },
    ];

  useEffect(()=> {

    let dataCopy = [];
    props.data?.map((item => {
      let input = item["MHIRJ ISE Input"] === '0' ? '' : item["MHIRJ ISE Input"];
      let recommendation = item["MHIRJ ISE Recommendation"] === '0' ? '' : item["MHIRJ ISE Recommendation"];
      let comments = item["Additional Comments"] === '0' ? '' : item["Additional Comments"];
      let topMessage = item["Known Top Message - Recommended Documents"] === '0' ? '' : item["Known Top Message - Recommended Documents"];
  
      dataCopy.push(
        {
          tail: item["AC_TN"],  
          date: DateConverter(item["Date"]),
          ACSN: item["AC SN"], 
          EICASMessage: item["EICAS Message"], 
          mdcMessages: item["MDC Message"], 
          LRU: item["LRU"],  
          ATA: item["ATA"],  
          B1Equation: item["B1-Equation"], 
          type: item["Type"],   
          equationDescription: item["Equation Description"], 
          totalOccurences: item["Total Occurences"],  
          ConsecutiveFlights: item["Consecutive FL"], 
          intermittent: item["INTERMITNT"],  
          reasons: item["Reason(s) for flag"],   
          priority: item["Priority"],   
          topMessage: topMessage,  
          mel: item["MEL or No-Dispatch"],
          input: input,  
          recommendation: recommendation, 
          comments: comments, 
          keywords: item["Keywords"]
        }
      );
      //return data;
    }
    ));
    
    setData(dataCopy);
    setFirstData(dataCopy);
  }, [props.data])
  

  
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
        name: 'totalOccurences',
        direction: 'desc'
      },
      page: pageNo,
      onChangePage: (currentPage) => {
        localStorage.setItem('dailyReportPageNum' , currentPage);
      },
      customToolbar: () => {
        return (
          <AnalysisCustomToolbar 
            toggleSearchModal={toggleSearchModal}
            openSearch = {openSearch}
          />
        );
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
        localStorage.setItem('dailyReportExpandedRows', JSON.stringify(arrayOfRows1));
      },
      rowsExpanded: JSON.parse(localStorage.getItem('dailyReportExpandedRows')),
      renderExpandableRow: (rowData, rowMeta) => {
        return (    
          <TableRow className="correlation-analysis-subtable">
            <TableCell colSpan={rowData.length+1}>
              <CorrelationAnalysisTable
                dateFrom = {rowData[2]} 
                dateTo = {rowData[2]}
                tail = {rowData[1]}
                EqID = {rowData[8]}
                correlationKeywords = {rowData[21]} 
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
      setRowProps: (row, index1 , rowIndex1) => {
        for(let i = 0; i < arrayOfRows.length; i++){
          if(arrayOfRows[i] === index1){
            return {style: {backgroundColor:'#F3FFD0'}}
          }
        }
        
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
      rowsPerPageOptions: [20 ,50,100],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
    };

    useEffect(()=>{
      if(localStorage.getItem('dailyReportExpandedRows')){
        setArrayOfRows(JSON.parse(localStorage.getItem('dailyReportExpandedRows')))
      }
    },[setArrayOfRows])

   
  
  return (
    <>
      <div style={{display: `${props.display}`}} className="reports-root daily-report">
        { openSearch &&
        <div>
          <SearchTab 
            columns={columns}
            handleSearchChange={handleSearchChange}
            searchLoading={searchLoading}
            searchError = {searchError}

          />  
          </div>
        }
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Button onClick={props.closeReport} className={classes.customHoverFocus}>
            <CloseIcon />

            </Button>
    
        <MUIDataTable
              title={props.title}
              data={data}
              columns={columns}
              options={options}
              components= {{  Checkbox: CustomCheckbox}}
            />
   
         
          </Grid> 
        </Grid> 
      </div>
    </>
  );
}
export default DailyReport;

