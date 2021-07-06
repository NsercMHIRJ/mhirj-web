import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from '@material-ui/core/Button';

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
       
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        
    }
    return (
        
  
  <>
  <Button  variant="contained"  onClick={handleLogout} style={{ backgroundColor: "#001C3E", color: "WHITE", marginRight: "0px" }}>Sign Out</Button>
</>


 
    )
}

