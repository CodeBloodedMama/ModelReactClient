import React, {useEffect, useState} from 'react';
import JobListingModel from './JobListingModel';
import '../Styles/viewJobs.css';
import getJobs from "../Fetchers/getJobs";
import addNewExpense from "../Requests/addNewExpense";
import ModalAddForm from "./ModalAddForm";

// Creates and renders job dashboard for Managers.
export default function ViewJobsMinimal() {
    const [cards, setCards] = useState([])
    const [myJobs, setmyJobs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [msg, setMsg] = useState("");


    // Fetches jobs again and rerenders the view
    const handleRerender = (index) => {
        console.log("handling rerender")
        getJobs().then((result) => {
            console.log(result)
            setmyJobs(result);
        })
    }

    const postExpense = (inputModel) => {
        console.log(inputModel)
        addNewExpense(inputModel).then((result) => {
                console.log(result)
                if (result.success) {
                    setMsg(result.msg);
                    setTimeout(() => {
                        handleRerender();
                    }, 600)
                }
            },
            (onReject) => {
                console.log(onReject)
            })
            .catch((reason) => {
                console.log(reason)
                setMsg("Submission failed. Make sure all fields are filled");
            })
    }


    // Send post request to add a new job. Rerender
    const onModalClose = ({inputModel, submit}) => {
        setModalOpen(false);
        if (submit) {
            console.log(inputModel);
            postExpense(inputModel);
        }
    }

    const onButtonClick = () => {
        console.log("Button clicked")
        setModalOpen(true);
    }

    useEffect(() => {
        handleRerender()
    }, [])

    // Creates a list of cards with jobs to display
    const createEntries = async function () {
        let entries = []
        for (let i = 0; i < myJobs.length; i++) {
            let temp = (
                <div key={i}>
                    <JobListingModel
                        jobData={{
                            jobId: myJobs[i].jobId,
                            customer: myJobs[i].customer,
                            location: myJobs[i].location,
                            comments: myJobs[i].comments,
                            startdate: myJobs[i].startDate,
                            days: myJobs[i].days
                        }} listingId={i}/>
                </div>
            )
            entries.push(temp);
        }
        setCards(entries);
    }

    useEffect(() => {
        const createData = async () => {
            console.log("CALLED CREATE DATA")
            await createEntries()
        }
        createData()
    }, [myJobs])

    // For some reason if modal is not wrapped in a container, it will not turn on properly on rerender
    function ModalContainer() {
        return (
            <ModalAddForm openPar={modalOpen} callback={onModalClose}/>
        )
    }

    function CardsContainer() {
        return (
            <div className="cards-container-model">
                {cards}
            </div>
        )
    }
    return(
        <div className='entries-model'>
            <h2>See your jobs here</h2>
            <p>{msg}</p>
            <CardsContainer/>
        </div>
    )
}