import React, {useState} from 'react';
import axios from 'axios';
import Constants from '../utils/const';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => createStyles({
    container: {
      padding: '20px 40px',
    },
    Grid: {
      paddingLeft: '200px',
      margin: 'auto',
    },

      ProgressBar: {
          width: '320px'
      },
    faild:{
      background:'red',
      width:'23%',
      borderRadius: '25px',
      color:'white'
    }
}));

function UploadMessageInput(){
    const [input_Message_file, setInput_Message_File] = useState({});
    const [loadProgress, setLoadProgress] = useState(false);
    const classes = useStyles();
    
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
            alert("File Uploaded Successfully!")
        }).catch(err => {
            console.log(err);
        })
    }


    return(
    <div className={classes.container}>
        <Grid className={classes.Grid} container spacing={3}>
            <div>
                <input className={classes.input} id="contained-button-file" multiple type="file" onChange={(e) => handleInputFileChange(e)} />
                <Button type="button" style={{marginLeft: "370px", padding: "5px", backgroundColor: "#001c3e",color: "white"}} onClick={(e) => upload_InputMessage_data(e)}>Upload Input Message Data</Button>
            </div>
            <br></br>
        </Grid>
        {loadProgress ? <CircularProgress style={{ marginLeft: '580px' }} /> : ""}
    </div>
    )
}
export default UploadMessageInput;
 /* Input message data file upload */
