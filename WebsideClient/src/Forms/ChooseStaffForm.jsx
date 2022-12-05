import React from 'react';
import CreateManager from "./CreateManager"
import CreateModel from "./CreateModel"

export default function ChooseStaffForm({discriminator}){
    if(discriminator == "Model") {
        return (
            <CreateModel/>
        );
    }
    else{
        return(
            <CreateManager/>
        )
    }
}