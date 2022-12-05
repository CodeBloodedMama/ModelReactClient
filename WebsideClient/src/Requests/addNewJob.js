import axios from "axios";

export default async function addNewJob(inputModel){
    const token = localStorage.getItem("token");
    let url = "https://localhost:7181/api/Jobs";
    let result = {success: false, msg: ""};
    let msg = "";
    let success = false;
    const config = {
        headers: {Authorization: 'Bearer ' + token}
    }
    await axios.post(url,{
        customer : inputModel.customer,
        startDate : inputModel.startDate,
        location : inputModel.location,
        days : inputModel.days,
        comments: inputModel.comments
    }, config).then(function(response) {
        console.log(response);
        if(parseInt(response.status)/200 >= 2){
            msg = "Something wrong";
            return success;
        }
        msg = "Request approved. Added a new manager";
        success = true;
        console.log("REQUEST APPROVED")
        return success;
    })
        .catch(function(error){
            console.log("error posting new job: " + error);
            msg = "Error submitting request. Make sure no fields are empty";
            console.log(result)
            return success;
        });
    return {success, msg};
}