import { Schema, model } from "mongoose";
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
    memberId: { type: String },
    reasonsForVisit: { type: [String] },
    sensorySymptoms: { type: [String] },
    ethnicity: { type: String },
    orderingPhysician: { type: String },
  },
  { timestamps: true }
);

export const Patient = model<IPatient,PatientModel>("Patient", patientSchema);
