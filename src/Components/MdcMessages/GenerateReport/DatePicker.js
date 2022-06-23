import React, {useState} from 'react';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



const DatePicker = (props) => {
  let todayDate = new Date();
 
  if (todayDate) {
    todayDate = moment(todayDate).format("MM/DD/YYYY")
  }
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const handleDateChange = (date) => {
    setSelectedDate(date); 
    const APIFormattedDate = moment(date).format("YYYY-MM-DD");
    props.handleDateFrom ? props.handleDateFrom(APIFormattedDate) : props.handleDateTo(APIFormattedDate);
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    //   <Stack spacing={3} >
    //     <MuiDatePicker
    //       views={["year", "month", "day"]}
    //       label={props.label}
    //       value={selectedDate}
    //       // className={classes.textField}
    //       onChange={ (date) => handleDateChange (date) }
    //       disabled = { props.disabled ? true : false}
    //       renderInput={(params) => <TextField  {...params} helperText={null} />}
    //     />
    //   </Stack>
    // </LocalizationProvider>
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
     <KeyboardDatePicker
     style={{width: '50%'}}
       disableToolbar
       variant="inline"
       format="MM/dd/yyyy"
       margin="normal"
       id="date-picker-inline"
       label={props.label}
       value={selectedDate}
       onChange={handleDateChange}
       KeyboardButtonProps={{
         'aria-label': 'change date',
       }}
     />
   </MuiPickersUtilsProvider>
  );
};

export default DatePicker;