import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Constants from './utils/const';
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';


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
    width: '70%',
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
	const [updateData, setupdateData] = useState([]);
	const [pm_file, setPM_File] = useState({
		selectedFile: null
	});

  const getMuiTheme = () => createMuiTheme({
    palette: {type: 'light'},
    typography: {useNextVariants: true},
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          padding: '10px 8px',
        }
      },
      MUIDataTableHeadCell:{
        root: {
          whiteSpace:'nowrap',
        },
      },
    }
  });
  const [data_update, setData_update] = useState({
    Equation_ID: "",
    EICAS: "",
    Priority_: "",
    MHIRJ_ISE_inputs: "",
    MHIRJ_ISE_Recommended_Action: "",
    Additional_Comments: "",
    MEL_or_No_Dispatch: ""
  });
 

  const [mdc_raw_file, setMDC_Raw_File] = useState({
    selectedFile: null
  });

  const [topMessage_file, setTopMessage_File] = useState({
    selectedTopMessageFile: null
  });

  const [input_Message_file, setInput_Message_File] = useState({
    selectedInputFile: null
  });

  const columns = [

    {
      name: 'LRU',
      label: 'LRU',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'ATA',
      label: 'ATA',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Message_NO',
      label: 'Message_NO',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Comp_ID',
      label: 'Comp_ID',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Message',
      label: 'Message',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,

      }
    },
    {
      name: 'Fault_Logged',
      label: 'Fault_Logged',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: 'Status',
      label: 'Status',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
        setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
      }
    },
    {
      name: 'Message_Type',
      label: 'Message_Type',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'EICAS',
      label: 'EICAS',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Timer',
      label: 'Timer',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Logic',
      label: 'Logic',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Equation_Description',
      label: ' Equation_Description',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Equation_ID',
      label: 'Equation_ID',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Occurrence_Flag',
      label: 'Occurrence_Flag',
      options: {
        filter: false,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Days_Count',
      label: 'Days_Count',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: true,
      }
    },
    {
      name: 'Priority_',
      label: ' Priority_',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '200px' } })
      }
    },
    {
      name: 'MHIRJ_ISE_Recommended_Action',
      label: 'MHIRJ Recommended Action',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '400px' } })
      }
    },
    {
      name: 'Additional_Comments',
      label: 'MHIRJ Additional Comment',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '700px' } })
      }
    },
    {
      name: 'MHIRJ_ISE_inputs',
      label: 'MHIRJ Input',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({ style: { minWidth: '400px' } })
      }
    },
    {
      name: 'MEL_or_No_Dispatch',
      label: 'MEL_or_No_Dispatch',
      options: {
        filter: true,
        filterType: 'dropdown',
        sort: false,

      }
    },
  ];

  const options = {
    filter: true,
    filterType: 'multiselect',
    responsive: "standard",
    fixedHeader: true,
    fixedSelectColumn: true,
    jumpToPage: true,
    resizableColumns: false,
    selectableRowsHideCheckboxes: true,
    
    setRowProps: (row, index) => {
      if (row[20] === true){
        return {style: {background:'#FF7F50'}}
      }
    },
    draggableColumns: {
      enabled: false,
      transitionTime: 300,
    },
   
    elevation: 4,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,20,50],
    selectToolbarPlacement:"none",
    
  };

 

  function update_data(e) {
    e.preventDefault();
    let Equation_ID = [];
    let EICAS = [];
    let Priority_ = [];
    let MHIRJ_ISE_inputs = [];
    let MHIRJ_ISE_Recommended_Action = [];
    let Additional_Comments = [];
    let MEL_or_No_Dispatch = [];

    const path = Constants.APIURL + 'update_input_message_data/' + data_update.Equation_ID + '/' + data_update.EICAS + '/' + data_update.Priority_ + '/' + data_update.MHIRJ_ISE_inputs + '/' + data_update.MHIRJ_ISE_Recommended_Action + '/' + data_update.Additional_Comments + '/' + data_update.MEL_or_No_Dispatch;
    console.log(path)
    axios.post(path)
      .then(res => {
        //console.log(res,"response");
        for (const dataObj of JSON.parse(res.data)) {
          Equation_ID.push(dataObj.Equation_ID);
          EICAS.push(dataObj.EICAS);
          Priority_.push(dataObj.Priority_);
          MHIRJ_ISE_inputs.push(dataObj.MHIRJ_ISE_inputs);
          MHIRJ_ISE_Recommended_Action.push(dataObj.MHIRJ_ISE_Recommended_Action);
          Additional_Comments.push(dataObj.Additional_Comments);
          MEL_or_No_Dispatch.push(dataObj.MEL_or_No_Dispatch);
        }
        
      })
      .catch(err => {
        //console.log(err);
      });
    
  }
  
  function show_inputMessage_data(e){
  
    
    const path1 = Constants.APIURL + 'list_mdc_messages_input/' +data_update.Equation_ID;
    console.log(path1)
    axios.post(path1)
      .then(res => {
         const data = JSON.parse (res.data);
         setupdateData(data) 
        }
        
      )
  }
  function handle_update(e) {
    const newdata = { ...data_update }
    newdata[e.target.id] = e.target.value
    setData_update(newdata)
    //console.log(newdata)
  }

  function handleChange(e) {
    console.log(e.target.files)
    console.log(e.target.files[0]);
    let file = e.target.files[0]
    setMDC_Raw_File({
      selectedFile: file
    })
  }

  function handleInputFileChange(e) {
    console.log(e.target.files)
    console.log(e.target.files[0]);
    let input_message_file = e.target.files[0]
    setInput_Message_File({
      selectedInputFile: input_message_file
    })
  }

  function handleTopMessageChange(e) {
    console.log(e.target.files)
    console.log(e.target.files[0]);
    let top_message_file = e.target.files[0]
    setTopMessage_File({
      selectedTopMessageFile: top_message_file
    })
  }

  const [fileUploadInProgress , setfileUploadInProgress] = useState(false);
  const [progress, setProgress] = React.useState({
    status:"",
  });
  const onClickMDC = (e) => {
    mdcStatus(e);
    upload_MDC_data(e);
    
  }
  
  let abortController = new AbortController();
  const {signal} = abortController;
  
  function mdcStatus(e) {
    try {
      
      setfileUploadInProgress(true)
      setInterval(async () => {
        return await axios.get('https://mhirjapi.azurewebsites.net/api/getMDCFileUploadStatus',{
          signal: abortController.signal,
        })
        .then(response => {
          // setfileUploadInProgress(false);
          console.log(response.data.percentage)
          setProgress(response.data.percentage); 
        })
      }, 1000);
    }
    catch (e) {
      if (!signal?.aborted) {
        console.error(e);
        setfileUploadInProgress(false);
        
      }
     
    } 
    return () => abortController?.abort();
  }
 

  function upload_MDC_data(e) {
   
    let file = mdc_raw_file.selectedFile
    let data = new FormData()
    data.append('file', file)
    axios({
      url:  Constants.APIURL + 'uploadfile_airline_mdc_raw_data/',
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: data
    }).then((res) => {
      alert("File Uploaded Successfully!", +res.data)
      setfileUploadInProgress(false);
      abortController.abort();
      
    })
      .catch(err => {
		// setfileUploadInProgress(false); 
        console.log(err);
      })
  }

  function upload_InputMessage_data(e) {
    let file = input_Message_file.selectedInputFile
    let data = new FormData()
    data.append('file', file)
    axios({
      url:  Constants.APIURL + 'uploadfile_input_message_data/',
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: data
    }).then((res) => {
      alert("File Uploaded Successfully!")
    })
      .catch(err => {
        console.log(err);
      })
  }

  function upload_TopMessage_data(e) {
    let file = topMessage_file.selectedTopMessageFile
    let data = new FormData()
    data.append('file', file)
    axios({
      url:  Constants.APIURL + 'uploadfile_top_message_data/',
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: data
    }).then((res) => {
      alert("File Uploaded Successfully!")
    })
      .catch(err => {
        console.log(err);
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
	const [pmdate, setpmdate] = useState("");
	const [errordate, seterrordate] = useState("");
	const [disable, setDisable] = React.useState(true);

	const [showResults, setShowResults] = React.useState(false)
	const onClick_PM_Upload_Status = () => {
		setShowResults(true)
		fetchStatus();
	}

	async function fetchStatus() {

		try {
			setInterval(async () => {
				return await axios.post('https://mhirjapi.azurewebsites.net/api/corelation_process_status').then(response => response.data).then(data => {
					const tempstatus = "" + data;
					setstatus(tempstatus);

					//extracting only latest status of correlate completed
					const latest_correlate_status = tempstatus.slice(tempstatus.indexOf('Process":"Correlate","Status":3,"Status_Message":"completed","Date":'));

					//extracted correlate completed DATE
					const latest_correlate_status_date = latest_correlate_status.slice(latest_correlate_status.indexOf('Date'), latest_correlate_status.indexOf('}')).slice(6)

					//setting date to display Latest completed PM Upload Time
					setpmdate(latest_correlate_status_date);

					//extracting only error status of correlate failure
					const latest_PMupload_error_status = tempstatus.slice(tempstatus.indexOf('"Status":4,"Status_Message":"error"'));

					//extracted correlate completed DATE
					const latest_PMupload_error_date = latest_PMupload_error_status.slice(latest_PMupload_error_status.indexOf('Date'), latest_PMupload_error_status.indexOf('}')).slice(6)


					//setting date to display Latest completed PM Upload Time
					seterrordate(latest_PMupload_error_date);

					//setting status and status message and
					setstatusmessage(tempstatus.slice(tempstatus.indexOf('Status_Message":"'), tempstatus.indexOf('","Date'))); //Extract pm upload status msg
					setprocess(tempstatus.slice(tempstatus.indexOf('Process":"'), tempstatus.indexOf('","Status')));//Extract pm upload process 

					return { statusmessage };

				})
			}, 1000);
		}
		catch (e) {
			console.log("error:" + e);
		}

	}


	const pmuploadDate = (timestamp) => {
		let date = new Date(parseFloat(timestamp));
		let datetime = (date.getDate() + "/" + (date.getMonth() + 1) + '/' + date.getFullYear() + ' | ' + ' Time- ' + date.getHours() + ':' + date.getMinutes() + ' hrs  (EST)');
		//console.log(datetime)
		return datetime;
	}

	const pm_error_Date = (errortimestamp) => {
		let date = new Date(parseFloat(errortimestamp));
		let errordatetime = (date.getDate() + "/" + (date.getMonth() + 1) + '/' + date.getFullYear() + ' | ' + ' Time- ' + date.getHours() + ':' + date.getMinutes() + ' hrs  (EST)');
		//console.log(datetime)
		return errordatetime;
	}

	//finish - progress functn
	const SuccessLastUploadStatus = () => (
		<div>
			<Alert style={{ margin: 'auto' }} severity="success">
				<AlertTitle>Success</AlertTitle>
				PM File upload succeesfully completed ! — <strong>{pmuploadDate(pmdate)}</strong>
			</Alert><br />
		</div>)

	const LastUploadStatus = () => (
		<div>
			<Alert severity="info">
				<AlertTitle>Info</AlertTitle>
				Previous succeesful PM file upload occured on — <strong>{pmuploadDate(pmdate)}</strong>
			</Alert><br />
		</div>)


	const ErrorStatus = () => (
		<div>
			<Alert severity="error">
				<AlertTitle>Error - {(process).slice(10)} Process </AlertTitle>
				Error occured for current PM file upload on <strong>{pm_error_Date(errordate)}</strong>
			</Alert><br />
		</div>)



	const NoProgress = () => (
		<div> </div>)


	const Progress0 = () => (
		<div>
			<ErrorStatus />
			<LastUploadStatus />
		</div>
	)

	const Progress30 = () => (
		<div>
			<Box style={{ flexWrap: 'wrap', alignItems: 'center', textAlign: 'center' }} position="relative" alignItems="center" justifyContent="center">
				<CircularProgress style={{ width: '80px', height: '80px', color: '#ffef62' }} variant="determinate" value={30} />
				<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center" >
					<Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">30%</Typography>
				</Box>
			</Box>
			<h3 style={{ textAlign: 'center' }}>PM File Upload Started... </h3>
			<LastUploadStatus />
		</div>
	)

	const Progress40 = () => (
		<div>
			<Box style={{ flexWrap: 'wrap', alignItems: 'center', textAlign: 'center' }} position="relative" alignItems="center" justifyContent="center">
				<CircularProgress style={{ width: '80px', height: '80px', color: '#ffef62' }} variant="determinate" value={40} />
				<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
					<Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">40%</Typography>
				</Box>
			</Box>

			<h3 style={{ textAlign: 'center' }}>PM File Upload Completed </h3>
			<LastUploadStatus />
		</div>
	)

	const Progress50 = () => (
		<div>
			<Box style={{ flexWrap: 'wrap', alignItems: 'center', textAlign: 'center' }} position="relative" alignItems="center" justifyContent="center">
				<CircularProgress style={{ width: '80px', height: '80px', color: '#ff5722' }} variant="determinate" value={50} />
				<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
					<Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">50%</Typography>
				</Box>
			</Box>

			<h3 style={{ textAlign: 'center' }}>ATA Mapping Started... </h3>
			<LastUploadStatus />
		</div>
	)

	const Progress70 = () => (
		<div>
			<Box style={{ flexWrap: 'wrap', alignItems: 'center', textAlign: 'center' }} position="relative" alignItems="center" justifyContent="center">
				<CircularProgress variant="determinate" value={70} style={{ width: '80px', height: '80px', color: '#ff5722' }} />
				<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
					<Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">70%</Typography>
				</Box>
			</Box>

			<h3 style={{ textAlign: 'center' }}>ATA Mapping Completed</h3>
			<LastUploadStatus />
		</div>
	)
	const Progress90 = () => (

		<div>
			<Box style={{ flexWrap: 'wrap', alignItems: 'center', textAlign: 'center' }} position="relative" alignItems="center" justifyContent="center">
				<CircularProgress style={{ width: '80px', height: '80px', color: '#00ff7f' }} variant="determinate" value={90} />
				<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
					<Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">90%</Typography>
				</Box>
			</Box>

			<h3 style={{ textAlign: 'center' }}> Correlate Started... </h3>
			<LastUploadStatus />
		</div>
	)
	const Progress100 = () => (

		<div>
			{/* <Box position="relative" display="inline-flex">
				<CircularProgress style={{ width: '80px', height: '80px', color: '#00e676' }} variant="determinate" value={100} />
				<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
					<Typography variant="caption" component="div" style={{ fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">100%</Typography>
				</Box>
			</Box>

			<h4> Correlate Completed, File Uploaded Successfully !</h4> */}
			<SuccessLastUploadStatus />
		</div>
	)

	//{pmuploadDate(pmdate)}

  const NoStatus = () => (
    <div> </div> )

  const ProgressMDC = () => (
    <div>
    <Box position="relative" display="inline-flex">
      <CircularProgress style={{marginLeft:"350px", width: '80px', height: '80px', color: '#00e676' }} variant="determinate" value={progress} />
      <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
        <Typography variant="caption" component="div" style={{marginLeft:"350px", fontWeight: 'bold', fontSize: '18px' }} color="textPrimary">{progress+"%"}</Typography>
      </Box>
    </Box>
  </div>

  )

	const themes = getMuiTheme();
	return (
		<div>
			<form className={classes.form}>
				<Paper className={classes.paper}>
					<div className={classes.card}>
						<h2>MDC FILE UPLOADS</h2>
					</div>
					<div className={classes.container}>
						<Grid className={classes.Grid} container spacing={3}>
            <Grid item xs={4} container spacing={2}>
                <div>
                  <div>
                  <input className={classes.input} name="file" type="file" onChange={(e) => handleChange(e)} />
                  <Button type="button" style={{marginLeft : "350px",marginTop : " -45px", width:"200px",backgroundColor: "#001c3e",color: "White"}} onClick={onClickMDC}> Upload MDC RAW Data</Button>
                  </div>
                  <br></br>
                  <br></br>
                  <div>
                  {fileUploadInProgress ? <ProgressMDC /> : <NoStatus />}
                  </div>
                  {/* <Button type="button" style={{marginLeft : "520px",marginTop : "-56px", width:"200px",backgroundColor: "#001c3e",color: "White"}} onClick={(e) => mdcStatus(e)}> Show Status</Button> */}
                  
                 
                  
                  <br></br>
                  <br></br>
                  <div>
                  <input className={classes.input} id="contained-button-file" multiple type="file" onChange={(e) => handleTopMessageChange(e)} />
                  <Button onClick={(e) => upload_TopMessage_data(e)} id="upload" variant="contained" component="span" style={{marginLeft: '350px',marginTop: '-35px',textAlign :'center', width:'300px', padding: "4px", backgroundColor: "#001c3e",color: "White"}}>  Upload Top Message Data </Button>
                  </div>
                </div>
              </Grid>

						</Grid>
					</div>
				</Paper>
			</form>

			<form className={classes.form}>
				<Paper className={classes.paper}>
					<div className={classes.card}>
						<h2>PM FILE UPLOADS</h2>
					</div>
					<Grid item xs={5} style={{ marginLeft: '250px' }}>
						<div style={{ width: '150%', }}>
							<input className={classes.input} style={{ paddingTop: '30px' }} id="contained-button-file" multiple type="file" onChange={(e) => handleChange_pmfile(e)} />
							<label htmlFor="contained-button-file" style={{ width: '100%', paddingTop: '100px' }}></label>
							<Button id="upload" variant="contained" component="span" style={{ width: '200px', padding: "4px", backgroundColor: "#001c3e", color: "White" }} disabled={false} onClick={upload_PM_data}> Upload PM Data </Button>


							<Button variant="contained" className={classes.button} style={{ width: '250px', padding: "4px", marginLeft: '10px', backgroundColor: "#001c3e", color: "White" }} onClick={onClick_PM_Upload_Status}>PM File Upload Status</Button><br /><br />

							{

								statusmessage === 'Status_Message":"error' ? <Progress0 /> :
									statusmessage === 'Status_Message":"Process Started' && process === 'Process":"PM File Upload' ? <Progress30 /> :
										statusmessage === 'Status_Message":"Process Completed' && process === 'Process":"PM File Upload' ? <Progress40 /> :
											statusmessage === 'Status_Message":"started' && process === 'Process":"ATA Mapping' ? <Progress50 /> :
												statusmessage === 'Status_Message":"completed' && process === 'Process":"ATA Mapping' ? <Progress70 /> :
													statusmessage === 'Status_Message":"started' && process === 'Process":"Correlate' ? <Progress90 /> :
														statusmessage === 'Status_Message":"completed' && process === 'Process":"Correlate' ? <Progress100 /> : <NoProgress />

							}


						</div>

					</Grid>

				</Paper>
			</form>

			<form className={classes.form}>
				<Paper className={classes.paper}>
					<div className={classes.card}>
						<h2>INPUT MESSAGE DATA</h2>
					</div>

					<div className={classes.container}>
						<Grid className={classes.Grid} container spacing={3}>
							<div>
								<input className={classes.input} id="contained-button-file" multiple type="file" onChange={(e) => handleInputFileChange(e)} />
								<Button type="button" style={{marginLeft: "370px", padding: "5px", backgroundColor: "#001c3e",color: "White"}} onClick={(e) => upload_InputMessage_data(e)}>Upload Input Message Data</Button>
							</div>

						</Grid>

						<Grid className={classes.Grid} container spacing={3}>

							<div style={{ margin: '20px 300px 10px -60px', height: '50px', width: '92vw', backgroundColor: "#C5D3E0", textAlign: 'center', justify: 'center', padding: '0px' }}>
								<h3>UPDATE INPUT MESSAGE DATA</h3>
							</div>

							<Grid item xs={5} style={{ marginLeft: '10px' }}>
								<div>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.Equation_ID} id="Equation_ID" label="Equation ID" defaultValue=" " variant="outlined" /></div>
									<br></br>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.EICAS} id="EICAS" label="EICAS" defaultValue=" " variant="outlined" /></div>
									<br></br>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.Priority_} id="Priority_" label="Priority" defaultValue=" " variant="outlined" /></div>
									<br></br>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.MHIRJ_ISE_inputs} id="MHIRJ_ISE_inputs" label="Input Messages" defaultValue=" " variant="outlined" /></div>
									<br></br>
								</div>
							</Grid>

							<Grid item xs={5} style={{ paddingLeft: '100px' }}>
								<div>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.MHIRJ_ISE_Recommended_Action} id="MHIRJ_ISE_Recommended_Action" label="Recommended Action" defaultValue=" " variant="outlined" /></div>
									<br></br>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.Additional_Comments} id="Additional_Comments" label="Additonal Comments" defaultValue=" " variant="outlined" /></div>
									<br></br>
									<div> <TextField onChange={(e) => handle_update(e)} value={data_update.MEL_or_No_Dispatch} id="MEL_or_No_Dispatch" label="MEL_or_No_Dispatch" defaultValue=" " variant="outlined" /></div>
									<br></br>

									<Button onClick={(e) => update_data(e)} id="update" variant="contained" component="span" style={{ width: '250px', padding: "6px", TextAlign: 'center', backgroundColor: "#001c3e", color: "White" }} >Update Input Message Data </Button>
									<Button onClick={(e) => show_inputMessage_data(e)} id="show" variant="contained" component="span" style={{ width: '250px', marginTop: '50px', TextAlign: 'center', padding: "6px", backgroundColor: "#001c3e", color: "White" }} >Show Input Message Data </Button>

								</div>

							</Grid>
							<Grid item xs={12}>
								<Paper style={{ marginLeft: '-230px' }}>
									<MuiThemeProvider theme={themes}>
										<MUIDataTable

											title={"INPUT MESSAGE DATA "}
											data={updateData}
											columns={columns}
											options={options}
										/>
									</MuiThemeProvider>
								</Paper>
							</Grid>

						</Grid>
					</div>
				</Paper>
			</form>




		</div>

	);
}