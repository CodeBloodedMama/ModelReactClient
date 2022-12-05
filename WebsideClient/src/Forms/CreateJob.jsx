import "../Styles/CreateManager.css"
import { useState } from "react"
import axios from "axios";

export default function CreateJob({callback}){
    const [inputModel, setInputModel] = useState([]);
    const [error, setError] = useState("");

    const ClearFields = () =>{
        setInputModel({customer: "", startDate: "", location: "", days: 0, comments: ""})
    }

    const handleChange = function(event){
        setInputModel({...inputModel, [event.target.name]: event.target.value});
    };

    const handleClick = () => {
        console.log("handling button click")
        callback(inputModel);
        ClearFields();
    }

    return(
        <div className="post-container">
            <p>{error}</p>
            <form className="post-form">
                <label>
                    Customer: &nbsp;
                    <input type="text" name="customer" onChange={handleChange}
                           value={inputModel.customer || ''}></input>
                </label>
                <label>
                    Start Date: &nbsp;
                    <input type="date" name="startDate"
                           onChange={handleChange} value={inputModel.startDate ||''}
                    ></input>
                </label>
                <label>
                    Location: &nbsp;
                    <input type="text" name="location" value={inputModel.location || ''} onChange={handleChange}></input>
                </label>
                <label>
                    Days: &nbsp;
                    <input type="number" name = "days" onChange={handleChange}
                           value={inputModel.days || ''}></input>
                </label>
                <label>
                    Comments: &nbsp;
                    <input type="text" name="comments" value={inputModel.comments || ''} onChange={handleChange}></input>
                </label>
                <input type="submit" value="Submit new job" onClick={handleClick} style={{height:30, margin:"10px", fontSize:"18px"}}></input>
            </form>
        </div>
    )
}