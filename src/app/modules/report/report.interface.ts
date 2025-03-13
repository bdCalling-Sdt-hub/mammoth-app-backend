import { Types } from "mongoose";
import { IDieases } from "../diseases/dieases.interface";
import { IMedicalTerms } from "../medical_terms/madical_terms.interface";
import { IClinicalSymptops } from "../facility/facility.interface";
export type IBiopsySample={
    sample_area:string;
    sample_side:string;
    specimen_id:string
}
export type IReport={
    report_no:number;
    patient_id:Types.ObjectId;
    doctor_id:Types.ObjectId;
    dieases:IDieases[],
    date:Date;
    medical_terms:IMedicalTerms[];
    clinical_sympttoms:IClinicalSymptops[];


}