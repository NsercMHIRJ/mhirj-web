import React, {useState} from 'react';
import moment from "moment";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MuiDatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MuiDatePicker
          views={["year", "month", "day"]}
          label={props.label}
          value={selectedDate}
          onChange={ (date) => handleDateChange (date) }
          disabled = { props.disabled ? true : false}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;