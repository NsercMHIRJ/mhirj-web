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
  },
  {
    // Build our expander column
    id: "expander", // Make sure it has an ID
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? <IconButton  style={{height: '25px'}}>
                        <ArrowDropDownIcon/>
                    </IconButton>  : <IconButton  style={{height: '25px'}}>
                        <ArrowRightIcon/>
                    </IconButton>}
      </span>
    ),
    Cell: ({ row }) => (
    
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ?    <IconButton  style={{height: '25px'}}>
                        <ArrowDropDownIcon/>
                    </IconButton> :   <IconButton  style={{height: '25px'}}>
                        <ArrowRightIcon/>
                    </IconButton>}
      </span>
    )
  },
  {
    accessor: 'tail', 
    Header: 'Tail#',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'ACSN', 
    Header: 'ACSN',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'EICASMessages', 
    Header: 'EICAS Message',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'mdcMessages', 
    Header: 'MDC Message',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'LRU', 
    Header: 'LRU',
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
    accessor: 'B1Equation', 
    Header: 'B1-Equation',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'type', 
    Header: 'Type',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
  },
  {
    accessor: 'equationDescription', 
    Header: 'Equation Description',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,

   },
   {
    accessor: 'totalOccurences', 
    Header: 'Occ',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'consecutiveDays', 
    Header: 'Cons. Days',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'ConsecutiveFlights', 
    Header: 'Cons. Legs', 
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'intermittent', 
    Header: 'Int.', 
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'dateFrom', 
    Header: 'Date from',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'dateTo', 
    Header: 'Date to',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'reasons', 
    Header: 'Reason(s) for flag',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'priority', 
    Header: 'Priority',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'topMessage', 
    Header: 'Known Top Message',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'mel', 
    Header: 'MEL or No-Dispatch',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'input', 
    Header: 'MHIRJ Input',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'recommendation', 
    Header: 'MHIRJ Recommendation',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'comments', 
    Header: 'Additional Comments',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'isJam', 
    Header: 'Jam',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
   {
    accessor: 'keywords', 
    Header: 'Correlation Keywords',
    Cell: ({ cell: { value } }) => value || "-",
    canFilter: true,
   },
  ]

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

  const RenderRowSubComponent = (row) => {

      return (
      
        <CorrelationAnalysisTable
        dateFrom = {row.row.values.dataFrom}
        dateTo = {row.row.values.dateTo}
        tail = {row.row.values.tail}
        EqID = {row.row.values.B1Equation}
        correlationKeywords = {row.row.values.keywords} 
      />
      )
    }
  

class HistoryReport extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      let dataCopy = [];
      this.props.data?.map((item => {
        dataCopy.push(
          {
            ACSN: item["AC SN"],
            tail: item["AC_TN"], 
            EICASMessages: item["EICAS Message"],  
            mdcMessages: item["MDC Message"], 
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
            topMessage: item["Known Top Message - Recommended Documents"],  
            recommendation: item["MHIRJ Recommendation"], 
            comments: item["Additional Comments"], 
            input: item["MHIRJ Input"],  
            isJam: item["is_jam"], 
            mel: item["MEL or No-Dispatch"], 
            dateFrom: DateConverter(item["Date from"]), 
            dateTo: DateConverter(item["Date to"]), 
            keywords: item["Keywords"],
            id: randomId()
          }
        );
      }
      ));
      this.setState({data : dataCopy })
    }
  }

  renderTable() {
      return (
      <div>
      <CustomTable
      columns={columns}
      data={this.state.data}
      RenderRowSubComponent={RenderRowSubComponent}
      isLoading={this.props.loading}
      tableHeight={this.props.loading ? '25vh' : '85vh'}
      title={'History Table'}
      />
      </div>
      )
  }

  render() {
    return <>{this.renderTable()}</>;
  }

}
export default HistoryReport;