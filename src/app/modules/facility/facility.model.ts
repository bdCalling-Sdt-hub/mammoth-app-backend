import { model, Schema } from "mongoose";
import { FacilityModel, IClinicalSymptops, IFacility, IFacilityDisorders, IReasons } from "./facility.interface";



const facilityDisordersSchema = new Schema<IFacilityDisorders>({
    name: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
    disorders: [
        {
            name: { type: String, required: true },
            isHidden: { type: Boolean, default: false }
        }
    ]
})

const reasonsSchema = new Schema<IReasons>({
    name: { type: String, required: true },
    isHidden: { type: Boolean, default: false }
})
const clinical_symptomsSchema = new Schema<IClinicalSymptops>({
    title: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
    disorders: [
        {
            name: { type: String, required: true },
            isHidden: { type: Boolean, default: false },
            sides: [String]
        }
    ]
})

const facilitySchema = new Schema<IFacility,FacilityModel>({
    name: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    address: { type: String, required: true },
    suite: { type: String },
    notificationEmail1: { type: String, required: true },
    notificationEmail2: { type: String },
    fax: { type: String },
    accountType: { type: String, required: true },
    representative: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Active", "Blocked"], required: false,default: "Active" },
    doctors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    disorders: [facilityDisordersSchema],
    reasons: [reasonsSchema],
    clinical_symptoms: [clinical_symptomsSchema]
})

export const Facility = model<IFacility,FacilityModel>("Facility",facilitySchema)