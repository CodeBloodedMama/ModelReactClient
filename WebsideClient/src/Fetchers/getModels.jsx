import axios from 'axios';


export default async function GetJobs(){
    const BaseUrl = "https://localhost:7181/api/Models";
    const token = localStorage.getItem("token");
    const config = {
        headers: {Authorization: 'Bearer ' + token}
    }
    const response = await axios.get(BaseUrl, config);
    const data = response.data;
    let models = [];
    data.forEach(element => {
        models.push(element);
    });
    return models;
}