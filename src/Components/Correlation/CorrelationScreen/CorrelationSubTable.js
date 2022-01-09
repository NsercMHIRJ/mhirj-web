import React, {useState,useEffect} from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Constants from '../../utils/const';

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

  const columns = [
  {
    name: 'aircraftno', 
    label: 'Aircraft Number',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap', minWidth: "90px"}})
    }
  },
  {
    name: 'tail', 
    label: 'Tail #',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'100px'}})
    }
  },
  {
    name: 'mdc_ata_main', 
    label: 'ATA Main',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'mdc_ata_sub', 
    label: 'ATA SUB',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'ata_description', 
    label: 'ATA Description',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'300px'}})
    }
  },
  {
    name: 'EQ_ID', 
    label: 'Equation ID',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'150px'}})
    }
  },
  {
    name: 'EQ_DESCRIPTION', 
    label: 'Equation Description',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'400px'}})
    }
  },
  {
    name: 'LRU', 
    label: 'LRU',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {whiteSpace:'nowrap'}})
    }
  },
  {
    name: 'MDC_MESSAGE', 
    label: 'MDC Message',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'300px'}})
    }
  },
  {
    name: 'CAS', 
    label: 'CAS',
    options: {
      filter: true,
      filterType: 'dropdown',
      sort: true,
      setCellProps: () => ({style: {minWidth:'200px'}})
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
        noMatch: loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display"
    },
  },
  elevation: 3,
  rowsPerPage: 20,
  rowsPerPageOptions: [20, 50],
  selectToolbarPlacement:"none",
};

  return (
    <div className={classes.root}>
      <MUIDataTable
        title={"Correlation Report for P_ID "+props.p_id+" from " + props.dateFrom + ' to ' + props.dateTo}
        data={responseData}
        columns={columns}
        options={options}
      />
  </div>
  );
}

export default CorrelationSubTable;

