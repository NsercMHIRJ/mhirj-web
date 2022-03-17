
  import React, { useEffect, useImperativeHandle, useState} from 'react';
  import EditIcon from "@material-ui/icons/Edit";
  import { FormControlLabel } from '@material-ui/core';
  import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
  import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
  import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

      
    const MatEdit = ({ index  }) => {

        const [isEdit, setIsEdit] = useState(false);

        const [expand, setExpand] = useState(false);

        const handleExpandClick = (index) => {
            setExpand(!expand);
          };
    
          const handleEidtClick = (index) => {
                setIsEdit(!isEdit)
                index.api.setRowMode(index.id, isEdit ? 'edit' : 'view')
            }

        useEffect(()=>{
            console.log(index,isEdit);
        })

       
        return (
        <div>
        <FormControlLabel
            control={
            <IconButton
                color="primary"
                aria-label="add an alarm"
                onClick={()=> handleExpandClick(index)}
            >
                { expand ? <ExpandLessSharpIcon style={{ fontSize:'28px'}}/> : <ExpandMoreSharpIcon  style={{ fontSize:'28px'}}/>}
            </IconButton>
            }
        />
        <FormControlLabel
        control={
            <IconButton     
            color={!isEdit ? "inherit" : "secondary"}
            aria-label="add an alarm"
            onClick={() => handleEidtClick(index)}
            id={`EditId${index.row.id}`}
            >
            { isEdit ? <CheckIcon style={{ fontSize:'28px'}}/>  :<EditIcon style={{ fontSize:'28px'}}/>} 
            </IconButton>
        }
        />
        </div>
    
        );

    };


export default MatEdit;