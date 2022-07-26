import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {DateConverter, DateConverterWithHour} from '../../Helper/Helper';
import Constants from '../../utils/const';
import "../../../scss/_main.scss";
import CustomTable from '../../MdcMessages/Reports/Table';
import { randomId } from '@mui/x-data-grid-generator';

const columns =  
[
  {
    accessor: 'ATA', 
    Header: 'ATA',
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
          pm_date: DateConverterWithHour(item["PM_Resolved_Date"]) === "1900-01-01 00:00:00" ? "Open" : DateConverterWithHour(item["PM_Resolved_Date"]), //ok
          id: randomId()
        }
      );
    }));
    return responseData
  }

const CorrelationAnalysisTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const correlationReportStatus = true
  const [openCorrelationModal, setOpenCorrelationModal] = useState(false);
  const [backDate, setBackDate] = useState(7);

  const toggleKeyword = (event) => {
    setOpenCorrelationModal(!openCorrelationModal);
  }

  useEffect(() => {
    
    if ( props.dateFrom !== undefined  && props.dateTo !== undefined && props.EqID !== '' && props.tail !== '') {
      setLoading(true)
      setData([])
      let status = correlationReportStatus ? 3 : 1;

      let path = Constants.APIURL + 'corelation_tail/' + props.dateFrom + '/' + props.dateTo + '/' + props.EqID + '/' + props.tail + '/' + status;

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
  },[props.EqID]);

 
  const fetchBadMatches = () => {

    if ( props.dateFrom !== undefined  && props.dateTo !== undefined && props.EqID !== '' && props.tail !== '') {
      setLoading(true)
      let status =  1;
  
      let path = Constants.APIURL + 'corelation_tail/' + props.dateFrom + '/' + props.dateTo + '/' + props.EqID + '/' + props.tail + '/' + status;
  
      if ( backDate !== 7 && backDate !== "" ) {
        path = path + '?days=' + backDate;
      }
  
      axios.post(path).then(function (res) {
        var data = JSON.parse(res.data);
        setData(manubilateData(data));
        setLoading(false);
        console.log(data)
      }).catch(function (err){
        console.log(err);
        setLoading(false);
      })
    } 
  }

  return (
    <>
      <CustomTable 
      data={data}
      columns={columns}
      tableHeight={'33vh'}
      tableWidth={'74.5vw'}
      isLoading={loading}
      fetchBadMatches={fetchBadMatches}
      correlationRowColor={true}
      title={'Correlation Table'}
      tableRight={'7px'}
      tableTop={'7px'}
    />
    </>
);}

export default CorrelationAnalysisTable;

