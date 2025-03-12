import { RecordType } from "zod";
import { IDisorder } from "./pain.interface";
import { Disorder, Pain } from "./pain.model"

const getAllPainsFromDB = async (query:Record<string,any>) => {
    
    const painTypes = await Pain.find(Boolean(query?.show_hidden)?{}:{ isHidden: false }) 
  .populate({
    path: "disorders",
    match: Boolean(query?.show_hidden)?{}:{ isHidden: false }, 
    select: "_id type isHidden" 
  })
  .select("_id title disorders isHidden") 
  .lean(); // Co
    return painTypes
      
}

const updateDisorderToDB = async (id:string,content:Partial<IDisorder>) => {
    const disorder = await Disorder.findByIdAndUpdate(id, content, {new: true})
    return disorder

}
const deleteDisOrderFromDB = async (pain_id:string,disorder_id:string) => {
    const disorder = await Disorder.findByIdAndDelete(disorder_id)
    if (!disorder) {
        throw new Error('Disorder not found!')
    }
    const pain = await Pain.findByIdAndUpdate(pain_id, {$pull: {disorders: disorder_id}}, {new: true})
    return disorder
}

const changeHideOfPainFormDB = async (id:string) => {
    const pain = await Pain.findOne({_id: id})
    const updatePain = await Pain.updateOne({_id: id},{isHidden:!pain?.isHidden})
    return updatePain
}

const changeHideOfDisorder = async (id:string) => {
    const disorder = await Disorder.findOne({_id: id})
    const updateDisorder = await Disorder.updateOne({_id: id},{isHidden:!disorder?.isHidden})
    return updateDisorder
}

const createDisorderIntoPain = async (pain_id:string,disorder_name:string) => {
    const disorder = await Disorder.create({type: disorder_name})
    if(!disorder){
        throw new Error('Disorder not found!')
    }
    const pain = await Pain.findByIdAndUpdate(pain_id, {$push: {disorders: disorder._id}}, {new: true})
    return disorder
}

export const PainService = {
    getAllPainsFromDB,
    updateDisorderToDB,
    deleteDisOrderFromDB,
    changeHideOfPainFormDB,
    changeHideOfDisorder,
    createDisorderIntoPain
}