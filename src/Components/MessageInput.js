import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Constants from './utils/const';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core';
import {randomId} from '@mui/x-data-grid-generator';
import {EqIDSelectorInput} from './ATAGraphSelectors';
import { DataGrid } from '@mui/x-data-grid';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dataGrid: {
    width: "100%"
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
	},
  SaveIcon: {
    fontSize:'40px'
  }


}));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

var tmpObjects = {};

export default function FileUpload() {
	const classes = useStyles();
  const [notification , setNotification] = useState("")
  const notify = () => toast(notification);
	const [updateData, setupdateData] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [updatedObjects , setUpdatedObjects] = React.useState([]);
  const [EqID, setEqID] = useState("");

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
 
 
  const handleEqIDChangeInput = (eqIDList) => {
    setEqID(eqIDList);
  };

  const columns = [
    {
      field: 'ATA',
      headerName: 'ATA',
      editable: true
    },
    {
      field: 'LRU',
      headerName: 'LRU',
      flex: 1,
      editable: true
    },
    {
      field: 'Message_No',
      headerName: 'Message_No',
      editable: true,
      flex: 1,
      width: 120
    },
    {
      field: 'Comp_ID',
      headerName: 'Comp_ID',
      flex: 1,
      editable: true
    },
    {
      field: 'Keywords',
      headerName: 'Keywords',
      flex: 1,
      editable: true
    },
    {
      field: 'Fault_Logged',
      headerName: 'Fault_Logged',
      flex: 1,
      editable: true,
      width: 125
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      editable: true
    },
    {
      field: 'Message_Type',
      headerName: 'Message_Type',
      editable: true,
      flex: 1,
      width: 130
    },
    {
      field: 'Message',
      headerName: 'Message',
      flex: 1,
      editable: true,
    },
    {
      field: 'EICAS',
      headerName: 'EICAS',
      flex: 1,
      editable: true
    },
    {
      field: 'Timer',
      headerName: 'Timer',
      flex: 1,
      editable: true
    },
    {
      field: 'Logic',
      headerName: 'Logic',
      flex: 1,
      editable: true
    },
    {
      field: 'Equation_Description',
      headerName: ' Equation_Description',
      flex: 1,
      editable: true,
      width: 200
    },
    {
      field: 'Equation_ID',
      headerName: 'Equation_ID',
      flex: 1,
      width: 150
    },
    {
      field: 'Occurrence_Flag',
      headerName: 'Occurrence_Flag',
      flex: 1,
      editable: true
    },
    {
      field: 'Days_Count',
      headerName: 'Days_Count',
      flex: 1,
      editable: true
    },
    {
      field: 'Priority',
      headerName: 'Priority',
      flex: 1,
      editable: true
    },
    {
      field: 'MHIRJ_ISE_Recommended_Action',
      headerName: 'MHIRJ Recommended Action',
      editable: true,
      flex: 1,
    },
    {
      field: 'Additional_Comments',
      headerName: 'MHIRJ Additional Comment',
      editable: true,
      flex: 1,
    },
    {
      field: 'MHIRJ_ISE_inputs',
      headerName: 'MHIRJ Input',
      editable: true,
      flex: 1,
    },
    {
      field: 'MEL_or_No_Dispatch',
      headerName: 'MEL_or_No_Dispatch',
      editable: true,
      flex: 1
    },
  ];

  function show_inputMessage_data(){
    loading = true
    setLoading(loading)
    const path1 = Constants.APIURL + 'all_mdc_messages_input/' +EqID;
    console.log(path1)
    axios.post(path1)
      .then(res => {
         const data = JSON.parse(res.data);
         data.map(item => {
          item['id'] = randomId();
         })
        
         setupdateData(data) 
         console.log(updateData)
         loading = false
         setLoading(loading)
        }
        
      )
  }
  function getDataById(id){
     return updateData.find(data => {
        if(data.id === id){
          return data
        }
      })
  }
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
        updatedObjects.push(d);
        setUpdatedObjects(updatedObjects);
  }
  
  //   if(updatedObjects[0]){
  //     loading = true
  //     
  //     var status = ""
  //       status = updatedObjects[0].Status.replace("/"," "); 
    
  //     let path = `${Constants.APIURL}update_input_message_data/${updatedObjects[0].Equation_ID}/${updatedObjects[0].LRU}/${updatedObjects[0].ATA}/${updatedObjects[0].Message_No}/
  //     ${updatedObjects[0].Comp_ID}/${updatedObjects[0].Message}/${updatedObjects[0].Fault_Logged}/${status}/${updatedObjects[0].Message_Type}/${updatedObjects[0].EICAS}/
  //     ${updatedObjects[0].Timer}/${updatedObjects[0].Logic}/${updatedObjects[0].Equation_Description}/${updatedObjects[0].Occurrence_Flag}/${updatedObjects[0].Days_Count}/${updatedObjects[0].Priority}/
  //     ${updatedObjects[0].MHIRJ_ISE_Recommended_Action}/${updatedObjects[0].Additional_Comments}/${updatedObjects[0].MHIRJ_ISE_inputs}/${updatedObjects[0].MEL_or_No_Dispatch}/
  //     ${updatedObjects[0].Keywords}`
  //     console.log(updatedObjects);
  //     axios.post(path).then(function (res){
  //       if(res){
  //         notification = "data is updated"
  //         loading = false
  //         setLoading(loading)
  //         setNotification(notification)
  //         notify();
  //       }
       
  //     }).catch(function (err){
  //       console.log(err);
  //     });
  //     show_inputMessage_data()
  // }
  }
	const themes = getMuiTheme();
  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
    const editedIds = Object.keys(model);
    console.log(editedIds)
    if(model[editedIds] !== undefined){
      tmpObjects[editedIds] = model[editedIds] 
    }
  });

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

	return (
		<div>
			<form className={classes.form}>
				<Paper className={classes.paper}>
					<div className={classes.card}>
						<h2>INPUT MESSAGE DATA</h2>
					</div>

					<div className={classes.container}>
						<Grid className={classes.Grid} container spacing={3}>

							<div style={{ margin: '20px 300px 10px -60px', height: '50px', width: '92vw', backgroundColor: "#C5D3E0", textAlign: 'center', justify: 'center', padding: '0px' }}>
								<h3>UPDATE INPUT MESSAGE DATA</h3>
							</div>

							<Grid item xs={5} style={{ marginLeft: '10px' }}>
								<div>
									<div style={{ marginLeft:'50px', marginTop: '30px',width: '1450px'}}>  
										<EqIDSelectorInput 
              									 handleEqIDChangeInput = {handleEqIDChangeInput}
             									 />
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
        
                    <MuiThemeProvider theme={themes}>
                    
                    <div style={{ display: 'flex', height: '100%' }}>
                      <div style={{ flexGrow: 1 }}>
                        <ClipLoader loading={loading} css={override} />
                        <DataGrid 
                        getRowId={row => row.id}
                        title={"INPUT MESSAGE DATA "}
                        rows={updateData}
                        columns={columns}
                        editMode="row"
                        autoHeight={true}
                        disableExtendRowFullWidth={false}
                        editRowsModel={editRowsModel}
                        onEditRowsModelChange={handleEditRowsModelChange}
                        className={classes.dataGrid}
                        rowsPerPageOptions={[7,20,50]}
                        pageSize={20}
                        />
                      </div>  
                    </div>
                    <IconButton aria-label="Save" className={classes.SaveIcon}>
                    <SaveIcon onClick={() => saveTable()} />   
                  </IconButton>
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
