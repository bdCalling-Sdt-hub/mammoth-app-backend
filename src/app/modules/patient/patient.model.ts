import { Schema, Types, model } from "mongoose";
import { IPatient, PatientModel } from "./patient.interface";
import { PainModel } from "../pain/pain.interface";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const patientSchema = new Schema<IPatient,PatientModel>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
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
    name:String
   
  },
  { timestamps: true }
);

patientSchema.statics.isPatientExist = async (patient:Partial<IPatient>) =>{
  console.log("called");
  
  const pateintExist = await Patient.findOne({memberId:patient.memberId})
  const pateintId = pateintExist?._id?pateintExist: await Patient.create(patient)
  return pateintId

}
patientSchema.pre("save",function(next){
  this.name = this.firstname+" "+this.lastname
  next()
})
patientSchema.statics.updateName = async function (id:Types.ObjectId){
  const user = await Patient.findById(id)
  if(!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  const name = user.firstname+" "+user.lastname
  await Patient.findOneAndUpdate({_id:id},{name:name})
}
  

export const Patient = model<IPatient,PatientModel>("Patient", patientSchema);

