import "../Styles/CreateManager.css"
import { useState } from "react"
import axios from "axios";

export default function CreateExpense({callback}){
    const [inputModel, setInputModel] = useState([]);
    const [error, setError] = useState("");

    const ClearFields = () =>{
        setInputModel({date: "", text: "", amount: 0})
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
                    Date: &nbsp;
                    <input type="date" name="date"
                           onChange={handleChange} value={inputModel.date ||''}
                    ></input>
                </label>
                <label>
                    Description: &nbsp;
                    <input type="text" name="text" value={inputModel.text || ''} onChange={handleChange}></input>
                </label>
                <label>
                    Amount: &nbsp;
                    <input type="number" name = "amount" onChange={handleChange}
                           value={inputModel.amount || ''}></input>
                </label>
                <input type="submit" value="Submit new job" onClick={handleClick} style={{height:30, margin:"10px", fontSize:"18px"}}></input>
            </form>
        </div>
    )
}