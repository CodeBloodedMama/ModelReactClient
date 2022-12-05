import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import "../Styles/small-modal.css"
import CreateExpense from "../Forms/CreateExpense";

export default function ModalAddExpense({openPar, callback}){
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
                    Add new expense
                </Typography>

                <CreateExpense callback={handleSubmit} />
            </Box>

        </Modal>
    )
}