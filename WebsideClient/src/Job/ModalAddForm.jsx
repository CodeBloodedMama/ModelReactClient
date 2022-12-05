import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import Select from "react-select";
import "../Styles/small-modal.css"
import CreateJob from "../Forms/CreateJob";

export default function ModalAddForm({openPar, callback}){
    const [open, setOpen] = useState(openPar);

    const handleClose = () => {
        console.log("Modal handle close")
        setOpen(false);
        callback({submit: false});
    }

    const handleSubmit = (inputModel) =>{
        const submit = true;
        callback({inputModel, submit})
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new job
                </Typography>

                <CreateJob callback={handleSubmit} />
            </Box>

        </Modal>
    )
}