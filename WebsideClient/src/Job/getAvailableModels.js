import GetModels from "../Fetchers/getModels";


export default async function getAvailableModels(active){
    // Because Backend API does NOT send ModelId with GET Jobs call we have to do this
    let models = await GetModels();
    let idsToRemove = [];
    let filtered = models;
    for(let i = 0; i < active.length; i++){
        for(let j = 0; j < models.length; j++){
            if(models[j].firstName == active[i].firstName && models[j].lastName == active[i].lastName){
                idsToRemove.push(models[j].efModelId)
            }
        }
        if(idsToRemove.length > 0){
            filtered = models.filter((item) =>{
                return(!idsToRemove.includes(item.efModelId))
            } )
        }
    }
    return filtered;
}