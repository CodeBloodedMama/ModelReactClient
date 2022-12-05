import '../Styles/JobListing.css'
import getModels from '../Fetchers/getModels'
import RemoveButton from '../Buttons/RemoveButton'
import removeModel from "../Requests/removeModel";
import addModelToJob from "../Requests/addModelToJob"
import getModelId from './getModelId';
import {useEffect, useState} from "react";
import AddButton from "../Buttons/AddButton";
import ModalAddModel from "./ModalAddModel";
import getAvailableModels from "./getAvailableModels";
import ModalAddForm from "./ModalAddForm";
import ModalAddExpense from "./ModalAddExpense";
import jwt_decode from "jwt-decode";
import addNewExpense from "../Requests/addNewExpense";

export default function JobListingModel({jobData, listingId}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");

    let date = new Date(jobData.startdate).toISOString().split('T')[0];

    const handleClick = () =>{
        console.log("Expense button clicked");
        setModalOpen(true);
    }

    const postExpense = (expData) =>{
        addNewExpense(expData).then((response) =>{
            console.log(response)
            if(response.success){
                setMsg("Added a new expense!");
            }
            else{
                setMsg(response.msg);
            }
        })
    }

    const onModalClose = ({inputModel, submit}) =>{
        setModalOpen(false);
        if(submit){
            let tok = jwt_decode(localStorage.getItem("token"));
            console.log(inputModel)
            const expData = {jobId: jobData.jobId, modelId : tok.ModelId
                ,date : inputModel.date, text: inputModel.text, amount: inputModel.amount}
            postExpense(expData);
        }
    }

    function ModalContainer(){
        return(
            <div className="button-container">
                <button className="centered-button" onClick={handleClick}>Log expense</button>
                <ModalAddExpense openPar={modalOpen} callback={onModalClose}/>
            </div>
        )
    }
    return(
        <div className="job-listing">
            <p>{msg}</p>
            <div className="row">
                <div className="column-left">
                    <p>Customer: </p>
                    <p>Location: </p>
                    <p>Start Date: </p>
                    <p>Duration in days: </p>
                    <p>Comments: </p>
                </div>
                <div className="column-right">
                    <p>{jobData.customer} </p>
                    <p>{jobData.location}</p>
                    <p>{date}</p>
                    <p>{jobData.days} days</p>
                    <p>{jobData.comments}</p>
                </div>
            </div>
            <ModalContainer/>
        </div>
    )
}