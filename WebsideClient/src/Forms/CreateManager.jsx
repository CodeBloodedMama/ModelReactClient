import "../Styles/CreateManager.css"
import { useState } from "react"
import axios from "axios";

export default function CreateManager(){
    const [inputModel, setInputModel] = useState([]);
    const [date, setDate] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    let url = "https://localhost:7181/api/Managers";
    let result = {success: false};

    const ClearFields = () =>{
        setInputModel({firstName: "", lastName: "", email: "", password: ""})
    }
    const PostAddManager = async function(){
        const config = {
            headers: {Authorization: 'Bearer ' + token}
        }
        await axios.post(url,{
            firstName : inputModel.firstName,
            lastName : inputModel.lastName,
            email : inputModel.email,
            password : inputModel.password
        }, config).then(function(response) {
            console.log(response);
            if(parseInt(response.status)/200 >= 2){
                setError("Something wrong");
                return false;
            }
            setError("Success!");
            console.log("REQUEST APPROVED")
            ClearFields();
            return true;
        })
            .catch(function(error){
                console.log(error);
                setError("Error submitting request. Make sure no fields are empty");
                return false;
            });
    }

    const handleChange = function(event){
        console.log("handling change");
        setInputModel({...inputModel, [event.target.name]: event.target.value});
    };
    const onSubmission = async function(event){
        event.preventDefault();
        await PostAddManager();
    };

    return(
        <div className="post-container">
            <p>{error}</p>
            <form className="post-form">
                <label>
                    First Name: &nbsp;
                    <input type="text" name="firstName" onChange={handleChange}
                           value={inputModel.firstName || ''}></input>
                </label>
                <label>
                    Last Name: &nbsp;
                    <input type="text" name="lastName"
                           onChange={handleChange} value={inputModel.lastName ||''}
                    ></input>
                </label>
                <label>
                    Email: &nbsp;
                    <input type="text" name="email" value={inputModel.email || ''} onChange={handleChange}></input>
                </label>
                <label>
                    Password: &nbsp;
                    <input type="password" name = "password" onChange={handleChange}
                           value={inputModel.password || ''}></input>
                </label>
                <input type="submit" value="Submit" onClick={onSubmission} style={{height:30, margin:"10px", fontSize:"18px"}}></input>
            </form>
        </div>
    )
}