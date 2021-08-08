import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Constants from './utils/const'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
        form:{
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
      h3:{
        margin: 'auto',
        textAlign: 'center',
        color: "#001c3e",
      },
      Grid:{
        paddingLeft:'200px',
        margin: 'auto',
      },
      card:{
        backgroundColor: "#C5D3E0",
        textAlign: 'center',
        justify: 'center',
        padding: '5px',
      },
  
    
      button:{
        margin:'30px auto',
        width:'60%',
        backgroundColor: "#001c3e",
        color: "White",
      },
      formControl: {
        margin: theme.spacing(1),
        width:'90%',
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },
     
  }));


  export default function FileUpload() {
    const classes = useStyles();
    const [mdc_raw_file, setMDC_Raw_File] = useState({
       selectedFile: null
      });

    function handleChange(e){

        console.log(e.target.files)
        console.log(e.target.files[0]);
        let file = e.target.files[0]
        setMDC_Raw_File({
            selectedFile: file
        })
           
       
    }

    function upload_MDC_data(e) {

        let file = mdc_raw_file.selectedFile
        let data = new FormData()
        data.append('file',file)

       axios({
           url: 'https://mhirjapi.azurewebsites.net/api/uploadfile_airline_mdc_raw_data/',
           method: "POST",
           headers:{
               "Content-type": "multipart/form-data",
           },
           data: data
       }).then((res)=>{
           alert("File Uploaded Successfully!", +res.data)
       })
       .catch(err =>{
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
      
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsText(files[0]);
        
        reader.onload = (e) => {
           
          alert(" PM File uploaded!");


        }
      }
    
    return (


        <div>
        <form className={classes.form}>
          <Paper className={classes.paper}>
          <div className ={classes.card}>
            <h2>FILE UPLOADS</h2>
          </div>
          
            <div className={classes.container}>
  
            <Grid className={classes.Grid} container spacing={3}> 
            
            
              <Grid item xs={5} style={{ marginLeft: '10px'}}>     
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
          <label htmlFor="contained-button-file" style={{ width: '70%'}}>
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
          <label htmlFor="contained-button-file" style={{ width: '70%'}}>
            <Button id="upload" variant="contained" component="span" className={classes.button}>
              Upload Top Message Data
            </Button>
            </label>

              </div>                    
              </Grid>    

              <Grid item xs={5} style={{ paddingLeft: '200px'}}>     
              <div>
                <h2>PM FILE UPLOADS</h2> 
                <input className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => upload_PM_data(e)}
                />
                <label htmlFor="contained-button-file" style={{width: '100%' }}>
                 <Button id="upload" variant="contained" component="span" className={classes.button} >
                Upload PM Data
               </Button>
             </label>
              </div>           
            </Grid>          
          </Grid>
        </div>
          </Paper>
        </form>
          
      </div>
    
    );
  }
