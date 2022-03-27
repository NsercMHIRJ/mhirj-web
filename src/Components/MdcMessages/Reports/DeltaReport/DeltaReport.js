import React, {useEffect, useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import "../../../../scss/_main.scss";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';
import $ from 'jquery';
import ExpandIcon from '@mui/icons-material/SettingsOverscan';
import AnalysisCustomToolbar from '../../GenerateReport/AnalysisCustomToolbar';
import SearchTab from '../../GenerateReport/Search';

const DeltaReport = (props) => {
  const [deltaParameters, setDeltaParameters] = useState(JSON.parse(localStorage.getItem('delta-report')));
  const [ isDefault, setIsDefault ] = useState(true);
  const [ searchParameters, setSearchParameters ] = useState([]);
  const [ openSearch, setOpenSearch ] = useState(false);
  const [ searchLoading, setSearchLoading ] = useState(false);
  const [ searchError, setSearchError ] = useState(false);
  const [ firstData, setFirstData ] = useState([]);
  const [ data, setData ] = useState([]);

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.delta-report .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.delta-report .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const toggleSearchModal = () => {
    setOpenSearch(!openSearch);
  }

  const handleSearchChange = ( column, operator, value, sign ) => {
    setSearchLoading(true);
    const searchParametersCopy = [];
    searchParametersCopy.push(column);
    searchParametersCopy.push(operator);
    searchParametersCopy.push(value);
    searchParametersCopy.push(sign);
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
        case 'is any of':
          isFound = firstData?.some(
            function(item, index) {
               let result = eval(
                item?.[columnKey]?.toString()?.toLowerCase() +
                searchParameters[3]?.toString() + 
                searchParameters[2]?.toString()?.toLowerCase() 
              )
                if ( result ) {
                  dataCopy.push(firstData[index]);
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
  }, [searchParameters])

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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: () => ({ style: columnStyle }),
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
        setCellProps: (row , index) => {
          if( data[index].Total_occurrences_color ) {
            return { style: { ...columnStyle, background: data[index].Total_occurrences_color } }
          } else {
            return { style: columnStyle }
          }
        },
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
        setCellProps: (row , index) => {
          if(data[index].Consecutive_days_color) {
            return { style: { ...columnStyle, background: data[index].Consecutive_days_color } }
          } else {
            return { style: columnStyle }
          }
        },
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
        setCellProps: (row , index) => {
          if(data[index].Consecutive_FL_color) {
            return { style: {  ...columnStyle, background: data[index].Consecutive_FL_color } }
          } else {
            return { style: columnStyle }
          }
        },
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
        setCellProps: (row , index) => {
          if(data[index].Intermittent_color) {
            return { style: {...columnStyle, background: data[index].Intermittent_color } }
          } else {
            return { style: columnStyle }
          }
        },
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'dateFrom', 
      label: 'Date from',
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
      label: 'Date to',
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
        setCellProps: () => ({ style: columnStyle }),
        setCellHeaderProps: () => ({ style: headingStyle }),
      }
     },
     {
      name: 'mel', 
      label: 'MEL or No-Dispatch',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: columnStyle }),
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
        data.push(
          {
            ACSN: item["AC SN"],
            tail: item["Tail#"],
            EICASMessages: item["EICAS Related"],
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
            topMessage: item["MHIRJ Known Message"],
            recommendation: item["MHIRJ Recommended Action"],
            comments: item["MHIRJ Additional Comment"],
            input: item["MHIRJ Input"],
            isJam: item["Jam"],
            background: item["backgroundcolor"],
            Total_occurrences_color: item["Total Occurrences Col"],
            Consecutive_days_color: item["Consecutive Days Col"],
            Consecutive_FL_color: item["Consecutive FL Col"],
            Intermittent_color: item["INTERMITNT Col"],
            mel: item["Mel or No-Dispatch"],
            dateFrom: item["Date From"],
            dateTo: item["Date To"],
            mdcMessages: item["MDC Message"],
            keywords: item["Keywords"]
          }
        );
        return data;
      }
      ));
      setData(dataCopy);
      setFirstData(dataCopy);
    }, [props.data])

    const options = {
      selectableRows: false,
      selectableRowsOnClick: false,
      filter: true,
      filterType: 'multiselect',
      responsive: "standard",
      fixedHeader: true,
      fixedSelectColumn: true,
      jumpToPage: true,
      resizableColumns: false,
      expandableRowsHeader: false,
      sortOrder: {
        name: 'totalOccurences',
        direction: 'desc'
      },
      downloadOptions: {
        filename: 'Delta Report.csv',
        separator: ',',
      },
      expandableRows: true,
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
      renderExpandableRow: (rowData, rowMeta) => {
        return (    
        <TableRow className="correlation-analysis-subtable">
          <TableCell colSpan={rowData.length+1}>
            <CorrelationAnalysisTable
              dateFrom = {deltaParameters.deltaFrom}
              dateTo = {deltaParameters.deltaTo}
              tail = {rowData[1]}
              EqID = {rowData[7]}
              correlationKeywords = {rowData[24]} 
            />
            </TableCell>
        </TableRow>
        );
      },
      setRowProps: (row, index) => {
        return {style: {background: data[index].background}}
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
      rowsPerPage: 10,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
    };
  

  return (
    <>
      <div className={"reports-root delta-report"}>
        { openSearch &&
          <SearchTab 
            columns={columns}
            handleSearchChange={handleSearchChange}
            searchLoading={searchLoading}
            searchError = {searchError}
          />  
        }
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
    </>
  );
}
export default DeltaReport;

