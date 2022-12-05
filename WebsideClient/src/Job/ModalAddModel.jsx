import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import Select from "react-select";
import "../Styles/small-modal.css"

export default function ModalAddModel({openPar, callback, models}){
    const [open, setOpen] = useState(openPar);
    const [options, setOptions] = useState([])
    const [choice, setChoice] = useState([])

    const handleClose = () => {
        setOpen(false);
        callback(choice.value);
    }

    useEffect(() =>{
        const opt = []
        for(let i = 0; i < models.length; i++){
            let lab = models[i].efModelId + " " + models[i].firstName + " " + models[i].lastName;
            let val = models[i].efModelId;
            const item = {value: val, label: lab}
            opt.push(item);
        }
        setOptions(opt)
    }, [])



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
                    Add model to job
                </Typography>
                <div className="select-container">
                    <Select options={options} onChange={(val) => setChoice(val)}/>
                    <button className="centered-button" onClick={handleClose}>Add</button>
                </div>
            </Box>

        </Modal>
    )


}

