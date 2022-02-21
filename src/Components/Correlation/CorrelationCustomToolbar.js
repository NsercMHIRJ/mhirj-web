import React, {useState, useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArticleIcon from '@mui/icons-material/Article';
import { withStyles } from "@material-ui/core/styles";
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';

const defaultToolbarStyles = {
  iconButton: {
  },
};

const CorrelationCustomToolbar = (props) => {
  const {classes} = props;   

  return (
    <>
      <Tooltip title={ props.openCorrelationModal ? "Hide Keywords" : "Show Keywords"}>
        { props.analysis &&
          <IconButton 
            className={classes.iconButton} 
            onClick={()=> props.toggleKeyword()}>
            { props.openCorrelationModal ? <KeyOffIcon /> : <KeyIcon /> }
          </IconButton>
        }
      </Tooltip>
      <Tooltip title={props.label}>
        <IconButton className={classes.iconButton} onClick={props.handleCorrelationReportChange}>
          <ArticleIcon className={classes.deleteIcon} />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default withStyles(defaultToolbarStyles, { name: "CorrelationCustomToolbar" })(CorrelationCustomToolbar);
