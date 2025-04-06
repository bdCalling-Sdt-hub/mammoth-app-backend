import { Document, Model, Types } from "mongoose";
import { IDieases } from "../diseases/dieases.interface";
import { IMedicalTerms } from "../medical_terms/madical_terms.interface";
import { IClinicalSymptops } from "../facility/facility.interface";
import { REPORT_STATUS } from "../../../enums/report";
export type IBiopsySample={
    report_id:Types.ObjectId;
    sample_area:string;
    sample_side:string;
    specimen_id:string;
    microscopic_diagnosis:{
        canned_dx:string;
        description:string;
    },
    microscopic_examination:string;
    gross_description:string;
    comment:string;
 
}&Document
export type additional_biopsies_details={
    biopsies_demonstrate:string;
    nerve_fibber_density_consistent:string,
    neuropathy:string[]
}
export type IReport={
    report_no:number;
    patient:Types.ObjectId;
    doctor:Types.ObjectId;
    dieases:IDieases[],
    apply_date:Date;
    report_date:Date;
    medical_terms:IMedicalTerms[];
    clinical_symptoms:IClinicalSymptops[];
    documents:{
        name:string;
        path:string;
    };
    status:REPORT_STATUS,
    biopsy_sample:Types.ObjectId[],
    cpt:string[],
    icd:string[],
    ordering_provider:string;
    facility_location:string;
    additional_biopsies_details?:additional_biopsies_details,
    note?:string,
    
}
export type ReportModel = Model<IReport>
export type BiopsyModel = Model<IBiopsySample>