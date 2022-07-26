import { React, useEffect, useMemo, useState, useStyles, useCallback } from "react";
import { useAsyncDebounce } from "react-table";
import { Label, Input } from "reactstrap";
import Form from 'react-bootstrap/Form'
import { IconButton } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import Stack from 'react-bootstrap/Stack'
import { Chip, createStyles, makeStyles } from '@material-ui/core'

// Component for Global Filter
// export function GlobalFilter({ globalFilter, setGlobalFilter }) {
//   const [value, setValue] = useState(globalFilter);

//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <div>
//       <Label>Search Table: </Label>
//       <Input
//         value={value || ""}
//         onChange={(e) => {
//           setValue(e.target.value);
//           onChange(e.target.value);
     
//         }}
//         placeholder=" Enter value "
//         className="w-25"
//         style={{
//           fontSize: "1.1rem",
//           margin: "15px",
//           display: "inline",
//         }}
//       />
//     </div>
//   );
// }

export const DefaultFilterForColumn = ({
    column: { filterValue, preFilteredRows, setFilter }
   
  }) => {
    const [value , setValue] = useState('')
    useEffect(()=> {
        setValue(filterValue)
    },[])
    return (
   
    <Stack direction="horizontal">
    <div>
    <Form.Control size="sm" type="text"  placeholder={`Search in ${preFilteredRows.length} records`} value={value || "" }  onChange={(e) => setValue(e.target.value)} />
    </div>  
    <IconButton onClick={(e)=> setFilter(value)}>
        <SearchIcon />
    </IconButton>
  </Stack>
    );
  }

// Component for Custom Select Filter
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Use preFilteredRows to calculate the options
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // UI for Multi-Select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
const getFilterValue = (column, filterValue) => {
  switch (column.filter) {
    case 'between':
      const min = filterValue[0]
      const max = filterValue[1]
      return min ? (max ? `${min}-${max}` : `>=${min}`) : `<=${max}`
  }
  return filterValue
}




export function FilterChipBar ({instance}) {
  const classes = useStyles({})
  const {
    allColumns,
    setFilter,
    state: { filters },
  } = instance
  const handleDelete = useCallback(
    (id) => {
      setFilter(id , undefined)
    },
    [setFilter]
  )

  return Object.keys(filters).length > 0 ? (
    <div className={classes.chipZone}>
      <span className={classes.filtersActiveLabel}>Active filters:</span>
      {filters &&
        allColumns.map((column) => {
          const filter = filters.find((f) => f.id === column.id)
          const value = filter && filter.value
          return (
            value && (
              <Chip
                className={classes.filterChip}
                key={column.id}
                label={
                  <>
                    <span className={classes.chipLabel}>{column.render('Header')}: </span>
                    {getFilterValue(column, value)}
                  </>
                }
                onDelete={() => handleDelete(column.id)}
                variant='outlined'
              />
            )
          )
        })}
    </div>
  ) : null
}