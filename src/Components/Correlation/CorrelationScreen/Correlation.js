import React from 'react';
import PMTable from './PMTable';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width:'95vw',
  },
}));

const Correlation = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <PMTable />
    </div>
    
  );
};

export default Correlation;