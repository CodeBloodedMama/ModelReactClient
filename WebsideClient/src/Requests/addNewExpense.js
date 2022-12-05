import axios from 'axios'

export default async function addNewExpense(inputModel){
    const token = localStorage.getItem("token");
    let url = "https://localhost:7181/api/Expenses";
    let msg = "";
    let success = false;
    const config = {
        headers: {Authorization: 'Bearer ' + token}
    }
    await axios.post(url,{
        modelId : inputModel.modelId,
        date : inputModel.date,
        jobId : inputModel.jobId,
        text : inputModel.text,
        amount: inputModel.amount
    }, config).then(function(response) {
        console.log(response);
        if(parseInt(response.status)/200 >= 2){
            msg = "Something went wrong with the request. Try again";
        }
        else{
            msg = "Request approved. Added a new expense";
            success = true;
        }
    })
        .catch(function(error){
            msg = "Error submitting request. Make sure no fields are empty";
        });
    return {success, msg};
}