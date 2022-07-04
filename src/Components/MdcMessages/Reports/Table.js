import  React, {useEffect, useState, useCallback, useRef } from "react";
import { useTable, useFilters, useGlobalFilter , usePagination, useSortBy, useExpanded, useRowSelect } from "react-table";
import { DefaultFilterForColumn } from "./Filter";
import FormCheck from 'react-bootstrap/FormCheck'
import { randomId } from "@mui/x-data-grid-generator";
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import '../../../scss/components/_reports.scss'
import { FiMoreVertical } from "react-icons/fi";
import { Button } from "reactstrap";
import { width } from "@mui/material/node_modules/@mui/system";
import { IconButton } from "@material-ui/core";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import Collapse from 'react-bootstrap/Collapse'
import { createState, StateFragment } from '@hookstate/core';

const handleRowHeightExpand = (event, row, cell) => {
    if (cell.column.id !== "expander" && cell.column.id !== "selection"){
    var rowState = document.querySelectorAll(`tr[data-id='${row.original.id}']`)
    var rowtag = rowState[0]
    if(rowtag.style.height === '25px'){
        rowtag.style.height = '0px'
        rowtag.classList.add("bg-info");
        for (let cell of rowtag.children) {
            cell.style.whiteSpace = ''
            cell.style.color = 'black'
        }
    }else{
        rowtag.style.height = '25px' 
        rowtag.classList.remove("bg-info");
        for (let cell of rowtag.children) {
            cell.style.whiteSpace = 'nowrap'
            cell.style.color = 'black'
        }
        }
    }
}   

const handleMoreIconClick = (column) => {
  column.isShow = !column.isShow
}

export default function CustomTable({ columns, data , RenderRowSubComponent, tableHeight, isLoading, correlationRowColor, title }) {

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

    const [show , setShow] = useState(false)
    const [display , setDisplay] = useState({})

  return (
    <div>

     <div className="overflow-scroll" style={{height: tableHeight ? tableHeight : '85vh', width: '73vw'}}>
    <h2>
        {title}
    </h2>
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
                    <h5><strong>{column.render("Header")}</strong></h5>
                     {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </div>  
                {column.id === "expander" || column.id === "selection" ?
                    <div></div>
                    :
                    <div>
                    <IconButton 
                        size= 'medium'
                        id={`${column.id}`}
                        style={{
                          right: '0'
                        }}
                        onClick={()=> {
                          setDisplay({
                            id: column.id,
                            show: !!!column.isShow
                          })
                        }}
                       >
                      <FiMoreVertical id={`${column.id}`}/> 
                      </IconButton > 
                      {/* <DefaultFilterForColumn column={column}/> */}
                       <Collapse in={display[column.id]} >
                         <div>
                          
                          </div>
                     </Collapse>
              
                             
                      
              
                      </div>
                      
                  }
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
                </td>
                </tr>
                </tbody>

        }
       {!isLoading && data &&
       <tbody {...getTableBodyProps()}>
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
