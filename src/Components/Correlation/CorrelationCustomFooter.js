import React, {useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MuiTablePagination from "@mui/material/TablePagination";
// import { withStyles } from "tss-react/mui";

const defaultToolbarStyles = {
  iconButton: {
  },
};

const CorrelationCustomFooter = (props) => {
  const { count, classes, textLabels } = props;
  const [page, setPage] = useState(props.page);
  const [rowsPerPage, setRowsPerPage] = useState('10');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const footerStyle = {
    display:'flex', 
    justifyContent: 'flex-end',
    padding: '0px 24px 0px 24px'
  };

  return (
    <>
     <TableFooter>
        <TableRow>
          <TableCell style={footerStyle} colSpan={1000}>
            <p className="footer-label">Back date: </p>
            <FormControl variant="standard" className="formControl">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                className="footer-select"
                value={props.backDate}
                onChange={props.handleCorrelationBackDateChange}
              >
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={45}>50</MenuItem>
              </Select>
            </FormControl>
          
            <MuiTablePagination
              component="div"
              count={count}
              page={page}
              labelRowsPerPage={textLabels.rowsPerPage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
              backIconButtonProps={{
                'aria-label': textLabels.previous,
              }}
              nextIconButtonProps={{
                'aria-label': props.textLabels.next,
              }}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10,20,50]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
}

export default withStyles(defaultToolbarStyles, { name: "CorrelationCustomFooter" })(CorrelationCustomFooter);
