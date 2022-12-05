import React, {useEffect, useState} from 'react';
import axios from 'axios';
import JobListing from './JobListing';
import '../Styles/viewJobs.css';
import getAvailableModels from "./getAvailableModels";
import getJobs from "../Fetchers/getJobs";
import ModalAddForm from "./ModalAddForm";
import addNewJob from "../Requests/addNewJob"

// Creates and renders job dashboard for Managers.
export default function ViewJobs({jobs}){
    const [count, setCount] = useState(0);
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true);
    const [allJobs, setAllJobs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");


    // Fetches jobs again and rerenders the view
    const handleRerender = (index) =>{
        console.log("handling rerender")
        getJobs().then((result) =>{
            console.log(result)
            setAllJobs(result);
        })
    }

    const postJob = (inputModel) => {
        console.log(inputModel)
        addNewJob(inputModel).
            then((result) => {
            console.log(result)
            if(result.success){
                setMsg(result.msg);
                setTimeout(() =>{
                    handleRerender();
                },600)
            }
        },
        (onReject) =>  {
            console.log(onReject)
        })
        .catch((reason) => {
            console.log(reason)
            setMsg("Submission failed. Make sure all fields are filled");
        })
    }


    // Send post request to add a new job. Rerender
    const onModalClose = ({inputModel, submit}) => {
        console.log("on modal close")
        setModalOpen(false);
        if(submit){
            console.log(inputModel);
            postJob(inputModel);
        }
    }

    const onAddJobClick = () => {
        console.log("Button clicked")
        setModalOpen(true);
    }

    useEffect(() => {
        handleRerender()
    }, [])

    // Creates a list of cards with jobs to display
    const createEntries = async function() {
        let entries = []
        for(let i = 0; i < allJobs.length; i++){
            await getAvailableModels(allJobs[i].models).then((result) => {
                let temp = (
                    <div key={i}>
                        <JobListing
                            jobData = {{
                                jobId : allJobs[i].jobId,
                                customer : allJobs[i].customer,
                                location : allJobs[i].location,
                                comments : allJobs[i].comments,
                                startdate : allJobs[i].startDate,
                                days : allJobs[i].days,
                                models : allJobs[i].models
                            }} available={result} reRender={handleRerender} listingId={i} />
                    </div>
                )
                entries.push(temp);
            })
        }
        setCards(entries);
    }

    useEffect(() => {
        setLoading(true)
        const createData = async () => {
            console.log("CALLED CREATE DATA")
            await createEntries().then(() => {
                setLoading(false);
            });
        }
        createData()
    }, [allJobs])

    // For some reason if modal is not wrapped in a container, it will not turn on properly on rerender
    function ModalContainer(){
        return(
            <ModalAddForm openPar={modalOpen} callback={onModalClose}/>
        )
    }
    function CardsContainer(){
        return(
            <div>
                {cards}
            </div>
        )
    }
    return(
        <div className='entries'>
            <p>{msg}</p>
            <div className="button-container">
                <button className="add-job-button" onClick={onAddJobClick}>Add job</button>
                <ModalContainer/>
            </div>
            <CardsContainer/>
        </div>
    )

}