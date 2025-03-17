import { model, Schema } from "mongoose";
import { BiopsyModel, IBiopsySample, IReport, ReportModel } from "./report.interface";
import { dieasesSchema } from "../diseases/dieases.model";
import { MedicalTermsSchema } from "../medical_terms/medical_terms.model";
import { painSchema } from "../pain/pain.model";
import { clinical_symptomsSchema } from "../facility/facility.model";
import { REPORT_STATUS } from "../../../enums/report";



const reportSchema = new Schema<IReport,ReportModel>({
    report_no: {
        type: Number,
        required: true,
        unique: true,
    },
    status:{
        type: String,
        enum: Object.values(REPORT_STATUS),
        required: false,
        default: REPORT_STATUS.COLLECTED,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dieases: [dieasesSchema],
    apply_date: {
        type: Date,
        required: false,
        default:new Date(),
    },
    report_date: {
        type: Date,
        required: false,
        default:new Date(),
    },
    medical_terms: [MedicalTermsSchema],
    clinical_symptoms:[clinical_symptomsSchema],
    documents: [{
        name: { type: String, required: false },
        path: { type: String, required: false },
    }],
    biopsy_sample: [{
        type: Schema.Types.ObjectId,
        ref: "Biopsy",
        required: false,
    }],
    cpt: [String],
    icd: [String],
    facility_location: { type: String, required: true },
    ordering_provider: { type: String, required: true },
    additional_biopsies_details:{
        biopsies_demonstrate: { type: String, required: false },
        nerve_fibber_density_consistent: { type: String, required: false },
        neuropathy: [{ type: String, required: false }],
    },
    note: { type: String, required: false },
},{
    timestamps: true,
})

const biopsySchema = new Schema<IBiopsySample,BiopsyModel>({
    report_id: {
        type: Schema.Types.ObjectId,
        ref: "Report",
        required: true,
    },
    sample_area: {
        type: String,
        required: true,
    },
    sample_side: {
        type: String,
        required: true,
    },
    specimen_id: {
        type: String,
        required: true,
    },
    microscopic_diagnosis: {
        canned_dx: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
    },
    microscopic_examination: {
        type: String,
        required: false,
    },
    gross_description: {
        type: String,
        required: false,
    },
    comment: {
        type: String,
        required: false,
    },
})

export const Report = model<IReport, ReportModel>("Report", reportSchema)

export const Biopsy = model<IBiopsySample, BiopsyModel>("Biopsy", biopsySchema)