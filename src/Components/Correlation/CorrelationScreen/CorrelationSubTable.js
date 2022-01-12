import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Constants from '../../utils/const';
import Grid from '@material-ui/core/Grid';
import $ from 'jquery';
import '../../../scss/_main.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:'5px',
    margin:'auto',
    width:'100%',
  },
}));

const CorrelationSubTable = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ isDefault, setIsDefault ] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState('10');

  const AddCellClass = (index) => {
    let row = index + 1;
    $('.reports-root .MuiTableBody-root .MuiTableRow-root:nth-child('+row+') td div').toggleClass('isClicked');
  }

  const onChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
  };

  useEffect(()=>{
    const path = Constants.APIURL + 'corelation/' + props.p_id;

    axios.post(path).then(function (res){
      var data = JSON.parse(res.data);
      setData(data);    
      setLoading(false);
    }).catch(function (err){
      console.log(err);
      setLoading(false);
    });
  },[props.p_id])

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
    label: 'Tail #',
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
  {
    name: 'mdc_ata_sub', 
    label: 'ATA SUB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: columnStyle}),
      setCellHeaderProps: () => ({ style: headingStyle }),
    }
  },
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
        aircraftno: item["aircraftno"],
        tail: item["Aircraft_tail_No"],
        mdc_ata_main: item["ATA_Main"],
        mdc_ata_sub: item["ATA_Sub"],
        ata_description: item["ATA_Description"], 
        CAS: item["CAS"],
        EQ_ID: item["EQ_ID"],
        EQ_DESCRIPTION: item["EQ_DESCRIPTION"],   
        LRU: item["LRU"],  
        MDC_MESSAGE: item["MDC_MESSAGE"], 
      }
    );
    return responseData
  }));
  }

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
      noMatch: props.loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display",
      toolTip: "Sort",
      columnHeaderTooltip: column => column.secondaryLabel ? `Sort for ${column.secondaryLabel}` : "Sort"
    },
  },
  elevation: 3,
  rowsPerPage: rowsPerPage,
  onChangeRowsPerPage: onChangeRowsPerPage,
  rowsPerPageOptions: [10,20,50],
  selectToolbarPlacement:"none",
};

  return (
    <div className="reports-root">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MUIDataTable
            title={"Correlation Report for P_ID "+props.p_id+" from " + props.dateFrom + ' to ' + props.dateTo}
            data={responseData}
            columns={columns}
            options={options}
          />
       </Grid> 
    </Grid> 
  </div>
  );
}

export default CorrelationSubTable;

