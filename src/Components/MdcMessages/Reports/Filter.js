import { React, useEffect, useMemo, useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Label, Input } from "reactstrap";
import Form from 'react-bootstrap/Form'
import { IconButton } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import Stack from 'react-bootstrap/Stack'
// Component for Global Filter
export function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div>
      <Label>Search Table: </Label>
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
     
        }}
        placeholder=" Enter value "
        className="w-25"
        style={{
          fontSize: "1.1rem",
          margin: "15px",
          display: "inline",
        }}
      />
    </div>
  );
}

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
