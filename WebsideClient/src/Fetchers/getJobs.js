import axios from "axios";

export default async function getJobs(){
    const BaseUrl = "https://localhost:7181/api/Jobs";
    const token = localStorage.getItem("token");
    const config = {
        headers: {Authorization: 'Bearer ' + token}
    }
    const response = await axios.get(BaseUrl, config);
    const data = response.data;
    let allJobs = [];
    data.forEach(element => {
        allJobs.push(element);
    });
    return(allJobs)
}