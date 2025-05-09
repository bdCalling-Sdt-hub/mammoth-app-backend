import { Document, Model, Types } from "mongoose";
import { Patient } from "./patient.model";

export interface IPatient {
    firstname: string;
    lastname:string;
    email: string;
    phone: string;
    address: string;
    aptNumber?: string;
    gender: "Male" | "Female" | "Other";
    dateOfBirth: Date;
    insuranceCompany: string;
    memberId: string;
    reasonsForVisit: string[];
    sensorySymptoms: string[];
    ethnicity: string;
    orderingPhysician: Types.ObjectId;
    name: string;
    patientId?: string;
    status:"delete"|"active"
  }
  

  export type PatientModel = Model<IPatient>&{
    isPatientExist(patient:Partial<IPatient>):Promise<any>
    updateName(id:Types.ObjectId):Promise<void>
  }
  