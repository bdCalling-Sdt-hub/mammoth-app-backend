import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IBill } from "./bill.interface";
import { Bill } from "./bill.model";
import { Report } from "../report/report.model";
import { REPORT_STATUS } from "../../../enums/report";
import { Query, Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";

const createBillRecordToDB = async (billInfo:IBill)=>{
    const report = await Bill.checkReport(billInfo.report)
    if(!report){
        throw new ApiError(StatusCodes.UNAUTHORIZED,'Report is Not Eligable for bill')
    }
    const bill = await Bill.create(billInfo)
    await Report.findOneAndUpdate({_id:billInfo.report},{status:REPORT_STATUS.FINAL})
    return bill;
}

const getAllBillRecordsFromDB = async (query:Record<string,any>)=>{
    const bills = new QueryBuilder(Bill.find(),query).paginate()
    const paginatationInfo = await bills.getPaginationInfo();
    const billsData = await bills.modelQuery.populate({
        path:'report',
        select: ['patient','doctor','facility_location','report_no',"ordering_provider"],
        populate: [
            {
                path: 'patient',
                select: 'name _id'
            },
            {
                path: 'doctor',
                select: 'name _id'
            },
        ],
    }).sort({bill_date:-1}).lean()
    const tempArray:any[] = billsData
    const filteredArray =tempArray.filter(row =>{
        const search = query.searchTerm?.toLowerCase()
        return (row?.report?.patient?.name?.toLowerCase().includes(search) || row?.report?.doctor?.name?.toLowerCase().includes(search) || row?.report.facility_location?.toLowerCase().includes(search) || row?.report_no?.toString().includes(search) ) && (query.isBilled!==""?query?.isBilled=='true' ? row.isBilled==true : row.isBilled==false:true)
    })
    return {bills:filteredArray, paginatationInfo};
    
}

const getBillRecordFromDB = async (bill_id:Types.ObjectId)=>{
    const bill = await Bill.findById(bill_id).populate({
        path:'report',
        populate: [
            {
                path: 'patient',
                select: 'name _id'
            },
            {
                path: 'doctor',
                select: 'name _id'
            },
        ],
    })
    return bill
}

const changeBillStatusFromDB = async (bill_id:Types.ObjectId, status:boolean)=>{
    const bill = await Bill.findOneAndUpdate({_id:bill_id}, {isBilled: status}, {new: true})
    return bill;
}

export const BillService = {
    createBillRecordToDB,
    getAllBillRecordsFromDB,
    getBillRecordFromDB,
    changeBillStatusFromDB,
}