import  React, {useEffect, useState, useCallback, useRef } from "react";
import { useTable, useFilters, useGlobalFilter , usePagination, useSortBy, useExpanded, useRowSelect } from "react-table";
import { randomId } from "@mui/x-data-grid-generator";
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import '../../../scss/components/_reports.scss'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@material-ui/core";
import { DefaultFilterForColumn, FilterChipBar, GlobalFilter, SelectColumnFilter } from "./Filter";
import { Input } from "reactstrap";
import { Button } from '@material-ui/core';
import CorrelationAnalysisTable from "../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable";
import axios from "axios";
const handleRowHeightExpand = (event, row, cell) => {
    if (cell.column.id !== "expander" && cell.column.id !== "selection"){
    var rowState = document.querySelectorAll(`tr[data-id='${row.original.id}']`)
    var rowtag = rowState[0]
    if(rowtag.style.height === '25px'){
        rowtag.style.height = '0px'
        rowtag.classList.add("text-white")
        rowtag.classList.add("bg-info");
    
        for (let cell of rowtag.children) {
            cell.style.whiteSpace = ''
            cell.style.color = 'black'
        }
    }else{
        rowtag.style.height = '25px' 
        rowtag.classList.remove("bg-info");
        rowtag.classList.remove("text-white");
        for (let cell of rowtag.children) {
            cell.style.whiteSpace = 'nowrap'
            cell.style.color = 'black'
        }
        }
    }
}   







export default function CustomTable({ columns, data , RenderRowSubComponent, tableHeight, isLoading, correlationRowColor, title ,toggle, fetchBadMatches }) {

 
    const defaultColumn = {
          // Let's set up our default Filter UI
          Filter: ""
        }
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        prepareRow,
        visibleColumns,
        // state: { expanded }
    } = useTable(
        {
        columns,
        data,
        defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect
    );
    useEffect(()=> {
        setPageSize(50)
    },[])
    const [showSearch , setShowSearch] = useState(false)
    const handleSearchOnClick = () => {
      if(showSearch){
        setShowSearch(false)
      }else {
        setShowSearch(true)
      }
       
    }
    const [columnss ,setColumnss] = useState([])

  return (
    <div>
      
     <div className="overflow-scroll" style={{height: tableHeight ? tableHeight : '85vh', width: '75vw'}}>
       <div>
      <Stack direction="horizontal">
      <h2>
        {title}
        </h2>
        <IconButton style={{position: 'relative', left: '61vw'}} size= 'small' onClick={handleSearchOnClick}>
               <SearchIcon fontSize='large'/>
              </IconButton>
   </Stack>
    </div>
     <Table responsive="sm" hover bordered {...getTableProps()}>
     {!isLoading && data.length > 0 &&
       <thead>
    
         {headerGroups.map((headerGroup) => (
          
           <tr {...headerGroup.getHeaderGroupProps()} id={randomId()} style={{
             height: '25px',
   
         }}>
       
             {headerGroup.headers.map((column, i) =>  (
                 
               <th  key={column.id} id={column.id} style={{
                 background: column.id === "expander" || column.id === "selection"? '' : 'white',
                 position: column.id === "expander" || column.id === "selection" ? 'block' : ' sticky',
                 top: 0, /* Don't forget this, required for the stickiness */
                 boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.4)',
                 whiteSpace: "nowrap",
                 minWidth: column.minWidth,
                width: column.width
             }} className="aligner">
        
        <Stack direction="horizontal" gap={3}>
                    <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <h6><strong>{column.render("Header")}</strong></h6>
                     {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </div>  
                  </Stack>
                
               </th>
               
             ))}

             
           </tr>
         ))}
     
          
       </thead>
}
        {isLoading && 
            <tbody>
                <tr >
                <td style={{textAlign:'center', verticalAlign:'middle', width: '72vw' , display: 'block'}}>
                <div className="linear-activity" >
            
                <div className="indeterminate"></div>
              
                </div>
                Please wait while retrive the data...
                </td>
                </tr>
                </tbody>

        }
            {data.length <= 0 && !isLoading &&
            <tbody>
                <tr >
                <td style={{textAlign:'center', verticalAlign:'middle', width: '72vw' , display: 'block'}}>
                <strong>Sorry we can't find data.</strong>
                <br/>
                {correlationRowColor && 
                    <Button size="lg" variant="outline-secondary" style={{width: '49%'}} onClick={fetchBadMatches}>
                  See All PM</Button>
                }
                </td>
                </tr>
                </tbody>

        }
       {!isLoading && data &&
       <tbody {...getTableBodyProps()}>
         {showSearch && 
          <tr>
              <th>
        
              <Stack direction='horizontal' gap={3}>
                <select>
                {headerGroups.map((headerGroup) => (
                  <>
                {headerGroup.headers.map((column, i) => {
               
                return (
                  
                  <>
                  {column.id === "expander" || column.id === "selection" ? 
                    <option style={{display: 'none'}}  key={column.id}></option>
                    :
                    <option onClick={() => setColumnss([column])} key={column.id}> {column.Header} </option>
                    
                  }
                  
                  </>
                  )})}
                  </>
                  ))}
                </select>
              
                  
                </Stack>
              </th>
          
          
            </tr>
           
          
         }
         {page.map((row, index) => {
           prepareRow(row);
           return (
             <React.Fragment   key={index}>
               
             <tr {...row.getRowProps()} data-id={row.original.id} style={{
                 height: 25,
                backgroundColor: correlationRowColor ? '#E0CDFB' : ( row.original.background ? row.original.background : ''),

             }} className={`${row.isExpanded ? "p-3 mb-2 bg-warning" : "" }`} >
         
               {row.cells.map((cell) => {
                 return <td id={randomId()} style={{
                     maxWidth: '100px',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap',
                     backgroundColor: cell.column.id === "totalOccurences" ? (row.original.Total_occurrences_color ? row.original.Total_occurrences_color : null ) : 
                     cell.column.id === "consecutiveDays" ? (row.original.Consecutive_days_color  ? row.original.Consecutive_days_color  : '' ) : 
                     cell.column.id === "ConsecutiveFlights" ? (row.original.Consecutive_FL_color  ? row.original.Consecutive_FL_color  : '' ) : 
                     cell.column.id === "intermittent" ? (row.original.Intermittent_color  ? row.original.Intermittent_color  : '' ) : ''
                 }}  {...cell.getCellProps()} 
                     onClick={(e) => handleRowHeightExpand(e, row, cell)
                     }>{cell.render("Cell")}</td>  
               })}
             </tr>
             {row.isExpanded ? (
                 <tr>
                   <td colSpan={visibleColumns.length}>
                   <RenderRowSubComponent row={row}/>
                   </td>
                 </tr>
               ) : null}
             </React.Fragment>
           );
         })}
       </tbody>
        }
     </Table>
 
     </div>
    

    <Pagination>
    <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
        <Pagination.Next  onClick={() => nextPage()} disabled={!canNextPage}/>
        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
        <Stack direction="horizontal" gap={3}>
       {/* <div className="bg-light border">  */}
 
        {/* </div> */}
       <div className="bg-light border ms-auto">Page{' '} {state.pageIndex + 1} of {pageOptions.length}</div>
       <div className="bg-light border">
           
             <Form.Select
             value={state.pageSize}
             onChange={e => {
                 setPageSize(Number(e.target.value))
             }}
             >
             {[20, 50, 100].map(pageSize => (
                 <option key={pageSize} value={pageSize}>
                 Show {pageSize}
                 </option>
             ))}
             </Form.Select>
            </div>
     </Stack>
    </Pagination>
   </div>
   
  );
}
