import  React, {useEffect, useState, useCallback } from "react";
import { useTable, useFilters, useGlobalFilter , usePagination, useSortBy, useExpanded, useRowSelect } from "react-table";
import { DefaultFilterForColumn } from "./Filter";
import FormCheck from 'react-bootstrap/FormCheck'
import { randomId } from "@mui/x-data-grid-generator";
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import '../../../scss/components/_reports.scss'


const handleRowHeightExpand = (event, row, cell) => {
    if (cell.column.id !== "expander"){
    var rowState = document.querySelectorAll(`tr[data-id='${row.original.id}']`)
    var rowtag = rowState[0]
    if(rowtag.style.height === '25px'){
        rowtag.style.height = '0px'
        rowtag.classList.add("bg-info");
        for (let cell of rowtag.children) {
            cell.style.whiteSpace = ''
            cell.style.color = 'white'
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


export default function CustomTable({ columns, data , RenderRowSubComponent, tableHeight, isLoading, correlationRowColor, title }) {

    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: ""
        }),
        []
      );
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




  return (
    <div>

     <div className="overflow-scroll" style={{height: tableHeight ? tableHeight : '85vh', width: '73vw'}}>
    <h2>
        {title}
    </h2>
     <Table striped bordered hover  size="md" {...getTableProps()}>
       <thead>
         {headerGroups.map((headerGroup) => (
           <tr {...headerGroup.getHeaderGroupProps()} id={randomId()} style={{
             height: '25px',
   
         }}>
             
             {headerGroup.headers.map((column) => (
                 
               <th key={randomId()} id={randomId()} style={{
                 background: column.id !== "expander" ? 'white' : '',
                 position: column.id !== "expander" ? 'sticky' : 'block',
                 top: 0, /* Don't forget this, required for the stickiness */
                 boxShadow: '0 2px 2px -1px rgba(0, 0, 0, 0.4)'
             }}>
                <div {...column.getHeaderProps(column.getSortByToggleProps())} style={{textAlign:'center', verticalAlign:'middle'}} >
                {column.render("Header")}
                 {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                 </div> 
                 {column.canFilter ? <DefaultFilterForColumn column={column}/> : null}
               </th>
               
             ))}
          
        
           </tr>
         ))}
          
       </thead>
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
            {data.length <= 0 && 
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
                backgroundColor: correlationRowColor ? '#E0CDFB' : '',
             }} className={`${row.isExpanded ? "p-3 mb-2 bg-warning" : "" }`} >
         
               {row.cells.map((cell) => {
                 return <td id={randomId()} style={{
                     maxWidth: '100px',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap',
 
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
