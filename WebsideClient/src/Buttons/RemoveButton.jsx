import React from 'react';
import "./Button.css"

export default function RemoveButton({buttonData, callback}){
    const handleClick = () => {
        callback(buttonData)
    }

    return(
        <button onClick={handleClick}><img src={require("./remove.png")} alt="remove" /></button>
    )
}