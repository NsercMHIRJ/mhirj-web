import React, {useState} from 'react';
import axios from 'axios';
import Constants from '../utils/const';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => createStyles({
    container: {
      textAlign: 'center'
    },

      ProgressBar: {
          width: '320px'
      },
    faild:{
      background:'red',
      width:'23%',
      borderRadius: '25px',
      color:'white'
    },
    button: {
        backgroundColor: "#001c3e",
        color: "White",
    },
    div: {
        padding: '2%'
    },
    Grid: {
        justifyContent: 'center'
    }
}));

function UploadMessageInput(){
    const [input_Message_file, setInput_Message_File] = useState({});
    const [loadProgress, setLoadProgress] = useState(false);
    const classes = useStyles();
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [ValidationMsg, setValidationMsg] = useState("")
    const handleInputFileChange = (e) => {
        console.log(e.target.files)
        console.log(e.target.files[0]);
        let input_message_file = e.target.files[0]
        setInput_Message_File({
            selectedInputFile: input_message_file
        })
    }
    const upload_InputMessage_data = () => {
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
            setSuccess(true)
        }).catch(err => {
            setLoadProgress(false);
            setValidationMsg(`${err.message}`)
            setFailed(true)
        })
    }

    const Validation = () => {
        if (success){
        setTimeout(()=>{
            setSuccess(false)
            },5000)
        return(
                <Stack sx={{ width: '80%' }} spacing={2}>
                <Alert severity="success">Data Upload Successufly!</Alert>
                </Stack>
            )
        }else if (failed) {
            setTimeout(()=>{
                setFailed(false)
              },5000)
              return(
                <Stack sx={{ width: '100%', height: '60%' }} spacing={2}>
                <Alert severity="error">{ValidationMsg}</Alert>
              </Stack>
                )
        }  else {
            return(
                    <div> </div>
                )
        }
    }

    return(
    <div className={classes.container}>
        <div>
        <Validation />
        </div>
        <Grid className={classes.Grid} container spacing={3}>
            <div className={classes.div}>
                <input className={classes.input} id="contained-button-file" multiple type="file" onChange={(e) => handleInputFileChange(e)} />
                <Button className={classes.button} onClick={(e) => upload_InputMessage_data(e)} id="show" variant="contained" component="span">Upload Input Message Data</Button>
            </div>
            <br></br>
        </Grid>
        {loadProgress ? <CircularProgress style={{ marginLeft: '400px' }} /> : ""}
    </div>
    )
}
export default UploadMessageInput;
 /* Input message data file upload */
