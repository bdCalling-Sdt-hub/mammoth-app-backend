import {Model, Types } from "mongoose"
import { IReport } from "../report/report.interface";

export type IBill = {
    report:Types.ObjectId;
    bill_date:Date;
    total_amount:number;
    isBilled?:boolean;
    billId?:string;
}

export type BillModel = Model<IBill>&{
    checkReport(report_id:Types.ObjectId):Promise<boolean>
}