import React, {useState, useCallback, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { FormControlLabel } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from "@material-ui/icons/Edit";
import Constants from '../utils/const';
import axios from 'axios';
import {randomId} from '@mui/x-data-grid-generator';
import Grid from '@material-ui/core/Grid';
import {EqIDSelectorInput} from '../ATAGraphSelectors';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from "@material-ui/core/styles";
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import Alert from '@mui/material/Alert';
import $ from 'jquery';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2),
    },
  
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
  },
  button: {
  
    backgroundColor: "#001c3e",
    color: "White",
    display: 'inline-block'
  },
  showButtonGrid: {
    margin: '0 auto'
  },
  faild:{
    backgroundColor:'red',
    width:'88%',
    borderRadius: '25px',
    color:'white'
  },
  buttonSave: {
    backgroundColor: "#001c3e",
    color: "White",
    width: '6vw',
  }
}));



function ShowSaveEditData() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [rowExpand, setRowExpand] = useState({});
  const [rowEdit, setRowEdit] = useState({});
  const [expand, setExpand] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [EqID, setEqID] = useState("");
  const [updateData, setupdateData] = useState([]);
  const [isNoData, setIsNoData] = useState(false);
  const [finalEditedData , setFinalEditedData] = useState([])
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFaild, setIsFaild] = useState(false);
  const [isNoSavedData, setIsNoSavedData] = useState(false);
  const [tmpObjects, setTmpObjects] = useState({});
  const [pageSize, setPageSize] = React.useState(20);
  const [height, setHeight] = useState(650)

  useEffect(()=> {
    if(updateData.length === 0) {
      setHeight(300)
    }else {
      setHeight(650)
    }
  })

  const handleEqIDChangeInput = (eqIDList) => {
    setEqID(eqIDList);
  };

  useEffect(()=> {
    var cells = $('.MuiDataGrid-cell')
    let value = cells.attr('data-field');
    console.log(cells, value)
  })




  const ExpandCell = (params) => {
    if(rowExpand.hasOwnProperty(params.id)){
      if(rowExpand[params.id]){
        return(
          <div className='cellIsExpand'>
            {params.value}
          </div>
        )
      }else{
        return(
          <div className='cellIsCollapse'>
            {params.value}
          </div>
        )
      }
    }else{
      return(
        <div className='cellIsCollapse'>
        {params.value}
      </div>
      )
    }
  }

  const EditInputCell = (props) => {
   
    const { id, value, api, field } = props;
  
    const handleChange = async (event) => {
        api.setEditCellValue({ id, field, value: event.target.value });
        api.commitRowChange(id)
        const model = api.getEditRowsModel()
        const editedIds = Object.keys(model); 
        if(model[editedIds] !== undefined){
          tmpObjects[editedIds] = model[editedIds]
        }
    };
  
    return (
        <TextField
          value={value}
          multiline
          inputProps={{style: {fontSize: 12}}}
          minRows={2}
          maxRows={25}
          onChange={handleChange}
        />
    );
  }
  
  const MatEdit = ({ index }) => {
      const handleExpandClick = () => { 
        setExpand(!expand)   
        rowExpand[index.row.id] = !!!rowExpand[index.row.id];  
        setRowExpand(rowExpand);
      };
      const handleEidtClick = () => {
        setIsEdit(!isEdit)
        rowEdit[index.row.id] = !!!rowEdit[index.row.id]
        setRowEdit(rowEdit)
        index.api.setRowMode(index.id, rowEdit[index.row.id] ? 'edit' : 'view')
      }
      return (
        <div>
        <FormControlLabel
          control={
            <IconButton
              color="primary"
              aria-label="add an alarm"
              onClick={handleExpandClick}
            >
               { rowExpand[index.row.id] && rowExpand.hasOwnProperty(index.row.id)? <ExpandLessSharpIcon style={{ fontSize:'28px'}}/> : <ExpandMoreSharpIcon  style={{ fontSize:'28px'}}/>}
            </IconButton>
          }
        />
        <FormControlLabel
        control={
          <IconButton     
            color={rowEdit[index.row.id]? "success" : "secondary"}
            aria-label="add an alarm"
            onClick={handleEidtClick}
            id={`EditId${index.row.id}`}
          >
            { rowEdit[index.row.id]? <CheckIcon style={{ fontSize:'28px'}}/>  :<EditIcon style={{ fontSize:'28px'}}/>} 
          </IconButton>
        }
      />
        </div>
  
      );

    };
  const Show_inputMessage_data = useCallback (() => {
        setLoading(true)
        const path1 = Constants.APIURL + 'all_mdc_messages_input/' +EqID;
        console.log(path1)
          axios.post(path1)
          .then(res => {
            const data = JSON.parse(res.data);
            data.map(item => {                                            //Insert id in each data comming
            item['id'] = randomId();
            })    
        
              setLoading(false)
              setupdateData(data) 
        
          }).catch((err) =>{
            console.log(err);
              setLoading(false)
              setIsNoData(true)
          });
      })
  /**Find each edited rows by id from the whole data**/
  const getDataById = (id) => {
      return updateData.find(data => {
        if(data.id === id){
          return data
        }
      })
  }
  /** Massage the data and send it to the api**/
  const saveTable = useCallback(() => {  
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
      axios.post(path, {data}).then( (res) => {
        if(res.statusText === "OK"){
          setFinalEditedData([]);
          setTmpObjects({})
            setIsSuccess(true)
           
         }
      }).catch((err) => {
        console.log(err);
        setFinalEditedData([]);
        setTmpObjects({})
        console.log(tmpObjects)
        setIsFaild(true)
      });
    }else{
        setIsNoSavedData(true)
    } 
  })

  const onCellClicked = (params) => {
    if(params.field !== "actions"){
      if(params.cellMode === "view"){
        setExpand(!expand)
        rowExpand[params.id] = expand 
        setRowExpand(rowExpand) 
      }
    }
  }

  const getRowHeights = ({ id, densityFactor }) => {
    if(rowExpand.hasOwnProperty(id)){
      if(rowExpand[id] === true){
        return 340 * densityFactor;
      }else{
        return 50 * densityFactor;
      }
    }      
  }

  const onCellDoubleClicked = (params, event) => {
    if (!event.ctrlKey) {
      event.defaultMuiPrevented = true;
    }
  }

  const ValidationMessages = () =>{
    if(isSuccess){
      
      setTimeout(()=>{
        setIsSuccess(false)
      },5000)
      return(
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Data Saved Successufly!</Alert>
    </Stack>
      )
    }else if (isFaild){
      setTimeout(()=>{
        setIsFaild(false)
      },5000)
      return(
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Please make sure all fields are not empty</Alert>
    </Stack>
      )
    }else if (isNoData){
      setTimeout(()=>{
        setIsNoData(false)
      },5000)
      return(
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Something wrong with the server Please try later!!!</Alert>
    </Stack>
      )
    }else if (isNoSavedData){
      setTimeout(()=>{
        setIsNoSavedData(false)
      },5000)
      return(
      <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">No Data to save!</Alert>
    </Stack>
      )
    }else{
      return(
        <div></div>
      )
    }
  }

  const columns = [
    
    {
      field: 'actions',
      headerName: 'Actions',

      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer",position: '-webkit-sticky',position: 'sticky', background: '#fff',left: 0, zIndex: 1, }}
          >
            <MatEdit index={params} />
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
      renderCell: (params) => { return <ExpandCell {...params} /> },
      editable: true
    },
    {
      field: 'LRU',
      headerName: 'LRU',
      renderEditCell: (params)=>{
         return <EditInputCell  {...params} 
         />
       },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true
    },
    {
      field: 'Message_No',
      headerName: 'Message_No',
      renderEditCell: (params)=>{ return <EditInputCell  {...params} /> },
      renderCell: (params) => { return <ExpandCell  {...params} /> },
      editable: true,
      width:150
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
      renderEditCell: (params)=>{
         return <EditInputCell  {
           ...params
          } /> 
        },
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

  const sxStyle = {
    borderColor: 'primary.light',
    '& .MuiDataGrid-cell:hover': {
        color: 'primary.main',
    },
    whiteSpace: 'normal',
    '& .MuiDataGrid-cell[data-field*="actions"]': {
      position: '-webkit-sticky',
      position: 'sticky',
      background: '#fff',
      left: 0,
      zIndex: 1,
    },

  }

  return(
    <div>
 
     
        <div style={{ textAlign: 'center' ,padding: 20 }}>
          <EqIDSelectorInput handleEqIDChangeInput={handleEqIDChangeInput} style={{ width: '20%', display: 'inline-flex', padding: 10}} />
          <Button className={classes.button} onClick={(e) => Show_inputMessage_data(e)} id="show" variant="contained" component="span">Show Input Message Data </Button>
        </div>
    

    <Grid item xs={12}>
      <Paper style={{ width: '99%', textAlign: 'center', margin:'0 auto', boxShadow: 'none' }}>
        <div >
          <ValidationMessages />
        </div>
        <div   >
          <div style={{ width: '97%', height: height }}>
            <DataGrid disableVirtualization disableClickEventBubbling 
              getrowExpand={row => row.id}
              title={"INPUT MESSAGE DATA "}
              rows={updateData}
              columns={columns}
              columnBuffer={2}
              columnThreshold={2}
              editMode='row'
              loading={loading}
             
              getRowHeight={getRowHeights}
              onCellClick={onCellClicked}
              onCellDoubleClick={onCellDoubleClicked}
              sx={sxStyle}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
            />
      
          </div>
          
        </div>
        <Button className={classes.buttonSave} onClick={(e) => saveTable()} id="save" variant="contained" component="span"> Save </Button>
      </Paper>
    </Grid>
  </div>
  )
}
  
export default ShowSaveEditData



