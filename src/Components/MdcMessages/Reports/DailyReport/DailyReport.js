import React, {useState} from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import {DateConverter} from '../../../Helper/Helper';
import "../../../../scss/_main.scss";

const DailyReport = (props) => {
  const [rowsSelectedState, setRowsSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState('10');

  const HandleSingleRowSelect = (rowsSelectedData, allRows, rowsSelected) => {
    if (rowsSelected.length !== 0 && data[rowsSelected].isJam === true) {
      setRowsSelected(rowsSelected);
      props.HandleSingleRowSelect(data[rowsSelected].ACSN);
    }
    else {
      setRowsSelected(rowsSelected);
    }
  };

  const onChangeRowsPerPage = (rowsPerPage) => {
    setRowsPerPage(rowsPerPage);
  };

  const columns = [
    {
      name: 'tail', 
      label: 'Tail #',
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
       setCellProps: () => ({style: {paddingLeft:'20px',minWidth:'150px'}}),
       setCellHeaderProps: () => ({style: {paddingLeft:'30px'}})
      }
    },
    {
      name: 'ACSN', 
      label: 'ACSN',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
    },
    {
      name: 'EICASMessages', 
      label: 'EICAS Related',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {minWidth:'150px'}}),
      }
    },
    {
      name: 'mdcMessages', 
      label: 'MDC Messages',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
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
      name: 'ATA', 
      label: 'ATA',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'B1Equation', 
      label: 'B1 Equation',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
       setCellProps: () => ({style: {whiteSpace:'nowrap'}})
      }
    },
    {
      name: 'type', 
      label: 'Type',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
    },
    {
      name: 'equationDescription', 
      label: 'Equation Description',
      options: {
       filter: false,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'totalOccurences', 
      label: 'Total Occurences',
      options: {
       filter: false,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'ConsecutiveFlights', 
      label: 'Consecutive Flights',
      options: {
       filter: false,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'intermittent', 
      label: 'Intermittent',
      options: {
       filter: false,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'reasons', 
      label: 'Reasons For Flag',
      options: {
       filter: false,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'priority', 
      label: 'Priority',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'topMessage', 
      label: 'MHIRJ Known Message',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'200px'}})
      }
     },
     {
      name: 'honey', 
      label: 'Mel or No-Dispatch',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'200px'}})
      }
     },
     {
      name: 'input', 
      label: 'MHIRJ Input',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'400px'}})
      }
     },
     {
      name: 'recommendation', 
      label: 'MHIRJ Recommended Action',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'400px'}})
      }
     },
     {
      name: 'comments', 
      label: 'MHIRJ Additional Comment',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'700px'}})
      }
     },
    ];

    let data = [];
      props.data?.map((item => {
        let input = item["MHIRJ ISE Input"] === '0' ? '' : item["MHIRJ ISE Input"];
        let recommendation = item["MHIRJ ISE Recommendation"] === '0' ? '' : item["MHIRJ ISE Recommendation"];
        let comments = item["Additional Comments"] === '0' ? '' : item["Additional Comments"];
        let topMessage = item["Known Top Message - Recommended Documents"] === '0' ? '' : item["Known Top Message - Recommended Documents"];

        data.push(
          {
            date: DateConverter(item["Date"]), 
            ACSN: item["AC SN"], 
            tail: item["Tail#"],
            EICASRelated: item["EICAS Message"], 
            mdcMessages: item["MDC Message"],  
            LRU: item["LRU"],  
            ATA: item["ATA"],  
            B1Equation: item["B1-Equation"],  
            type: item["Type"],   
            equationDescription: item["Equation Description"],   
            totalOccurences: item["Total Occurences"],  
            ConsecutiveFlights: item["Consecutive FL"],  
            intermittent: item["Intermittent"],  
            reasons: item["Reason(s) for flag"],   
            priority: item["Priority"],   
            topMessage: topMessage,  
            recommendation: recommendation, 
            comments: comments, 
            input: input,  
            honey: "",
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
      selectableRowsHideCheckboxes: true,
      selectableRows: 'single',
      selectableRowsOnClick: false,
      rowsSelected: rowsSelectedState,
      onRowSelectionChange: HandleSingleRowSelect,
      downloadOptions: {
        filename: 'Daily Report from ' + props.reportConditions.fromDate + ' to ' + props.reportConditions.toDate + '.csv',
        separator: ',',
      },
      draggableColumns: {
        enabled: false,
        transitionTime: 300,
      },
      textLabels: {
        body: {
            noMatch: props.loading ? ' Please wait, loading data ...' : "Sorry, there is no matching data to display"
        },
    },
      elevation: 4,
      rowsPerPage:  rowsPerPage,
      onChangeRowsPerPage: onChangeRowsPerPage,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '500px'
    };
  
  return (
    <div className="reports-root">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <MUIDataTable
            title={props.title}
            data={data}
            columns={columns}
            options={options}
          />
        </Grid> 
      </Grid> 
    </div>
  );
}
export default DailyReport;

