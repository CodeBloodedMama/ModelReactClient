import axios from 'axios'
import GetModels from "../Fetchers/getModels";


export default async function getModelId({firstName, lastName}){
    // Because Backend API does NOT send ModelId with GET Jobs call we have to do this
    let models = await GetModels();
    console.log("CALLED GET MODEL ID")
    for(var i = 0; i < models.length; i++){
        console.log(firstName + " " + lastName);
        console.log(models[i])
        if(models[i].firstName == firstName && models[i].lastName == lastName){
            return models[i].efModelId;
        }

    }
    return -1;
}