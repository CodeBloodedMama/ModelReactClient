import axios from 'axios'

export default async function removeModel({addData, callback}){

    // Makes a put request to remove specified model from a specified job in backend API
    const token = localStorage.getItem("token");
    const config = {
        headers: {Authorization: 'Bearer ' + token}
    }
    const url = "https://localhost:7181/api/Jobs/" + addData.jobId + "/model/" + addData.modelId;
    let message = "";
    let success = false;
    await axios.post(url,addData.body, config).then(function(response) {
        console.log(response);
        if(parseInt(response.status)/200 >= 2){
            message = "Something wrong";
            return {success, message};
        }
        success = true;
        message = "Added model to job " + addData.jobId;
        console.log("REQUEST APPROVED")
        callback(message);
        return {success, message};
    })
        .catch(function(error){
            console.log(error);
            message = "Unspecified error received";
            return {success, message};
        });
}