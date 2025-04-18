import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IBill } from "./bill.interface";
import { Bill } from "./bill.model";
import { Report } from "../report/report.model";
import { REPORT_STATUS } from "../../../enums/report";
import { Query, Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { path } from "pdfkit";
import { IReport } from "../report/report.interface";
import { Patient } from "../patient/patient.model";

const createBillRecordToDB = async (billInfo:IBill)=>{
    const id = Math.floor(Math.random() * 1000000).toString()
    const report = await Bill.checkReport(billInfo.report)
    if(!report){
        throw new ApiError(StatusCodes.UNAUTHORIZED,'Report is Not Eligable for bill')
    }
    const bill = await Bill.create({
        ...billInfo,
        billId:id,
    })
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
            {
                path:"facility_location",
                select:"name _id"
            }
            
        ],
    }).sort({bill_date:-1}).lean()
    
    
    const tempArray:any[] = billsData
  const filterArray = tempArray.filter((bill) => {
    const search = query?.searchTerm?.toLowerCase()
      return (!search ||
        bill?.report?.patient?.name?.toLowerCase().includes(search) ||
        bill?.report?.doctor?.name?.toLowerCase().includes(search) ||
        bill?.report?.facility_location?.name?.toLowerCase().includes(search)||
        bill?.report?.report_no?.toString().includes(search)
      ) && (!query?.status || bill?.isBilled === Boolean(query?.status==="true"?true:false))
  })

  const paginatedArray = paginationHelper.paginateArray(filterArray,query)
  return {bills:paginatedArray.data,paginations:paginatedArray.pagination}
  
  
}

const getBillRecordFromDB = async (bill_id:Types.ObjectId)=>{
    const bill = await Bill.findById(bill_id).populate([{
        path:'report',
        populate: [
            {
                path: 'doctor',
            },
            {
                path:"biopsy_sample"
            },
            {
                path:"facility_location"
            },
            {
                path:"patient"
            }
        ],
    }]).lean()
    const report = bill?.report as any as IReport
    const patient = await Patient.findOne({_id:report.patient}).populate('orderingPhysician').lean()
    return {
        patient,
        ...bill,
    }
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