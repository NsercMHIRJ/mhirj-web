import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/components/_analysis.scss';
import { createStyles } from "@material-ui/core/styles";
import UploadMessageInput from './MessageInput/UploadMessageInput'
import ShowSaveEditData from './MessageInput/ShowSaveEditData'


const useStyles = makeStyles((theme) => createStyles({
  paper: {
    width: '100vw',
    color: "white"
  },
 
  card: {
    backgroundColor: "#003F67",
    textAlign: 'center',
    justify: 'center',
    padding: '5px',
  },
Grid : {
  margin: '0 auto',
  display: 'block !important' 
},
container: {
  
}


}));

export default function FileUpload() {
	const classes = useStyles();

	return (
		<div>
			<form className={classes.form}>
				<Paper className={classes.paper}>
					<div className={classes.card}>
						<h2>INPUT MESSAGE DATA</h2>
					</div>
          < UploadMessageInput />
					<div className={classes.container}>
						<Grid className={classes.Grid} container spacing={3}>
            <div style={{ width: '100vw', backgroundColor: "#003F67", height: '35px', display: 'flex', justifyContent: 'space-around' }}>
								<h3>UPDATE INPUT MESSAGE DATA</h3>
							</div>
                <ShowSaveEditData />
						</Grid>
					</div>
				</Paper>
			</form>
		</div>
	);
}