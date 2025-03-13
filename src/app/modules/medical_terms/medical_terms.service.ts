import { IMedicalTerms } from "./madical_terms.interface"
import { MedicalTerms } from "./medical_terms.model"

const getAllMedicalTermsFromDB = async (query:Record<string,any>)=>{
    const medicalTerms = await MedicalTerms.find(Boolean(query.type)?{type:query.type}:{})
    return medicalTerms
}

const createMedicalTermToDB = async (contnt:Partial<IMedicalTerms>)=>{
    const medicalTerm = await MedicalTerms.create(contnt)
    return medicalTerm
}

const updateMedicalTermFromDB = async (id:string,content:Partial<IMedicalTerms>)=>{
    const medicalTerm = await MedicalTerms.findByIdAndUpdate(id,content,{new:true})
    return medicalTerm
}

const deleteMedicalTermFromDB = async (id:string)=>{
    const medicalTerm = await MedicalTerms.findByIdAndDelete(id)
    return medicalTerm
}

export const MedicalTermsService = {
    getAllMedicalTermsFromDB,
    createMedicalTermToDB,
    updateMedicalTermFromDB,
    deleteMedicalTermFromDB
}

