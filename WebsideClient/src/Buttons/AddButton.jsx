import React from 'react';
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateModel from "../Forms/CreateModel"

import "./Button.css"


export default function AddButton({callback}){
    return(
        <button onClick={callback}><img src={require("./add.png")} alt="add" /></button>
    )
}


