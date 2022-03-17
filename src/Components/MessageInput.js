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
							<div style={{ margin: '20px 300px 10px -60px', height: '50px', width: '92vw', backgroundColor: "#C5D3E0", textAlign: 'center', justify: 'center', padding: '0px' }}>
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