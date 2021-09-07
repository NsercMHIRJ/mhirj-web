import React, {useState} from 'react';
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
      name: 'consecutiveDays', 
      label: 'Consecutive Days',
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
      name: 'dateFrom', 
      label: 'Date From',
      options: {
       filter: true,
       filterType: 'dropdown',
       sort: true,
      }
     },
     {
      name: 'dateTo', 
      label: 'Date To',
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
      label: 'HONEY or No-Dispatch',
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
      name: 'isDarkOrange', 
      label: 'isDarkOrange',
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
      name: 'isDarkRed', 
      label: 'isDarkRed',
      options: {
       filter: false,
       sort: false,
       display: false,
      }
     },
     {
      name: 'isLightOrange', 
      label: 'isLightOrange',
      options: {
       filter: false,
       sort: false,
       display: false,
      }
     },
     {
      name: 'isLightRed', 
      label: 'isLightRed',
      options: {
       filter: false,
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
            mdcMessages: item["MDC Messagee"],  
            LRU: item["LRU"],  
            ATA: item["ATA"],  
            B1Equation: item["B1-Equation"],  
            type: item["Type"],   
            equationDescription: item["Equation Description"],   
            totalOccurences: item["Total Occurences"],  
            consecutiveDays: item["Consective Days"],
            ConsecutiveFlights: item["Consecutive FL"],  
            intermittent: item["Intermittent"],  
            reasons: item["Reason(s) for flag"],   
            priority: item["Priority"],   
            topMessage: item["Known Top Message - Recommended Documents"],  
            recommendation: item["MHIRJ ISE Recommendation"], 
            comments: item["Additional Comments"],  
            input: item["MHIRJ ISE Input"],  
            isJam: item["is_jam"],
            isDarkOrange: item["is_dark_orange"],
            isDarkRed: item["is_dark_red"],
            isLightOrange: item["is_light_orange"],
            isLightRed: item["is_light_red"],
            honey: "Not Available",
            dateFrom: "Not Available",
            dateTo: "Not Available",
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
        if (row[20] === true) {
          return {style: {background: '#ff4c00'}} // dark orange
        } else if (row[21] === true) {
          return {style: {background: '#ff0000'}} // dark red
        } else if (row[22] === true) {
          return {style: {background: '#ff7f50'}} //is jam
        } else if (row[23] === true) {
          return {style: {background: '#ffb89a'}} // light orange
        } else if (row[24] === true) {
          return {style: {background: '#ff9a9a'}} // light red
        }
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
      rowsPerPageOptions: [10,20,50],
      selectToolbarPlacement:"none",
      tableBodyHeight: props.loading === true || data.length === 0 ? '200px' : '650px'
    };
  

  return (
    <div class="reports-root">
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
  );
}
export default DeltaReport;

