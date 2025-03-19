import { RecordType } from "zod";
import { DisorderModel, IDisorder, IPain } from "./pain.interface";
import {Pain } from "./pain.model"

const getAllPainsFromDB = async (query:Record<string,any>) => {
    
    const painTypes = await Pain.find() 
  .populate({
    path: "disorders",
    select: "_id type isHidden" 
  })
  .select("_id title disorders isHidden") 
  .lean(); // Co
    return painTypes
      
}

const createPainIntoDB = async (content:Partial<IPain>) => {
    const pain = new Pain(content)
    await pain.save();
    return pain
}

const updatePainIntoDB = async (id:string,content:Partial<IPain>) => {
    const pain = await Pain.findByIdAndUpdate(id,content,{new:true})
    return pain
}

const deletePainFromDB = async (id:string) => {
    const pain = await Pain.findByIdAndDelete(id)
    return pain
}

const updateDisorderToDB = async (pain_id:string,content:any) => {
    const pain = await Pain.findById(pain_id);
    if (!pain) {
        throw new Error('Pain not found!')
    }
    const disorder = pain.disorders.findIndex(item=> item._id?.toString()==content._id);
    
    if(disorder === -1){
        throw new Error('Disorder not found in pain!')
    }
    pain.disorders[disorder] = content;
    await pain.save();
    
    return pain

}
const deleteDisOrderFromDB = async (pain_id:string,disorder_id:any) => {
    const pain = await Pain.findById(pain_id);
    if (!pain) {
        throw new Error('Disorder not found!')
    }
    pain.disorders=pain.disorders.filter(item=> item._id !=disorder_id)
    await pain.save();
    return pain
}





const createDisorderIntoPain = async (pain_id:string,disorder_name:string) => {
    const pain = await Pain.findById(pain_id)
    if(!pain){
        throw new Error('Pain not found!')
    }
    pain.disorders.push({type:disorder_name})
    await pain.save();
    return pain
}

export const PainService = {
    getAllPainsFromDB,
    updateDisorderToDB,
    deleteDisOrderFromDB,
    createDisorderIntoPain,
    createPainIntoDB,
    updatePainIntoDB,
    deletePainFromDB,
}