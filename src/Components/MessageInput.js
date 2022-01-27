import React, { useState, useEffect } from 'react';
import { useMemo, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
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


  // const headingStyle = {
  //   maxWidth:'200px',
  //   minWidth:'50px',
  //   padding:'5px',
  //   textAlign:"center",
  //   margin: '0px',
  //   whiteSpace: 'normal',
  // }

  // const columnStyle = {
  //   maxWidth:'150px',
  //   padding:'13px',
  //   textAlign:"left",
  //   margin: '0px',
  // }

  const columns = [
    {
      field: 'ATA',
      headerName: 'ATA',
      editable: true
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'LRU',
      headerName: 'LRU',
      flex: 1,
      editable: true
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      // }
    },
    {
      field: 'Message_No',
      headerName: 'Message_No',
      editable: true,
      flex: 1,
      width: 120
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Comp_ID',
      headerName: 'Comp_ID',
      flex: 1,
      editable: true
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Keywords',
      headerName: 'Keywords',
      flex: 1,
      editable: true
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),

      // }
    },
    {
      field: 'Fault_Logged',
      headerName: 'Fault_Logged',
      flex: 1,
      editable: true,
      width: 125
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      editable: true
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Message_Type',
      headerName: 'Message_Type',
      editable: true,
      flex: 1,
      width: 130
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Message',
      headerName: 'Message',
      flex: 1,
      editable: true,
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'EICAS',
      headerName: 'EICAS',
      flex: 1,
      editable: true
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Timer',
      headerName: 'Timer',
      flex: 1,
      editable: true
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Logic',
      headerName: 'Logic',
      flex: 1,
      editable: true
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Equation_Description',
      headerName: ' Equation_Description',
      flex: 1,
      editable: true,
      width: 200
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Equation_ID',
      headerName: 'Equation_ID',
      flex: 1,
      width: 150
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Occurrence_Flag',
      headerName: 'Occurrence_Flag',
      flex: 1,
      editable: true
      // options: {
      //   filter: false,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Days_Count',
      headerName: 'Days_Count',
      flex: 1,
      editable: true
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: true,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Priority',
      headerName: 'Priority',
      flex: 1,
      editable: true
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({ style: { minWidth: '200px' } }),
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'MHIRJ_ISE_Recommended_Action',
      headerName: 'MHIRJ Recommended Action',
      editable: true,
      flex: 1,
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({ style: { minWidth: '400px' } }),
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'Additional_Comments',
      headerName: 'MHIRJ Additional Comment',
      editable: true,
      flex: 1,
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({ style: { minWidth: '700px' } }),
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'MHIRJ_ISE_inputs',
      headerName: 'MHIRJ Input',
      editable: true,
      flex: 1,
      // options: {
      //   filter: false,
      //   sort: true,
      //   setCellProps: () => ({ style: { minWidth: '400px' } }),
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),
      // }
    },
    {
      field: 'MEL_or_No_Dispatch',
      headerName: 'MEL_or_No_Dispatch',
      editable: true,
      flex: 1
      // options: {
      //   filter: true,
      //   filterType: 'dropdown',
      //   sort: false,
      //   setCellProps: () => ({style: columnStyle}),
      //   setCellHeaderProps: () => ({ style: headingStyle }),

      // }
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
  function saveTable() {  
    
    if(updatedObjects[0]){
      loading = true
      setLoading(loading)
      var status = ""
        status = updatedObjects[0].Status.replace("/"," "); 
    
      let path = `${Constants.APIURL}update_input_message_data/${updatedObjects[0].Equation_ID}/${updatedObjects[0].LRU}/${updatedObjects[0].ATA}/${updatedObjects[0].Message_No}/
      ${updatedObjects[0].Comp_ID}/${updatedObjects[0].Message}/${updatedObjects[0].Fault_Logged}/${status}/${updatedObjects[0].Message_Type}/${updatedObjects[0].EICAS}/
      ${updatedObjects[0].Timer}/${updatedObjects[0].Logic}/${updatedObjects[0].Equation_Description}/${updatedObjects[0].Occurrence_Flag}/${updatedObjects[0].Days_Count}/${updatedObjects[0].Priority}/
      ${updatedObjects[0].MHIRJ_ISE_Recommended_Action}/${updatedObjects[0].Additional_Comments}/${updatedObjects[0].MHIRJ_ISE_inputs}/${updatedObjects[0].MEL_or_No_Dispatch}/
      ${updatedObjects[0].Keywords}`
      console.log(updatedObjects);
      axios.post(path).then(function (res){
        if(res){
          notification = "data is updated"
          loading = false
          setLoading(loading)
          setNotification(notification)
          notify();
        }
       
      }).catch(function (err){
        console.log(err);
      });
      show_inputMessage_data()
  }
  }

  var isThere = false;
	const themes = getMuiTheme();
  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
    const editedIds = Object.keys(model);
    console.log(model);
    updateData.map(d => {
      if(d.id === editedIds[0]){
        d.ATA = model[editedIds[0]]['ATA'].value;
        d.Additional_Comments =  model[editedIds[0]]['Additional_Comments'].value;
        d.Comp_ID =  model[editedIds[0]]['Comp_ID'].value;
        d.Days_Count = model[editedIds[0]]['Days_Count'].value;
        d.EICAS = model[editedIds[0]]['EICAS'].value;
        d.Equation_Description = model[editedIds[0]]['Equation_Description'].value;
        d.Fault_Logged = model[editedIds[0]]['Fault_Logged'].value;
        d.Keywords = model[editedIds[0]]['Keywords'].value;
        d.LRU = model[editedIds[0]]['LRU'].value;
        d.Logic = model[editedIds[0]]['Logic'].value;
        d.MEL_or_No_Dispatch = model[editedIds[0]]['MEL_or_No_Dispatch'].value;
        d.MHIRJ_ISE_Recommended_Action = model[editedIds[0]]['MHIRJ_ISE_Recommended_Action'].value;
        d.MHIRJ_ISE_inputs = model[editedIds[0]]['MHIRJ_ISE_inputs'].value;
        d.Message = model[editedIds[0]]['Message'].value;
        d.Message_No = model[editedIds[0]]['Message_No'].value;
        d.Message_Type = model[editedIds[0]]['Message_Type'].value;
        d.Occurrence_Flag = model[editedIds[0]]['Occurrence_Flag'].value;
        d.Priority = model[editedIds[0]]['Priority'].value;
        d.Status = model[editedIds[0]]['Status'].value;
        d.Timer = model[editedIds[0]]['Timer'].value; 
        if(updatedObjects.length > 0){
          for(let i = 0; i < updatedObjects.length; i++){
            if(updatedObjects[i].Equation_ID === d.Equation_ID){
              updatedObjects[i] = d;
              isThere = true;
            }else{
              isThere = false;
            }
          }
        }
        if(!isThere){
          updatedObjects.push(d);
        }
        setUpdatedObjects(updatedObjects);
      }
    });
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
