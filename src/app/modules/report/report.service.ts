import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { Biopsy, Report } from "./report.model";
import { additional_biopsies_details, IBiopsySample, IReport } from "./report.interface";
import { REPORT_STATUS } from "../../../enums/report";
import { paginationHelper } from "../../../helpers/paginationHelper";

const getAllTestReportsFromDB = async (query:Record<string,any>)=>{
    
    const result = new QueryBuilder(Report.find({},{ordering_provider:1,facility_location:1,patient:1,apply_date:1,report_date:1,status:1,doctor:1,report_no:1}).sort({createdAt:-1}), query)
    const testReports = await result.modelQuery.populate(['patient',"doctor","facility_location"],['name',"address"]).exec()
    const tempArr:any[] = testReports
    
    const testReportsFinal = tempArr.filter(item=>{
        const search = query?.searchTerm?.toLowerCase()
        return (Object.values(query).length==1 && search)?(
            item?.doctor?.name?.toLowerCase().includes(search)||
            item?.patient?.name?.toLowerCase().includes(search)||
            item?.ordering_provider?.toLowerCase().includes(search)||
            item?.facility_location?.name?.toLowerCase().includes(search)||
            item?.facility_location?.address?.toLowerCase().includes(search)||
            item.status?.toLowerCase().includes(search)||
            item?.apply_date?.toISOString().includes(search)||
            item?.report_date?.toISOString().includes(search)
        ):(
            (!query?.doctor || item?.doctor?.name?.toLowerCase()===query?.doctor.toLowerCase()) &&
            (!query?.status || item?.status?.toLowerCase().includes(query?.status.toLowerCase())) &&
            (!query?.facility_location || item?.facility_location?.name?.toLowerCase()==query?.facility_location.toLowerCase()) 
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
            select: 'name _id'
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
const updateBiopsySamples = async (report_id:string,biopsy:Partial<IBiopsySample>[],additional_details:Partial<additional_biopsies_details>)=>{
    const updateReport = await Report.findByIdAndUpdate(report_id,{
        additional_biopsies_details: additional_details
    })

    for(const data of biopsy){
        const updateData = await Biopsy.findByIdAndUpdate(data._id,data,{new:true})
    }
    return updateReport
}

const addNoteInReportInDB = async (id:string,note:string)=>{
    const updateReport = await Report.findByIdAndUpdate(id, { note }, { new: true })
    return updateReport
}

const changeReportStatus = async (report_id:string,status:string)=>{
    const updateReport = await Report.findByIdAndUpdate(report_id, { status }, { new: true })
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