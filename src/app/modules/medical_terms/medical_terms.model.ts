import { model, Schema } from "mongoose";
import { IMedicalTerms, MedicalTermsModel } from "./madical_terms.interface";


export const MedicalTermsSchema = new Schema<IMedicalTerms,MedicalTermsModel>({
    content: {
        type: String,
        required: true,
 
    },
    type: {
        type: String,
        enum: ["medical_diagnosis", "pain_description"],
        required: true,
    }
})
   
export const MedicalTerms = model<IMedicalTerms,MedicalTermsModel>("MedicalTerms",MedicalTermsSchema)