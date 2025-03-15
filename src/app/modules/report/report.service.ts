import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { Biopsy, Report } from "./report.model";
import { additional_biopsies_details, IBiopsySample, IReport } from "./report.interface";
import { REPORT_STATUS } from "../../../enums/report";

const getAllTestReportsFromDB = async (query:Record<string,any>)=>{
    const result = new QueryBuilder(Report.find({},{ordering_provider:1,facility_location:1,patient:1,apply_date:1,report_date:1,status:1}), query).paginate().search(["doctor","facility_location","status"])
    const paginatationInfo = await result.getPaginationInfo();
    const testReports = await result.modelQuery.populate(['patient'],['name']).exec()
    return { testReports, paginatationInfo };
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
export const ReportService = {
    getAllTestReportsFromDB,
    getTestReportFromDB,
    uploadDocumentsInReportToDB,
    deleteDocumentsInReportToDB,
    updateTestReportInDB,
    deleteTestReportFromDB,
    updateTestReportStatusInDB,
    updateBiopsySamples,
    addNoteInReportInDB
}