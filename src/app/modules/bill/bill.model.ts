import { model, Schema, Types } from "mongoose";
import { BillModel, IBill } from "./bill.interface";
import { Report } from "../report/report.model";
import { REPORT_STATUS } from "../../../enums/report";

const billSchema = new Schema<IBill,BillModel>({
    report: {
        type: Schema.Types.ObjectId,
        ref: "Report",
        required: true
    },
    bill_date: {
        type: Date,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    isBilled: {
        type: Boolean,
        required: false,
        default: false
    }

})

billSchema.statics.checkReport = async (report_id:Types.ObjectId) => {
    const report = await Report.findOne({_id:report_id})
    const isExistInBill = await Bill.findOne({report:report_id})
    return report && !isExistInBill 

}

export const Bill = model<IBill,BillModel>("Bill", billSchema)