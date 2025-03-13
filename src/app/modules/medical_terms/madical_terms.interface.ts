import { Model } from "mongoose";

export type IMedicalTerms ={
    content:string;
    type:"medical_diagnosis"|"pain_description"
}

export type MedicalTermsModel = Model<IMedicalTerms>