import React from "react";
import ReactDOM from "react-dom";

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import 'bootstrap/dist/css/bootstrap.css';
/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
const msalInstance = new PublicClientApplication(msalConfig);

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
ReactDOM.render(
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>,
    document.getElementById("root")
);
