import React, {useState, useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArticleIcon from '@mui/icons-material/Article';
import { withStyles } from "@material-ui/core/styles";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const defaultToolbarStyles = {
  iconButton: {
  },
};

const AnalysisCustomToolbar = (props) => {
  const {classes} = props;   

  return (
    <>
      <Tooltip title={ props.openSearch ? "Hide Search Modal" : "Show Search Modal"}>
        <IconButton 
          className={classes.iconButton} 
          onClick={()=> props.toggleSearchModal()}>
          { props.openSearch ? <SearchOffIcon /> : <ManageSearchIcon /> }
        </IconButton>
      </Tooltip>
    </>
  );
}

export default withStyles(defaultToolbarStyles, { name: "AnalysisCustomToolbar" })(AnalysisCustomToolbar);
