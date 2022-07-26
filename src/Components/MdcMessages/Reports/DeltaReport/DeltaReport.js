import React, {useEffect, useMemo, useState, Component} from 'react';
import "../../../../scss/_main.scss";
import { DateConverter } from '../../../Helper/Helper';
import '../../../../../src/scss/components/_reports.scss'
import CustomTable from '../Table';
import { randomId } from '@mui/x-data-grid-generator';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, IconButton } from "@material-ui/core";
import CorrelationAnalysisTable from '../../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable';

const columns =  
[
  {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <div>
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      </div>
    ),
    Cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      </div>
    ),
    maxWidth: 30,
    minWidth: 30,
    width: 30, 
  },
  {
   id: "expander",
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
      <span  id='arrow-icon' {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? 
          <IconButton size={'small'} >
              <ArrowDropDownIcon fontSize={'small'}/>
          </IconButton>  : <IconButton size={'small'}>
              <ArrowRightIcon fontSize={'small'}/>
          </IconButton>
        }
      </span>
    ),
    Cell: ({ row }) => (
      <span id='arrow-icon' {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ?    
          <IconButton size={'small'}>
              <ArrowDropDownIcon fontSize={'small'}/>
          </IconButton> :   
          <IconButton size={'small'}>
              <ArrowRightIcon fontSize={'small'}/>
          </IconButton> 
        }
      </span>
    ),
    maxWidth: 30,
    minWidth: 30,
    width: 30,
  },
  {
    accessor: 'ACSN', 
    Header: 'ACSN',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60, 
  },
  {
    accessor: 'tail', 
    Header: 'Tail#',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'totalOccurences', 
    Header: 'Occ',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'consecutiveDays', 
    Header: 'Cons. Days',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'EICASMessages', 
    Header: 'EICAS Message',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'mdcMessages', 
    Header: 'MDC Message',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    isShow: false,
    maxWidth: 70,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'B1Equation', 
    Header: 'B1-Equation',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'ATA', 
    Header: 'ATA',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'dateFrom', 
    Header: 'Start Date',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'dateTo', 
    Header: 'End Date',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    minWidth: 50,
    width: 60,
  },
  {
    accessor: 'type', 
    Header: 'Type',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
    maxWidth: 70,
    isShow: false,
    minWidth: 50,
    width: 60,
  }]

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

 
  

class DeltaReport extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      corrData: {},
      isCorrelation: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      let dataCopy = [];
      this.props.data?.map((item => {
        dataCopy.push(
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
            keywords: item["Keywords"],
            id: randomId()
          }
        );
      }
      ));
      this.setState({data : dataCopy })
    }
  }
  generateCorr = (e, row) =>{
    if (!this.state.isCorrelation){
      this.setState({
        corrData: row.values,
        isCorrelation: true,
      })
    }else {
      this.setState({
        corrData: {},
      })
    }
   
  }

  CorrelationTable = () => {
 
      return (
       
        <CorrelationAnalysisTable
        dateFrom = {this.state.corrData.dateFrom}
        dateTo = {this.state.corrData.dateTo}
        tail = {this.state.corrData.tail}
        EqID = {this.state.corrData.B1Equation}
        correlationKeywords = {this.state.corrData.keywords} 
      />
 
      )
    }

  renderTable() {
      return (
      <div>
      <CustomTable
      columns={columns}
      data={this.state.data}
      isLoading={this.props.loading}
      tableHeight={this.props.loading ? '35vh' : '77.5vh'}
      title={'Delta Table'}
      generateCorr = {this.generateCorr}
      downloadExcel={this.downloadExcel}
      // RenderRowSubComponent={RenderRowSubComponent}
      isCorrelation = {this.state.isCorrelation}
      CorrelationTable = {this.CorrelationTable}
      />
      </div>
      )
    }

  render() {
    return <>{this.renderTable()}</>;
  }

}
export default DeltaReport;


