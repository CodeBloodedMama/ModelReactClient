import React, {useEffect, useRef, useState} from 'react';
import CreateManager from "../../Forms/CreateManager";
import CreateModel from "../../Forms/CreateModel"
import {Route, Routes, useNavigate} from "react-router-dom";
import "../../Styles/ManagerAddStaff.css";
import ChooseStaffForm from "../../Forms/ChooseStaffForm";


export default function ManagerAddStaff(){
    const [selector, setSelector] = useState({model : true, manager : false, name: "Model"})
    const firstUpdate = useRef(true);

    const handleChange = (event) => {
        if(event.target.name == 'Model'){
            setSelector({model: true, manager: false, name:"Model"});
        }
        else{
            setSelector({model:false, manager: true, name:"Manager"});
        }
    }

    useEffect(() =>{
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        console.log("Model state changed! " + selector.model)

    }, [selector.model])

    return(
        <>
            <h3 className="staff-header">Add a staff member</h3>
        <div className="staffSelector">
            <label>
                <input type="checkbox" name="Model" checked={selector.model} onChange={handleChange}/>
                Model
            </label>
            <label>
                <input type="checkbox" name="Manager" checked={selector.manager} onChange={handleChange} />
                Manager
            </label>
        </div>
        <ChooseStaffForm discriminator={selector.name}/>
        </>
    )
}