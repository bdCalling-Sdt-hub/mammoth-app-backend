import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { Biopsy, Report } from "./report.model";
import { additional_biopsies_details, IBiopsySample, IReport } from "./report.interface";
import { REPORT_STATUS } from "../../../enums/report";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { JwtPayload } from "jsonwebtoken";
import { USER_ROLES } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import { BillService } from "../bill/bill.service";
import { sendNotifications } from "../../../helpers/notificationHelper";

const getAllTestReportsFromDB = async (query:Record<string,any>)=>{
    
    const result = new QueryBuilder(Report.find({},{ordering_provider:1,facility_location:1,patient:1,apply_date:1,report_date:1,status:1,doctor:1,report_no:1}).sort({createdAt:-1}), query)
    const testReports = await result.modelQuery.populate(['patient',"doctor","facility_location"],['name',"address"]).exec()
    const tempArr:any[] = testReports
    
    const testReportsFinal = tempArr.filter(item=>{
        
        const search = query?.searchTerm?.toLowerCase()
        return ((!search) || (
            item?.doctor?.name?.toLowerCase().includes(search)||
            item?.patient?.name?.toLowerCase().includes(search)||
            item?.ordering_provider?.toLowerCase().includes(search)||
            item?.facility_location?.name?.toLowerCase().includes(search)||
            item?.facility_location?.address?.toLowerCase().includes(search)||
            item.status?.toLowerCase().includes(search)||
            item?.report_no?.toString().includes(search))
        )&&(
            (!query?.doctor || item?.doctor?.name?.toLowerCase()===query?.doctor.toLowerCase()) &&
            (!query?.status || item?.status?.toLowerCase() == query?.status.toLowerCase()) &&
            (!query?.facility || item?.facility_location?.name?.toLowerCase()==query?.facility?.toLowerCase()) 
        )
    })
    const arr = paginationHelper.paginateArray(testReportsFinal,query)
    return {reports:arr.data,paginations:arr.pagination}
}

const getTestReportFromDB = async (id:string)=>{
    const testReport = await Report.findById(id).populate([
        {
            path: 'biopsy_sample',
        },
        {
            path: 'doctor',
        },
        {
            path: 'patient',
            populate: 'orderingPhysician'
        },
        {
            path:"facility_location"
        }
    ]).exec()
    return testReport
}

const uploadDocumentsInReportToDB = async (report_id:Types.ObjectId,file:{name:string,path:string})=>{
    const report = await Report.findByIdAndUpdate(report_id, { $push: { documents: file } }, { new: true })
    return report
}
const deleteDocumentsInReportToDB = async (report_id:Types.ObjectId,filePath:string)=>{
    const report = await Report.findByIdAndUpdate(report_id, { $pull: { documents: { path: filePath } } }, { new: true })
    return report
}

const updateTestReportInDB = async (id:string,content:Partial<IReport>)=>{
    const testReport = await Report.findByIdAndUpdate(id,content,{new:true})
    return testReport
}

const deleteTestReportFromDB = async (id:string)=>{
    const testReport = await Report.findByIdAndDelete(id)
    return testReport
}

const updateTestReportStatusInDB = async (id:string, status:REPORT_STATUS)=>{
    const testReport = await Report.findByIdAndUpdate(id, { status }, { new: true })
    return testReport
}
const updateBiopsySamples = async (report_id:any,biopsy:Partial<IBiopsySample>[],additional_details:Partial<additional_biopsies_details>,user:JwtPayload)=>{
    const pathologist = await User.findOne({email:user.email})
    
    const report = await Report.findById(report_id)
    if(report?.status!=REPORT_STATUS.SENT_TO_HISTOLOGY){
        throw new ApiError(StatusCodes.BAD_REQUEST,"Report is not sent yet")
    }

    for(const data of biopsy){
        const updateData = await Biopsy.findByIdAndUpdate(data._id,data,{new:true})
    }

    const updateReport = await Report.findByIdAndUpdate(report_id,{
        additional_biopsies_details: additional_details,
        status:REPORT_STATUS.FINAL
    })

    await BillService.createBillRecordToDB({report:report_id,bill_date:new Date(),total_amount:0})

    return updateReport
}

const addNoteInReportInDB = async (id:string,note:string)=>{
    const updateReport = await Report.findByIdAndUpdate(id, { note }, { new: true })
    return updateReport
}

const changeReportStatus = async (report_id:string,status:string,user:JwtPayload)=>{
    const role = user.role
    const report = await Report.findOne({_id:report_id})
    if(role==USER_ROLES.HISTOLOGIST && report?.status==REPORT_STATUS.COLLECTED && status !== REPORT_STATUS.READY_FOR_PATHOLOGY){
        throw new ApiError(StatusCodes.BAD_REQUEST,"Report is not ready for pathology")
    }

    if(user.role==USER_ROLES.ADMIN && [REPORT_STATUS.READY_FOR_PATHOLOGY,REPORT_STATUS.SENT_TO_HISTOLOGY].includes(report?.status!)){
        throw new ApiError(StatusCodes.BAD_REQUEST,"Report is not ready for pathology")
    }

    if(report?.status==REPORT_STATUS.FINAL){
        throw new ApiError(StatusCodes.BAD_REQUEST,"Report is already final")
    }

    const updateReport = await Report.findByIdAndUpdate(report_id, { status }, { new: true })
    if(status==REPORT_STATUS.SENT_TO_HISTOLOGY){
       await sendNotifications({
            title:"Report Sent To Histology",
            text:`Report ${report?.report_no} has been sent to histology by ${user.name}.`,
            read:false,
            direction:"report",
            role:[USER_ROLES.DOCTOR,USER_ROLES.HISTOLOGIST,USER_ROLES.ADMIN],
            link:`${report_id}`
        },[USER_ROLES.DOCTOR,USER_ROLES.HISTOLOGIST,USER_ROLES.ADMIN])
    }

    if(status==REPORT_STATUS.READY_FOR_PATHOLOGY){
        await sendNotifications({
            title:"Report Sent To Pathology",
            text:`Report ${report?.report_no} has been sent to pathology by ${user.name}.`,
            read:false,
            direction:"report",
            role:[USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.ADMIN],
            link:`${report_id}`
        },[USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.ADMIN])
    }

    return updateReport
}
export const ReportService = {
    getAllTestReportsFromDB,
    getTestReportFromDB,
    uploadDocumentsInReportToDB,
    deleteDocumentsInReportToDB,
    updateTestReportInDB,
    deleteTestReportFromDB,
    updateTestReportStatusInDB,
    updateBiopsySamples,
    addNoteInReportInDB,
    changeReportStatus
}