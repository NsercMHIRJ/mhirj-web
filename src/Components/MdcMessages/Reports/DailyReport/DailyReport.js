import React from 'react';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {DateConverter} from '../../../Helper/Helper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems:"center",
    maxWidth: '92vw',
    margin:  '20px',
  },
}));

const getMuiTheme = () => createMuiTheme({
  palette: {type: 'light'},
  typography: {useNextVariants: true},
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        padding: '10px 8px',
      }
    },
    MUIDataTableHeadCell:{
      root: {
        whiteSpace:'nowrap',
      },
    },
  }
});

const DailyReport = (props) => {
  const columns = [
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
       filter: false,
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
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'totalOccurences', 
      label: 'Total Occurences',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'consecutiveDays', 
      label: 'Consecutive Days',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'ConsecutiveFlights', 
      label: 'Consecutive Flights',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'intermittent', 
      label: 'Intermittent',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'reasons', 
      label: 'Reasons For Flag',
      options: {
       filter: true,
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
     {
      name: 'input', 
      label: 'MHIRJ Input',
      options: {
       filter: false,
       sort: true,
       setCellProps: () => ({style: {minWidth:'400px'}})
      }
     },
    ];

    let data = [];
      props.data?.map((item => {
        data.push(
          {
            date: DateConverter(item["Date"]), 
            ACSN: item["AC SN"], 
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
            topMessage: item["Known Top Message - Recommended Documents"],  
            recommendation: item["MHIRJ ISE Recommendation"], 
            comments: item["Additional Comments"],  
            input: item["MHIRJ ISE Input"],  
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
      downloadOptions: {
        filename: 'Daily Report from ' + props.reportConditions.fromDate + ' to ' + props.reportConditions.toDate + '.csv',
        separator: ',',
      },
      //setRowProps for jam report enabled on daily report
      // setRowProps: (row, index) => {
      //   if (row[1] === "10291"){
      //     return {style: {background:'#FF7F50'}}
      //   }
      // },
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
      rowsPerPage: 10,
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
    };
  
const classes = useStyles();
const themes = getMuiTheme();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <MuiThemeProvider theme={themes}>
              <MUIDataTable
                title={props.title}
                data={data}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider> 
        </Grid> 
      </Grid> 
    </div>
  );
}
export default DailyReport;

