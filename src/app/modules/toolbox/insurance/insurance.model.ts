import mongoose, { Schema } from "mongoose"
import { IInsurance, InsuranceModel } from "./insurance.interface"

const insuranceSchema = new Schema<IInsurance,InsuranceModel>({
    name: { type: String, required: true },
})

insuranceSchema.statics.isInsuranceExist=async (name:string):Promise<boolean>=>{
    const insurance = await Insurance.findOne({name})
    return Boolean(insurance)

}

export const Insurance = mongoose.model<IInsurance,InsuranceModel>('Insurance', insuranceSchema)