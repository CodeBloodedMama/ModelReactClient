import React, {useEffect, useState} from 'react';
import ViewJobs from "../../Job/ViewJobs";
import getJobs from "../../Fetchers/getJobs"

export default function ManagerJob(){
    return(
        <div className="dashboard">
            <ViewJobs/>
        </div>
    )
}