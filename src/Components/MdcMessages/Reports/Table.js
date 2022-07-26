import  React, {useEffect, useState, useCallback, useRef } from "react";
import { useTable, useFilters, useGlobalFilter , usePagination, useSortBy, useExpanded, useRowSelect } from "react-table";
import { randomId } from "@mui/x-data-grid-generator";
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import '../../../scss/components/_reports.scss';
import '../../../scss/components/_analysis.scss';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@material-ui/core";
import Switch from "react-switch";
import { Button } from '@material-ui/core';
import CorrelationAnalysisTable from "../../Correlation/CorrelationAnalysisScreen/CorrelationAnalysisTable";
import Card from 'react-bootstrap/Card'
import * as XLSX from 'xlsx'
import { BsCloudDownloadFill } from "react-icons/bs";

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows && preGlobalFilteredRows.length;

  return (
    <span>
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          border: "0"
        }}
      />
    </span>
  );
};

  
const downloadExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};

export default function CustomTable({ columns, data, tableHeight, isLoading, correlationRowColor,
   title, fetchBadMatches, tableWidth, tableRight , tableTop }) {
    const [rowStatus, setRowStatus] = useState({})
    const [isCorrelation, setIsCorrelation] = useState(false)
    const [corrData, setCorrData] = useState({})
    const [showSearch , setShowSearch] = useState(false)
    
    const filterTypes = React.useMemo(
      () => ({
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        }
      }),
      []
    );
 
    const defaultColumn = React.useMemo(
      () => ({
        Filter: DefaultColumnFilter
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
      preGlobalFilteredRows,
      visibleColumns,
      setGlobalFilter
    }=useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
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

    const generateCorr = (row, cell) => {
      if (isCorrelation){
        if (row.original.ACSN && row.original.mdcMessages){
          setCorrData(row.values)
        }
      }
    }

    const handleSelectedRow = (row) => {
      let rowId = row.id
      var object = {}
      if (rowStatus[rowId]){
        let rowHeight = rowStatus[rowId]
        if(rowHeight === ""){
          object[rowId] = "p-3 mb-2 bg-info text-white"
          setRowStatus(object)
        }else {
          object[rowId] = ""
          setRowStatus(object)
        }
      }else{
        object[rowId] = "p-3 mb-2 bg-info text-white"
        setRowStatus(object)
      }
    } 
   
    const handleSearchOnClick = () => {
      if(showSearch){
        setShowSearch(false)
      }else {
        setShowSearch(true)
      }
    }

   const handleToggleChange = (checked) => {
    setIsCorrelation(checked);
  }

  return (
    <div>
      <div>
        <Card style={{right : tableRight ? tableRight : '' , top: tableTop ? tableTop : '', width:'75vw'}}>
          <Card.Header>
            <div>
              <Stack direction="horizontal" gap={3}>
                <h5 style={{position: 'relative', right: '8px'}}>
                  {title}
                </h5>
                <div style={{position:'relative' , left: title !== "Correlation" ? '65.5vw' : '64vw'}}>
                  <IconButton size={"large"} onClick={()=>downloadExcel(data)}>
                    <BsCloudDownloadFill fontSize={"medium"} />
                  </IconButton>
                </div>
                <div style={{position:'relative' , left: title !== "Correlation" ? '65.5vw' : '64vw'}}>
                  <IconButton size="large" onClick={()=>handleSearchOnClick()}>
                    <SearchIcon fontSize={"medium"} />
                  </IconButton>
                </div>
              </Stack>
            </div>
          </Card.Header>
          <Card.Body style={{padding: '0rem 0rem'}}>
            <div className="keep-scrolling" style={{height: tableHeight ? tableHeight : '86vh', width: tableWidth ? tableWidth:'',
              overflowY: 'scroll', overflowX: 'hidden'}}> 
              <Table responsive="sm" hover bordered {...getTableProps()}>
                {!isLoading && data.length > 0 &&
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()} id={randomId()} style={{
                        height: '25px'
                      }}>
                      {headerGroup.headers.map((column, i) =>  (
                        <th  key={column.id} id={column.id} style={{
                          background: column.id === "expander" || column.id === "selection"? '' : 'white',
                          position: column.id === "expander" || column.id === "selection" ? 'unset' : 'sticky',
                          top: 0,
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
                        ))
                      }
                      </tr>
                    ))}
                    <tr>
                      <th
                        colSpan={visibleColumns.length}
                        style={{
                          textAlign: "left"
                      }}>
                        {showSearch &&
                          <GlobalFilter
                          preGlobalFilteredRows={preGlobalFilteredRows}
                          globalFilter={state.globalFilter}
                          setGlobalFilter={setGlobalFilter}
                        />
                        }
                      </th>
                    </tr>
                  </thead>
                }
                {isLoading && 
                  <tbody>
                    <tr>
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
                    <tr>
                      <td style={{textAlign:'center', verticalAlign:'middle', width: '72vw' , display: 'block'}}>
                        <strong>Sorry we can't find data.</strong>
                        <br/>
                        {correlationRowColor && 
                          <Button  size={"small"} variant="contained" style={{width: '20%', color: 'white', backgroundColor: 'black'}} onClick={fetchBadMatches}>
                           See All PM
                          </Button>
                        }
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
                              height: row.isExpanded ? '0' : '25px',
                              backgroundColor: correlationRowColor ? '#E0CDFB' : ( row.original.background ? row.original.background : ''),
                          }} className={rowStatus[row.id]}  onClick={() => generateCorr(row)}>      
                            {row.cells.map((cell) => {
                              return <td id={randomId()} style={{
                                maxWidth: '100px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: !row.isExpanded ? 'nowrap' : '',
                                backgroundColor: cell.column.id === "totalOccurences" ? (row.original.Total_occurrences_color ? row.original.Total_occurrences_color : null ) : 
                                cell.column.id === "consecutiveDays" ? (row.original.Consecutive_days_color  ? row.original.Consecutive_days_color  : '' ) : 
                                cell.column.id === "ConsecutiveFlights" ? (row.original.Consecutive_FL_color  ? row.original.Consecutive_FL_color  : '' ) : 
                                cell.column.id === "intermittent" ? (row.original.Intermittent_color  ? row.original.Intermittent_color  : '' ) : ''
                              }}  
                              {...cell.getCellProps()} 
                              onClick={() => handleSelectedRow(row)
                              }>
                                {cell.render("Cell")}
                              </td>  
                              })
                            }
                          </tr>
                        </React.Fragment>                  
                      )})
                    }
                    <tr>
                      <td colSpan={visibleColumns.length} style={{
                            position: ' sticky',
                            bottom: 0,
                      }}>
                        {isCorrelation && 
                          <CorrelationAnalysisTable
                            dateFrom = {corrData.dateFrom}
                            dateTo = {corrData.dateTo}
                            tail = {corrData.tail}
                            EqID = {corrData.B1Equation}
                            correlationKeywords = {corrData.keywords}
                          />
                        }
                      </td>
                    </tr>
                  </tbody>
                }
              </Table>
            </div>
        
            {title !== "Correlation" &&
              <Stack direction="horizontal" gap={3}>
                <div style={{position: 'relative',top: '9px'}}>
                  <Pagination style={{height: '28px'}}>
                    <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                    <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
                    <Pagination.Next  onClick={() => nextPage()} disabled={!canNextPage}/>
                    <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
                    <Stack direction="horizontal" gap={3}>
                      <div className="bg-light border ms-auto">
                        Page{' '} {state.pageIndex + 1} of {pageOptions.length}
                      </div>
                      <div className="bg-light border">
                        <Form.Select
                          value={state.pageSize}
                          onChange={e => {
                              setPageSize(Number(e.target.value))
                          }}
                          style={{height: '23.5px'}}>
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
                <div style={{position: 'relative', left: '50vw'}}>
                  <Switch height={20} onChange={handleToggleChange} checked={isCorrelation} />
                </div>
              </Stack>
            }
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
