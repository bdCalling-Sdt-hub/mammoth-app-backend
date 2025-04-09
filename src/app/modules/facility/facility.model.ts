import { model, Schema } from "mongoose";
import { FacilityModel, IClinicalSymptops, IFacility, IFacilityDisorders, IReasons } from "./facility.interface";
import { User } from "../user/user.model";



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
export const clinical_symptomsSchema = new Schema<IClinicalSymptops>({
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
    facilityId: { type: String },
    accountType: { type: String, required: true },
    representative: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Active", "Blocked"], required: false,default: "Active" },
    doctors: [],
    disorders: [facilityDisordersSchema],
    reasons: [reasonsSchema],
    clinical_symptoms: [clinical_symptomsSchema]
})

facilitySchema.virtual("doctor", {
    ref: "User", // Reference to User model
    localField: "address", // Field in Facility
    foreignField: "facility_location", // Matching field in User
    justOne: false, // Expecting multiple users
  });
  
  facilitySchema.set("toJSON", { virtuals: true });
  facilitySchema.set("toObject", { virtuals: true });
  


export const Facility = model<IFacility,FacilityModel>("Facility",facilitySchema)