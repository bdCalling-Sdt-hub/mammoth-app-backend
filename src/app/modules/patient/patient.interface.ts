import { Model } from "mongoose";

export interface IPatient {
    name: string;
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
    orderingPhysician: string;
  }
  

  export type PatientModel = Model<IPatient>;
  