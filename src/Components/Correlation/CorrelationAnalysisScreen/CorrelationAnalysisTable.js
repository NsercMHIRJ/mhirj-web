import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import {DateConverter, DateConverterWithHour} from '../../Helper/Helper';
import Constants from '../../utils/const';
import "../../../scss/_main.scss";
import moment from "moment";
import CorrelationKeywordModal from '../CorrelationKeywordModal';
import CustomTable from '../../MdcMessages/Reports/Table';
import { IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { randomId } from '@mui/x-data-grid-generator';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const columns =  
[
  {
    accessor: 'p_id', 
    Header: 'ID',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'ATA', 
    Header: 'ATA',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'PM_ATA', 
    Header: 'PM ATA',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'discrepancy', 
    Header: 'Discrepancy',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'action', 
    Header: 'Corrective Action',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'date', 
    Header: 'Reported Date',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'pm_date', 
    Header: 'Resolved Date',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  ]

  const manubilateData = (data) => {
    var responseData = []
    data.map((item => {
      responseData.push(
        {
          p_id: item["MaintTransID"],  //ok
          ATA: item["ATA_Main"], //ok
          PM_ATA: item["PM_ATA"], //ok
          discrepancy: item["Discrepancy"], //ok
          action: item["CorrectiveAction"], //ok
          date: item["TransDate"], //ok
          pm_date: DateConverterWithHour(item["PM_Resolved_Date"]), //ok
          id: randomId()
          // failureFlag: item["Failure_Flag"],
          // squawkSource: item["SquawkSource"],
          // MRB: item["MRB"],
        }
      );
    }));
    return responseData
  }

const CorrelationAnalysisTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correlationReportStatus, setCorrelationReportStatus] = useState(true);
  const [correlationReportButtonLabel, setCorrelationReportButtonLabel] = useState("Load Bad Matches");
  const [PMConditions,setPMConditions] = useState(
    {         
      dateFrom: moment(props.dateFrom).format('YYYY-MM-DD'),
      dateTo: moment(props.dateTo).format('YYYY-MM-DD'),
      EqID: props.EqID,
      tail: props.tail
    },
  );
  const [isDefault, setIsDefault] = useState(true);
  const [openCorrelationModal, setOpenCorrelationModal] = useState(false);
  const [backDate, setBackDate] = useState(7);

  const toggleKeyword = (event) => {
    setOpenCorrelationModal(!openCorrelationModal);
  }

 

  useEffect(() => {
    
    if ( PMConditions.dateFrom !== undefined  && PMConditions.dateTo !== undefined && PMConditions.EqID !== '' && PMConditions.tail !== '') {
      setLoading(true)
      setData([])
      let status = correlationReportStatus ? 3 : 1;

      let path = Constants.APIURL + 'corelation_tail/' + PMConditions.dateFrom + '/' + PMConditions.dateTo + '/' + PMConditions.EqID + '/' + PMConditions.tail + '/' + status;

      if ( backDate !== 7 && backDate !== "" ) {
        path = path + '?days=' + backDate;
      }

      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        setData(manubilateData(data));
        setLoading(false);
      }).catch(function (err){
        console.log(err);
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
    return () => {
      setData([]); // This worked for me
    };
  },[PMConditions, correlationReportStatus, backDate]);


  

// const options = {
//   filter: true,
//   filterType: 'multiselect',
//   selectableRows:'multiple',
//   selectableRowsHideCheckboxes: true,
//   selectableRowsOnClick: false,
//   responsive: "standard",
//   fixedHeader: true,
//   fixedSelectColumn: true,
//   jumpToPage: true,
//   resizableColumns: false,
//   sortOrder: {
//     name: 'date',
//     direction: 'desc'
//   },
//   onCellClick: (colData, cellMeta) => {
//     setIsDefault(!isDefault);
//     AddCellClass(cellMeta.rowIndex);
//   },
//   customFooter: ( count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels ) => {
//     return (
//       <CorrelationCustomFooter
//         count={count}
//         page={page}
//         changePage={changePage}
//         textLabels={textLabels}
//         handleCorrelationBackDateChange = {handleCorrelationBackDateChange}
//         backDate = {backDate}
//         setBackDate = {setBackDate}
//       />
//     );
//   },
//   customToolbar: () => {
//     return (
//       <CorrelationCustomToolbar 
//         label = {correlationReportButtonLabel}
//         handleCorrelationReportChange = {handleCorrelationReportChange}
//         analysis={true}
//         toggleKeyword = {toggleKeyword}
//         openCorrelationModal={openCorrelationModal}
//       />
//     );
//   },
//   downloadOptions: {
//     filename: 'Correlation Report from ' + PMConditions.dateFrom + ' to ' + PMConditions.dateTo + ' from '+ PMConditions.tail +'.csv',
//     separator: ',',
//   },
//   draggableColumns: {
//     enabled: false,
//     transitionTime: 300,
//   },
//   textLabels: {
//     body: {
//         noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
//         toolTip: "Sort",
//         columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
//     },
//   },
//   elevation: 1,
//   selectToolbarPlacement:"none",
//   };

  return (
    <>
 
{/* 
      <CorrelationKeywordModal 
        toggleKeyword = {toggleKeyword}
        openCorrelationModal={openCorrelationModal}
        correlationKeywords = { props.correlationKeywords ? props.correlationKeywords  : "No keywords available..." }
      /> */}
      <CustomTable 
      data={data}
      columns={columns}
      tableHeight={'35vh'}
      isLoading={loading}
      correlationRowColor={true}
      title={'Correlation Table'}
    />
      {/* <div className="reports-root analysis-correlation">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <MUIDataTable
              title= {correlationReportStatus ? "Correlation Report: Good Matches" : "Correlation Report: Bad Matches"}
              data={ loading ? [] : responseData }
              columns={columns}
              options={options}
            />
          </Grid> 
        </Grid> 
      </div> */}
    </>
);}

export default CorrelationAnalysisTable;

