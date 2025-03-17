import { IDieases } from "./dieases.interface"
import { Dieases } from "./dieases.model"

const getAllDieasesFromDB = async () =>{
    const dieases = await Dieases.find({})
    return dieases
}

const addNewDieasesIntoDB = async (content:Partial<IDieases>) =>{
    const dieases = new Dieases(content)
    await dieases.save()
    return dieases
}

const updateDieasesFromDB = async (id:string,content:Partial<IDieases>)=>{
    const dieases = await Dieases.findByIdAndUpdate(id,content,{new:true})
    return dieases
}

const deleteDieasesFromDB = async (id:string)=>{
    const dieases = await Dieases.findByIdAndDelete(id)
    return dieases
}

const addDisorderIntoDieasesIntoDB = async (dieases_id:string,disorder_name:string)=>{
    const dieases = await Dieases.findOneAndUpdate({_id:dieases_id},{$push:{disorders:disorder_name}})

    
    if(!dieases){
        throw new Error('Dieases not found!')
    }
    return dieases
}

const removeDisorderIntoDieasesIntoDB = async (dieases_id:string,id:string)=>{
    const dieases = await Dieases.findOneAndUpdate({_id:dieases_id},{$pull:{disorders:{_id:id}}})
    if(!dieases){
        throw new Error('Dieases not found!')
    }
    return dieases
}

const updateDisorderIntoDiasesIntoDB = async (id:string,disorder_id:string,name:string)=>{
    const dieases = await Dieases.findById(id)
    if(!dieases){
        throw new Error('Dieases not found!')
    }
    dieases.disorders.forEach(item=> {
        if(item._id?.toString()===disorder_id){
            item.name = name
        }
    })
    await dieases.save();

    return dieases
}

export const DieasesService = {
    getAllDieasesFromDB,
    addNewDieasesIntoDB,
    updateDieasesFromDB,
    deleteDieasesFromDB,
    addDisorderIntoDieasesIntoDB,
    removeDisorderIntoDieasesIntoDB,
    updateDisorderIntoDiasesIntoDB
}