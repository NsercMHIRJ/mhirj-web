import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Constants from './utils/const';
import { MuiThemeProvider, createMuiTheme, FormControlLabel } from '@material-ui/core';
import {randomId} from '@mui/x-data-grid-generator';
import {EqIDSelectorInput} from './ATAGraphSelectors';
import { DataGrid } from '@mui/x-data-grid';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@material-ui/icons/Edit";
import 'react-toastify/dist/ReactToastify.css';
import { blue } from "@material-ui/core/colors";
import '../scss/components/_analysis.scss';
import $ from 'jquery'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CircularProgress from '@material-ui/core/CircularProgress';
import SettingsOverscanOutlinedIcon from '@mui/icons-material/SettingsOverscanOutlined';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  
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
	},
  SaveIcon: {
    fontSize:'30px'
  },
  cellTable:{
    whiteSpace:'normal'
  }


}));

function EditInputCell(props) {
  const { id, value, api, field } = props;

  const handleChange = async (event) => {
    if (event.nativeEvent.type === 'input'){
      api.setEditCellValue({ id, field, value: event.target.value });
    }
  };

  return (
      <TextField
        value={value}
        multiline
        inputProps={{style: {fontSize: 15}}}
        minRows={2}
        maxRows={10}
        onChange={handleChange}
      />
  );
}



const override = css`
  display: block;
  margin: 0 auto;
`;

var tmpObjects = {};
var data = [];
export default function FileUpload(props) {
	const classes = useStyles();
	const [updateData, setupdateData] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [EqID, setEqID] = useState("");
  const [rowID, setRowID] = useState("");
  const[finalEditedData , setFinalEditedData] = useState([])
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState(false);


 /* Input message data file upload */
  const [input_Message_file, setInput_Message_File] = useState({
    selectedInputFile: null
  });

  function handleInputFileChange(e) {
    console.log(e.target.files)
    console.log(e.target.files[0]);
    let input_message_file = e.target.files[0]
    setInput_Message_File({
      selectedInputFile: input_message_file
    })
  }

  function ExpandCell(params) {
    if(params.id === rowID){
      if(expand){
        return(
          <div class='cellIsExpand'>
            {params.value}
          </div>
        )
      }else{
        return(
          <div class='cellIsCollapse'>
            {params.value}
          </div>
        )
      }
    }else{
      return(
        <div class='cellIsCollapse'>
        {params.value}
      </div>
      )
    }
  }
  
  const [loadProgress , setLoadProgress] = useState();
  // const [progress, setProgress] = React.useState({
  //   status:"",
  // });
  // const onClickInputMessage = (e) => {
  //   inputMessageStatus(e);
  //   upload_MDC_data(e);
    
  // }
  // let abortController = new AbortController();
  // const {signal} = abortController;


  function upload_InputMessage_data(e) {
    setLoadProgress(true);
    let file = input_Message_file.selectedInputFile
    let data = new FormData()
    data.append('file', file)
    axios({
      url:  Constants.APIURL + 'uploadfile_input_message/',
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      data: data
    }).then((res) => {
      setLoadProgress(false);
      alert("File Uploaded Successfully!")
    })
      .catch(err => {
        console.log(err);
      })
  }


  const handleEqIDChangeInput = (eqIDList) => {
    setEqID(eqIDList);
  };

  const MatEdit = ({ index }) => {
    const handleExpandClick = () => {
      setRowID(index)
      if (expand){
        setExpand(false);
      }else{
        setExpand(true)
      }
      
    };
    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            onClick={handleExpandClick}
            id="expandCloumn"
          >
              <SettingsOverscanOutlinedIcon style={{color:'black', fontSize:'28px'}} />
          </IconButton>
        }
      />
    );
  };


  const columns = [
    
    {
      field: 'Action',
      headerName: 'Action',
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit index={params.row.id} />
          </div>
        );
      }
    },
    {
      field: 'Equation_ID',
      headerName: 'Equation_ID',
      width:150,
     
    },
    {
      field: 'ATA',
      headerName: 'ATA',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true
    },
    {
      field: 'LRU',
      headerName: 'LRU',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true
    },
    {
      field: 'Message_No',
      headerName: 'Message_No',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true
    },
    {
      field: 'Comp_ID',
      headerName: 'Comp_ID',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'Keywords',
      headerName: 'Keywords',
      renderEditCell: (params)=>{ return <EditInputCell   {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true
      
    },
    {
      field: 'Fault_Logged',
      headerName: 'Fault_Logged',
      renderEditCell: (params)=>{ return <EditInputCell style={{ width: "100%" }}  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true,
      width:150
    },
    {
      field: 'Status',
      headerName: 'Status',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true,
      width:150
    },
    {
      field: 'Message_Type',
      headerName: 'Message_Type',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true,
      width:180,
    },
    {
      field: 'Message',
      headerName: 'Message',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true,
      width: 160
    },
    {
      field: 'EICAS',
      headerName: 'EICAS',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true,
      width: 260
    },
    {
      field: 'Timer',
      headerName: 'Timer',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'Logic',
      headerName: 'Logic',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'Equation_Description',
      headerName: ' Equation_Description',
      width:200,
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true,
    },
    {
      field: 'Occurrence_Flag',
      headerName: 'Occurrence_Flag',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'Days_Count',
      headerName: 'Days_Count',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'Priority',
      headerName: 'Priority',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true
    },
    {
      field: 'MHIRJ_ISE_Recommended_Action',
      headerName: 'MHIRJ Recommended Action',
      width: 250,
      renderEditCell: (params)=>{ return <EditInputCell  style={{ alignSelf:"flex-start"}}  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'Additional_Comments',
      headerName: 'MHIRJ Additional Comment',
      width: 250,
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'MHIRJ_ISE_inputs',
      headerName: 'MHIRJ Input',
      width: 250,
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'MEL_or_No_Dispatch',
      headerName: 'MEL_or_No_Dispatch',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
  ];

  function show_inputMessage_data(){
    setLoading(true)
    const path1 = Constants.APIURL + 'all_mdc_messages_input/' +EqID;
    console.log(path1)
    axios.post(path1)
      .then(res => {
         const data = JSON.parse(res.data);
         data.map(item => {                                            //Insert id in each data comming
          item['id'] = randomId();
         })      
         setupdateData(data) 
        }
        
      )
      setLoading(false)
  }
  /**Find each edited rows by id from the whole data**/
  function getDataById(id){
     return updateData.find(data => {
        if(data.id === id){
          return data
        }
      })
  }
  /** Massage the data and send it to the api**/
  function saveTable() {  
    setLoading(true)
    for (const property in tmpObjects) {
        let d = getDataById(property)
        d.ATA = tmpObjects[property]['ATA'].value;
        d.Additional_Comments =  tmpObjects[property]['Additional_Comments'].value;
        d.Comp_ID =  tmpObjects[property]['Comp_ID'].value;
        d.Days_Count = tmpObjects[property]['Days_Count'].value;
        d.EICAS = tmpObjects[property]['EICAS'].value;
        d.Equation_Description = tmpObjects[property]['Equation_Description'].value;
        d.Fault_Logged = tmpObjects[property]['Fault_Logged'].value;
        d.Keywords = tmpObjects[property]['Keywords'].value;
        d.LRU = tmpObjects[property]['LRU'].value;
        d.Logic = tmpObjects[property]['Logic'].value;
        d.MEL_or_No_Dispatch = tmpObjects[property]['MEL_or_No_Dispatch'].value;
        d.MHIRJ_ISE_Recommended_Action = tmpObjects[property]['MHIRJ_ISE_Recommended_Action'].value;
        d.MHIRJ_ISE_inputs = tmpObjects[property]['MHIRJ_ISE_inputs'].value;
        d.Message = tmpObjects[property]['Message'].value;
        d.Message_No = tmpObjects[property]['Message_No'].value;
        d.Message_Type = tmpObjects[property]['Message_Type'].value;
        d.Occurrence_Flag = tmpObjects[property]['Occurrence_Flag'].value;
        d.Priority = tmpObjects[property]['Priority'].value;
        d.Status = tmpObjects[property]['Status'].value;
        d.Timer = tmpObjects[property]['Timer'].value; 
        finalEditedData.push(d);
        setFinalEditedData(finalEditedData)
    }
    if(finalEditedData[0] !== undefined){  
      let data = finalEditedData;
      let path = `${Constants.APIURL}update_input_message_data/`
      axios.post(path, {data}).then(function (res){
        if(res.statusText === "OK"){
          setFinalEditedData([]);
          alert("Success");
        }
      }).catch(function (err){
        console.log(err);
        alert("Something wrong try later");
      });
    }else{
      alert("No Editing Data to Save")
    }
    setLoading(false)
  }
  /**Fetch all data for each selected row.**/
  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
    console.log(model)
    const editedIds = Object.keys(model); 
    if(model[editedIds] !== undefined){
      tmpObjects[editedIds] = model[editedIds] 
    }
  });
	return (
		<div>
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
              <br></br>
						</Grid>
            {loadProgress ? <CircularProgress style={{ marginLeft: '580px' }} /> : ""}
            </div>
					<div className={classes.container}>
						<Grid className={classes.Grid} container spacing={3}>
							<div style={{ margin: '20px 300px 10px -60px', height: '50px', width: '92vw', backgroundColor: "#C5D3E0", textAlign: 'center', justify: 'center', padding: '0px' }}>
								<h3>UPDATE INPUT MESSAGE DATA</h3>
							</div>
							<Grid item xs={5} style={{ marginLeft: '10px' }}>
								<div>
									<div style={{ marginLeft:'50px', marginTop: '30px',width: '1450px'}}>  
										<EqIDSelectorInput handleEqIDChangeInput= {handleEqIDChangeInput}/>
									</div>
									<br></br>
								</div>
							</Grid>
							<Grid item xs={5} style={{ paddingLeft: '100px' }}>
								<div>
									<Button onClick={(e) => show_inputMessage_data(e)} id="show" variant="contained" component="span" style={{ width: '250px', marginTop: '50px', TextAlign: 'center', padding: "6px", backgroundColor: "#001c3e", color: "White" }} >Show Input Message Data </Button>
								</div>
							</Grid>
							<Grid item xs={12}>
								<Paper style={{ marginLeft: '-230px' }}>
                    <div >
                      <div style={{height: '400px' }}>
                        <ClipLoader loading={loading} css={override} />
                        <DataGrid disableVirtualization
                        getRowId={row => row.id}
                        title={"INPUT MESSAGE DATA "}
                        rows={updateData}
                        columns={columns}
                        editMode="row"
                        getRowHeight={({ id, densityFactor }) => {
                          if(id === rowID){
                            if(expand){
                              return 260 * densityFactor;
                            }else{
                              return 50 * densityFactor;
                            }
                          }      
                        }}
                        editRowsModel={editRowsModel}
                        onEditRowsModelChange={handleEditRowsModelChange}
                        className={classes.dataGrid}
                        rowsPerPageOptions={[7,20,50]}
                        pageSize={5}
                        sx={{
                          boxShadow: 2,
                          border: 2,
                          borderColor: 'primary.light',
                          '& .MuiDataGrid-cell:hover': {
                              color: 'primary.main',
                          },
                          whiteSpace: 'normal'
                  
                      }}
                        />
                      </div>  
                    </div>
                    <IconButton aria-label="Save" className={classes.SaveIcon}>
                    <SaveIcon onClick={() => saveTable()} style={{fontSize:'40px'}} /> Save
                  </IconButton>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</Paper>
			</form>
		</div>
	);
}