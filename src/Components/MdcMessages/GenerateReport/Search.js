import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';

const Search = (props) => {
    const [column, setColumn] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [operators, setOperators] = useState('contains');
    const [columnList, setColumnList] = useState([]);
    const operatorList = [
        'contains',
        'equal',
        'starts with',
        'ends with',
        'is empty',
        'is not empty',
        'is any of',
    ];
    const [ visibility, setVisibility ] = useState(true);
    const [ searchLoading, setSearchLoading ] = useState(false);

    useEffect(() => {
        let columnsCopy = [];
        props?.columns?.map( (item, index) => {
            if( index > 0 ) {
                columnsCopy.push(item.label);
            }
        });
        setColumnList(columnsCopy);
    }, [props.columns]);

    const handleSearch = () => {
        if (column && operators && searchValue ) {
            props.handleSearchChange(column, operators, searchValue);
        }
    }

    const handleClear = () => {
        setSearchValue("");
        props.handleSearchChange(columnList[0], "contains", "");
    }

    useEffect(()=> {
        if ( searchValue && operators && column) {
            setSearchLoading(true);
            handleSearch();
            const timer = setTimeout(() => {
                setSearchLoading(false);
                }, 2000);
                return () => clearTimeout(timer);       
        } else {
            setSearchLoading(false);
        }
    }, [searchValue])
    return (
        <>
            { visibility && 
                <div>
                    <Paper className="search-container" variant="outlined">
                        <Grid container spacing={1}> 
                            <Grid item xs={1} className="close-icon-container">
                                <CloseIcon className="search-icons" onClick={()=>handleClear()}/>
                                {/* <DoneIcon className="search-icons" onClick={()=>handleSearch()}/> */}
                            </Grid>
                            <Grid item xs={3}>   
                                <FormControl variant="outlined" className="form-control">
                                <InputLabel id="demo-simple-select-outlined-label">Columns</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={column}
                                        onChange={(event)=>setColumn(event.target.value)}
                                        label="Columns"
                                    >
                                    <MenuItem value="none"> </MenuItem>
                                    {columnList.map( item => 
                                        <MenuItem value={item} key={item}> {item} </MenuItem>
                                    )};
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="outlined" className="form-control">
                                    <InputLabel id="demo-simple-select-outlined-label">Operators</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={operators}
                                            onChange={(event)=>setOperators(event.target.value)}
                                            label="Operators"
                                        >
                                        <MenuItem value="none"> </MenuItem>
                                        {operatorList.map( item => 
                                            <MenuItem value={item} key={item}> {item} </MenuItem>
                                        )};
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>  
                                <TextField 
                                    id="outlined-basic" 
                                    variant="outlined"
                                    label="Value" 
                                    className="search-value-input"
                                    placeholder="Filter value"
                                    value={searchValue}
                                    onChange={(event)=>setSearchValue(event.target.value)}
                                />
                                { searchLoading &&
                                    <div className="search-spin">
                                        <CachedIcon/>           
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            }
        </>
    )
}

export default Search;