import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'; import Box from '@material-ui/core/Box';

// import Constants from './utils/const'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    margin: '20px auto 23px 20px',
    width: '92vw',
    color: "#001c3e"
  },
  container: {
    padding: '20px 40px',
  },
  h3: {
    margin: 'auto',
    textAlign: 'center',
    color: "#001c3e",
  },
  Grid: {
    paddingLeft: '200px',
    margin: 'auto',
  },
  card: {
    backgroundColor: "#C5D3E0",
    textAlign: 'center',
    justify: 'center',
    padding: '5px',
  },


  button: {
    margin: '30px auto',
    width: '60%',
    backgroundColor: "#001c3e",
    color: "White",
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  ProgressBar: {
    width: '320px'
  }
}));
export default function FileUpload() {
  const classes = useStyles();
  const [mdc_raw_file, setMDC_Raw_File] = useState({
    selectedFile: null
  });
  const [pm_file, setPM_File] = useState({
    selectedFile: null
  });

  function handleChange(e) {

    console.log(e.target.files)
    console.log(e.target.files[0]);
    let file = e.target.files[0]
    setMDC_Raw_File({
      selectedFile: file
    })


  }
  function handleChange_pmfile(e) {

    console.log(e.target.files)
    console.log(e.target.files[0]);
    let file = e.target.files[0]
    setPM_File({
      selectedFile: file
    })


  }

  function upload_MDC_data(e) {

    let file = mdc_raw_file.selectedFile
    let data = new FormData()
    data.append('file', file)

    axios({
      url: 'https://mhirjapi.azurewebsites.net/api/uploadfile_airline_mdc_raw_data/',
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: data
    }).then((res) => {
      alert("File Uploaded Successfully!", +res.data)
    })
      .catch(err => {
        console.log(err);
      })

  }

  function upload_InputMessage_data(e) {

    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = (e) => {

      alert("MDC File uploaded!")
    }
  }

  function upload_TopMessage_data(e) {

    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = (e) => {

      alert("MDC File uploaded!")
    }
  }

  function upload_PM_data(e) {
  let file = pm_file.selectedFile
  let data = new FormData()
  data.append('file', file)

  axios({
    url: 'https://mhirjapi.azurewebsites.net/api/upload_PM_file/',
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
    },
    data: data
  }).then((res) => {
    alert("PM File Upload Started - Please Refer Following Progress Bar ", +res.data)
  })
    .catch(err => {
      console.log(err);
    })

}

  // PM file upload Progress functions
  const [status, setstatus] = useState("status-0");
  const [statusmessage, setstatusmessage] = useState("");
  const [process, setprocess] = useState("");
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => {
    setShowResults(true)
    fetchStatus();
  }

  async function fetchStatus() {

    try {
      setInterval(async () => {
        return await axios.post('https://mhirjapi.azurewebsites.net/api/corelation_process_status').then(response => response.data).then(data => {
          const tempstatus = "" + data;
          setstatus(tempstatus);
          setstatusmessage(tempstatus.slice(tempstatus.indexOf('Status_Message":"'), tempstatus.indexOf('","Date')));
          setprocess(tempstatus.slice(tempstatus.indexOf('Process":"'), tempstatus.indexOf('","Status')));
          // console.log("process Message is " + process);
          // console.log("Status Message is " + statusmessage);
          return statusmessage
        })
      }, 1000);
    }
    catch (e) {
      console.log("error:" + e);
    }

  }

  //finish - progress functn


  const Progress0 = () => (
    <div><CircularProgress variant="determinate" value={0} /><br /><br /></div>)

  const Progress30 = () => (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ width: '80px', height: '80px', color: '#ffef62' }} variant="determinate" value={30} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" >
          <Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">30%</Typography>
        </Box>
      </Box>
      <h4>PM File Upload Started </h4>
    </div>
  )

  const Progress40 = () => (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ width: '80px', height: '80px', color: '#ffef62' }} variant="determinate" value={40} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">40%</Typography>
        </Box>
      </Box>

      <h4>PM File Upload Completed </h4>
    </div>
  )

  const Progress50 = () => (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ width: '80px', height: '80px', color: '#ff5722' }} variant="determinate" value={50} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">50%</Typography>
        </Box>
      </Box>

      <h4>ATA Mapping Started </h4>
    </div>
  )

  const Progress70 = () => (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={70} style={{ width: '80px', height: '80px', color: '#ff5722' }} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">70%</Typography>
        </Box>
      </Box>

      <h4>ATA Mapping Completed</h4><br /><br />
    </div>
  )

  const Progress80 = () => (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ width: '80px', height: '80px', color: '#ff5722' }} variant="determinate" value={80} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">80%</Typography>
        </Box>
      </Box>

      <h4> Correlate Started </h4>
    </div>
  )
  const Progress100 = () => (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress style={{ width: '80px', height: '80px', color: '#00e676' }} variant="determinate" value={100} />
        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">100%</Typography>
        </Box>
      </Box>

      <h4> Correlate Completed, File Uploaded Successfully !</h4>
    </div>
  )



  return (
    <div>
      <form className={classes.form}>
        <Paper className={classes.paper}>
          <div className={classes.card}>
            <h2>FILE UPLOADS</h2>
          </div>

          <div className={classes.container}>

            <Grid className={classes.Grid} container spacing={3}>


              <Grid item xs={5} style={{ marginLeft: '10px' }}>
                <div>
                  <h2>MDC FILE UPLOADS</h2>
                  <input className={classes.input}
                    name="file"
                    type="file"
                    onChange={(e) => handleChange(e)}

                  />
                  <Button type="button" className={classes.button} onClick={(e) => upload_MDC_data(e)}>
                    Upload MDC RAW Data
                  </Button>


                  <input className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => upload_InputMessage_data(e)}
                  />
                  <label htmlFor="contained-button-file" style={{ width: '70%' }}>
                    <Button id="upload" variant="contained" component="span" className={classes.button}>
                      Upload Input Message Data
                    </Button>
                  </label>

                  <input className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => upload_TopMessage_data(e)}

                  />
                  <label htmlFor="contained-button-file" style={{ width: '70%' }}>
                    <Button id="upload" variant="contained" component="span" className={classes.button}>
                      Upload Top Message Data
                    </Button>
                  </label>

                </div>
              </Grid>

              <Grid item xs={5} style={{ paddingLeft: '200px' }}>
                <div>
                  <h2>PM FILE UPLOADS</h2>
                  <input className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => handleChange_pmfile(e)}
                  />
                  <label htmlFor="contained-button-file" style={{ width: '100%' }}>
                    <Button id="upload" variant="contained" className={classes.button} onClick={upload_PM_data} >
                      Upload PM Data
                    </Button>
                  </label>
                </div>
                <div>
                  {/* <Button variant="contained" color="primary" disabled={statusmessage==='Status_Message":"Process Started'} onClick={fetchStatus}>Upload</Button><br/><br/><br/> */}
                  <Button variant="contained" className={classes.button} style={{ width: '250px' }} onClick={onClick}>PM File Upload Status</Button><br /><br />
                  {
                    statusmessage === 'Status_Message":"Process Started' && process === 'Process":"PM File Upload' ? <Progress30 /> :
                      statusmessage === 'Status_Message":"Process Completed' && process === 'Process":"PM File Upload' ? <Progress40 /> :
                        statusmessage === 'Status_Message":"started' && process === 'Process":"ATA Mapping' ? <Progress50 /> :
                          statusmessage === 'Status_Message":"completed' && process === 'Process":"ATA Mapping' ? <Progress70 /> :
                            statusmessage === 'Status_Message":"started' && process === 'Process":"Correlate' ? <Progress80 /> :
                              statusmessage === 'Status_Message":"completed' && process === 'Process":"Correlate' ? <Progress100 /> : <Progress0 />} </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </form>

    </div>

  );
}
