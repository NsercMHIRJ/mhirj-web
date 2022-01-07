import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import "../../../../scss/_main.scss";

const DeltaReport = (props) => {
  const [rowsSelectedState, setRowsSelected] = useState([]);

  const HandleMultipleRowSelect = (rowsSelectedData, allRows, rowsSelected) => {
    setRowsSelected(rowsSelected);
  };

  const columns = [
    {
      name: 'tail',
      label: 'Tail #',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '100px' } }),
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
        setCellProps: () => ({ style: { minWidth: '150px' } }),
      }
    },
    // {
    //   name: 'mdcMessages',
    //   label: 'MDC Messages',
    //   options: {
    //     filter: true,
    //     filterType: 'dropdown',
    //     sort: true,
    //     setCellProps: () => ({ style: { minWidth: '300px' } }),
    //   }
    // },
    {
      name: 'LRU',
      label: 'LRU',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '150px' } }),
      }
    },
    {
      name: 'ATA',
      label: 'ATA',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: 'B1Equation',
      label: 'B1 Equation',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '150px' } }),
      }
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '150px' } }),
      }
    },
    {
      name: 'equationDescription',
      label: 'Equation Description',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '250px' } }),
      }
    },
    {
      name: 'totalOccurences',
      label: 'Total Occurences',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: (row , index) => {
          if(data[index].Total_occurrences_color){
            return { style: { background: data[index].Total_occurrences_color, minWidth: '250px' } }
          }else{
            return { style: { minWidth: '250px' } }
          }
        },
      }
    },
    {
      name: 'consecutiveDays',
      label: 'Consecutive Days',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: (row , index) => {
          if(data[index].Consecutive_days_color){
            return { style: { background: data[index].Consecutive_days_color, minWidth: '250px' } }
          }else{
            return { style: { minWidth: '250px' } }
          }
        },
      }
    },
    {
      name: 'ConsecutiveFlights',
      label: 'Consecutive Flights',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: (row , index) => {
          if(data[index].Consecutive_FL_color){
            return { style: { background: data[index].Consecutive_FL_color, minWidth: '250px' } }
          }else{
            return { style: { minWidth: '250px' } }
          }
        },
      }
    },
    {
      name: 'intermittent',
      label: 'Intermittent',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: (row , index) => {
          if(data[index].Intermittent_color){
            return { style: { background: data[index].Intermittent_color, minWidth: '250px' } }
          }else{
            return { style: { minWidth: '250px' } }
          }
        },
      }
    },
    {
      name: 'dateFrom',
      label: 'Date From',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '120px' } }),
      }
    },
    {
      name: 'dateTo',
      label: 'Date To',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '120px' } }),
      }
    },
    {
      name: 'reasons',
      label: 'Reasons For Flag',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { minWidth: '250px' } }),
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
        setCellProps: () => ({ style: { minWidth: '300px' } })
      }
    },
    {
      name: 'honey',
      label: 'Mel or No-Dispatch',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '200px' } })
      }
    },
    {
      name: 'input',
      label: 'MHIRJ Input',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '400px' } })
      }
    },
    {
      name: 'recommendation',
      label: 'MHIRJ Recommended Action',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '400px' } })
      }
    },
    {
      name: 'comments',
      label: 'MHIRJ Additional Comment',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '400px' } })
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
  ];

  let data = [];
  props.data?.map((item => {
    data.push(
      {
        ACSN: item["AC SN"],
        tail: item["Tail#"],
        EICASMessages: item["EICAS Message"],
        // mdcMessages: item["MDC Message"],
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
        // honey: "",
        dateFrom: item["Date From"],
        dateTo: item["Date To"],
      }
    );
    return data;
  }
  ));

  const options = {
    selectableRows: 'multiple',
    selectableRowsOnClick: true,
    rowsSelected: rowsSelectedState,
    onRowSelectionChange: HandleMultipleRowSelect,
    filter: true,
    filterType: 'multiselect',
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: true,
    jumpToPage: true,
    resizableColumns: false,
    downloadOptions: {
      filename: 'Delta Report.csv',
      separator: ',',
    },
    setRowProps: (row, index) => {
      return { style: { background: data[index].background } }
    },
    draggableColumns: {
      enabled: false,
      transitionTime: 300,
    },
    textLabels: {
      body: {
        noMatch: props.loading ? 'Please wait, loading data ...' : "Sorry, there is no matching data to display"
      },
    },
    elevation: 4,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    selectToolbarPlacement: "none",
    tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
  };


  return (
    <div class="reports-root">
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
export default DeltaReport;

