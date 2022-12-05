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

export default function JobListing({jobData, available, reRender, listingId}){

    const [deleteData, setDeleteData] = useState([]);
    const [count, setCount] = useState(0);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false);

    let date = new Date(jobData.startdate).toISOString().split('T')[0];

    const handleRemove = async (buttonData) => {
        console.log(buttonData);
        const id = await getModelId({firstName: buttonData.firstName, lastName : buttonData.lastName});
        if(typeof(buttonData) != typeof(undefined)){
            setDeleteData({jobId : buttonData.jobId, modelId : id});
        }
    }

    const onModalClose = (id) => {
        setModalOpen(false)
        if(typeof(id) != typeof(undefined)){
            const addData = {jobId: jobData.jobId, modelId: id}
            addModelToJob({addData: addData}).then((msg) =>{
                callback(msg);
            })
        }
    };

    const handleAdd = () => {
        setModalOpen(true);
    }

    const callback = (msg) => {
        console.log(msg)
        reRender(listingId);
    }

    useEffect(()=>{
        if(!count){
            setCount(1);
            return;
        }
        if(deleteData != null){
            removeModel({deleteData : deleteData , callback: callback});
        }
    }, [deleteData])

    function PopulateModels(){
        const [modelEntries, setModelEntries] = useState([])

        useEffect(() => {
            let entries  = []
            entries.push(<p key={999} >Models: </p>)
            for(let i = 0; i < jobData.models.length; i++){
                let temp = (<p key={i}>
                        {jobData.models[i].firstName} , {jobData.models[i].lastName}
                </p>
                )
                entries.push(temp);
            }
            setModelEntries(entries)
        }, [])

        return(
            <div className="column-right">
                {modelEntries}
                <AddButton callback={handleAdd}/>
                <ModalAddModel openPar={modalOpen} callback={onModalClose} models={available}/>
            </div>
        )
    }

    function AddButtons(){
        let buttons = []

        for(var i = 0; i < jobData.models.length; i++){
            const buttonData = {jobId : jobData.jobId,
                firstName : jobData.models[i].firstName, lastName : jobData.models[i].lastName}
            let temp = (
                <p key={i}>
                    <RemoveButton buttonData={buttonData} callback={handleRemove}/>
                </p>
            )
            buttons.push(temp);
        }
        return(
            <div className="column-right">
                <p dangerouslySetInnerHTML={lineBreak()}></p>
                {buttons}
            </div>
        )
    }

    function lineBreak() {
        return {__html: '<br/>'};
    }

    return(
        <div className="job-listing">
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

                <PopulateModels/>

                <AddButtons/>
            </div>
        </div>
    )
}