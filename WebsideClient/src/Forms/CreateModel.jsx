import "../Styles/CreateManager.css"
import { useState } from "react"
import axios from "axios";

export default function CreateModel(){
    const [inputModel, setInputModel] = useState([]);
    const [date, setDate] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    let url = "https://localhost:7181/api/Models";
    let result = {success: false};
    const ClearFields = () =>{
        setInputModel({firstName: "", lastName: "", email: "", password: "", address1: "",
            address2: "", zip: "", country: "", nationality: "", date: new Date(Date.now) , height: 160, shoesize: 37,
            haircolor: "", eyecolor: "", comments: "", phone: ""
        })
    }
    const PostAddManager = async function(){
        const config = {
            headers: {Authorization: 'Bearer ' + token}
        }
        await axios.post(url,{
            firstName : inputModel.firstName,
            lastName : inputModel.lastName,
            email : inputModel.email,
            password : inputModel.password,
            phoneNo : inputModel.phone,
            addresLine1 : inputModel.address1,
            addresLine2 : inputModel.address2,
            zip : inputModel.zip,
            birthDate : new Date(inputModel.birthDate),
            city : inputModel.city,
            country : inputModel.country,
            nationality : inputModel.nationality,
            height : inputModel.height,
            shoeSize : inputModel.shoesize,
            hairColor : inputModel.haircolor,
            eyeColor : inputModel.eyecolor,
            comments : inputModel.comments
        }, config).then(function(response) {
            console.log(response);
            if(parseInt(response.status)/200 >= 2){
                setError("Something wrong");
                return false;
            }
            setError("Request approved. Added a new model!");
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
                <div className="post-form">
                    <h3>
                        Model Details
                    </h3>
                    <label>
                        Phone : &nbsp;
                        <input type="text" name="phone" onChange={handleChange}
                               value={inputModel.phone || ''}></input>
                    </label>
                    <label>
                        Address line 1: &nbsp;
                        <input type="text" name="address1" onChange={handleChange}
                               value={inputModel.address1 || ''}></input>
                    </label>
                    <label>
                        Address line 2: &nbsp;
                        <input type="text" name="address2"
                               onChange={handleChange} value={inputModel.address2 ||''}
                        ></input>
                    </label>
                    <label>
                        Zip: &nbsp;
                        <input type="text" name="zip" value={inputModel.zip || ''} onChange={handleChange}></input>
                    </label>
                    <label>
                        City: &nbsp;
                        <input type="text" name = "city" onChange={handleChange}
                               value={inputModel.city || ''}></input>
                    </label>
                    <label>
                        Country: &nbsp;
                        <input type="text" name = "country" onChange={handleChange}
                               value={inputModel.country || ''}></input>
                    </label>
                    <label>
                        Birth Date: &nbsp;
                        <input type="date" name = "birthDate" onChange={(event) => {
                            setInputModel({...inputModel, birthDate: [event.target.value]});
                        }} value={inputModel.birthDate || ''}></input>
                    </label>
                    <label>
                        Nationality: &nbsp;
                        <input type="text" name = "nationality" onChange={handleChange}
                               value={inputModel.nationality || ''}></input>
                    </label>
                    <label>
                        Height in cm: &nbsp;
                        <input type="number" name = "height" onChange={handleChange}
                               value={inputModel.height || ''}></input>
                    </label>
                    <label>
                        Shoe size: &nbsp;
                        <input type="number" name = "shoesize" onChange={handleChange}
                               value={inputModel.shoesize || ''}></input>
                    </label>
                    <label>
                        Hair color: &nbsp;
                        <input type="text" name = "haircolor" onChange={handleChange}
                               value={inputModel.haircolor || ''}></input>
                    </label>
                    <label>
                        Eye color: &nbsp;
                        <input type="text" name = "eyecolor" onChange={handleChange}
                               value={inputModel.eyecolor || ''}></input>
                    </label>
                    <label>
                        Comments: &nbsp;
                        <input type="text" name = "comments" onChange={handleChange}
                               value={inputModel.comments || ''}></input>
                    </label>
                </div>

                <input type="submit" value="Submit" onClick={onSubmission} style={{height:30, margin:"10px", fontSize:"18px"}}></input>
            </form>
        </div>
    )
}
