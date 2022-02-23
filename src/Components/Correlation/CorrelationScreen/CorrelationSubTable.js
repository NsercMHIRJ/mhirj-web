import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Constants from '../../utils/const';
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';
import '../../../scss/_main.scss';
import CorrelationCustomToolbar from "../CorrelationCustomToolbar";
import ExpandIcon from '@mui/icons-material/SettingsOverscan';

const CorrelationSubTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ isDefault, setIsDefault ] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [correlationReportStatus, setCorrelationReportStatus] = useState(true);
  const [correlationReportButtonLabel, setCorrelationReportButtonLabel] = useState("Load Bad Matches");
  const [openCorrelationModal, setOpenCorrelationModal] = useState(false);

  const toggleKeyword = (event) => {
    setOpenCorrelationModal(!openCorrelationModal);
  }
  
  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root.analysis-correlation .MuiTableBody-root .MuiTableRow-root').not(':nth-child('+row+')').find('.isClicked').removeClass('isClicked');
    $('.reports-root.analysis-correlation .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const onChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
  };

  const handleCorrelationReportChange = (event) => {
    if (correlationReportButtonLabel === "Load Bad Matches") {
      setCorrelationReportButtonLabel("Load Good Matches");
    } else {
      setCorrelationReportButtonLabel("Load Bad Matches");
    }
    setCorrelationReportStatus(!correlationReportStatus);
    setLoading(true);
  }

  useEffect(()=>{
    let status = correlationReportStatus ? 3 : 1;
    const path = Constants.APIURL + 'corelation_pid/' + props.p_id + '/' + status;

    axios.post(path).then(function (res){
      var data = JSON.parse(res.data);
      setData(data);    
      setLoading(false);
    }).catch(function (err){
      console.log(err);
      setLoading(false);
    });
  },[props.p_id, correlationReportStatus])

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
    name: 'aircraftno', 
    label: 'Aircraft Number',
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
    name: 'mdc_ata_main', 
    label: 'ATA Main',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
  // {
  //   name: 'mdc_ata_sub', 
  //   label: 'ATA SUB',
  //   options: {
  //     filter: true,
  //     filterType: 'dropdown',
  //     sort: true,
  //     setCellProps: () => ({style: columnStyle}),
  //     setCellHeaderProps: () => ({ style: headingStyle }),
  //   }
  // },
  {
    name: 'ata_description', 
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
    name: 'EQ_ID', 
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
    name: 'EQ_DESCRIPTION', 
    label: 'Equation Description',
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
    name: 'MDC_MESSAGE', 
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
    name: 'CAS', 
    label: 'CAS',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({
        style: {
          maxWidth:'250px',
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
      filter: false,
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
   },
];

const responseData = [];

if (data){
  data.map((item => {
    responseData.push(
      {
        aircraftno: item["Aircraft_No"], //ok
        tail: item["Aircraft_tail_No"], //ok
        mdc_ata_main: item["ATA_Main"], //ok
        // mdc_ata_sub: item["ATA_Sub"], 
        ata_description: item["ATA_Description"], //ok
        CAS: item["CAS"], //ok
        EQ_ID: item["Equation_ID"], //ok
        EQ_DESCRIPTION: item["Equation_DESCRIPTION"], //ok
        LRU: item["LRU"],  //ok
        MDC_MESSAGE: item["MDC_MESSAGE"],  //ok
        mel: item["MEL_or_No_Dispatch"] //ok
      }
    );
    return responseData
  }));
  }

const options = {
  filter: true,
  filterType: 'multiselect',
  selectableRowsHideCheckboxes: true,
  selectableRowsOnClick: false,
  responsive: "standard",
  fixedHeader: true,
  fixedSelectColumn: true,
  jumpToPage: true,
  resizableColumns: false,
  // sortOrder: {
  //   name: 'date',
  //   direction: 'desc'
  // },
  onCellClick: (colData, cellMeta) => {
    setIsDefault(!isDefault);
    AddCellClass(cellMeta.rowIndex);
  },
  // customToolbar: () => {
  //   return (
  //     <CorrelationCustomToolbar 
  //       label = {correlationReportButtonLabel}
  //       handleCorrelationReportChange = {handleCorrelationReportChange}
  //       analysis={false}
  //       toggleKeyword = {toggleKeyword}
  //       openCorrelationModal={openCorrelationModal}
  //     />
  //   );
  // },
  downloadOptions: {
    filename: 'Correlation Report from ' + props.dateFrom + ' to ' + props.dateTo + ' from '+ props.p_id +'.csv',
    separator: ',',
  },
  draggableColumns: {
    enabled: false,
    transitionTime: 300,
  },
  textLabels: {
    body: {
      noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
      toolTip: "Sort",
      columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
    },
  },
  elevation: 3,
  rowsPerPage: rowsPerPage,
  onChangeRowsPerPage: onChangeRowsPerPage,
  rowsPerPageOptions: [10,20,50],
  selectToolbarPlacement:"none",
  tableBodyHeight: responseData ? '450px' : '200px'
};

  return (
    <div className="reports-root analysis-correlation">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MUIDataTable
            title={correlationReportStatus ? "Correlation Report for P_ID "+props.p_id+": Good Matches": "Correlation Report for P_ID "+props.p_id+": Bad Matches"}
            data={ loading ? [] : responseData }
            columns={columns}
            options={options}
          />
       </Grid> 
    </Grid> 
  </div>
  );
}

export default CorrelationSubTable;

