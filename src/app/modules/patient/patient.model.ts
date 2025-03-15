import { Schema, Types, model } from "mongoose";
import { IPatient, PatientModel } from "./patient.interface";
import { PainModel } from "../pain/pain.interface";

const patientSchema = new Schema<IPatient,PatientModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    aptNumber: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    insuranceCompany: { type: String },
    memberId: { type: String,required: true },
    reasonsForVisit: { type: [String],required:true },
    sensorySymptoms: { type: [String],required: true },
    ethnicity: { type: String, },
    orderingPhysician: { type: Schema.Types.ObjectId,required: true,ref:"User" },
   
  },
  { timestamps: true }
);

patientSchema.statics.isPatientExist = async (patient:Partial<IPatient>) =>{
  const pateintExist = await Patient.findOne({memberId:patient.memberId,name:patient.name})
  const pateintId = pateintExist?._id?pateintExist: await Patient.create(patient)
  return pateintId

}

export const Patient = model<IPatient,PatientModel>("Patient", patientSchema);

