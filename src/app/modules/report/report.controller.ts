import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ReportService } from "./report.service";
import sendResponse from "../../../shared/sendResponse";
import fs from "fs"
import { join } from "path";
const getAllTestReports = catchAsync(
    async (req:Request,res:Response)=>{

        const query = req.query;
        const testReports = await ReportService.getAllTestReportsFromDB(query);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            pagination:testReports.paginations,
            data: testReports.reports
        });
    }
)

const getTestReportById = catchAsync(
    async (req:Request,res:Response)=>{
        const {id} = req.params;
        const testReport = await ReportService.getTestReportFromDB(id);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            data: testReport
        });
    })

const uploadDocuments = catchAsync(
    async (req:Request,res:Response)=>{
        const {id } = req.params;
        const files:any = req.files
        const original_name = files.doc.length?files.doc[0].originalname:""
        const path = `/doc/${files.doc[0].filename||""}`
        const report = await ReportService.uploadDocumentsInReportToDB(id as any,{name:original_name,path})
        
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Documents uploaded successfully",
            data: report
        });
    })

const deleteDocuments = catchAsync(
    async (req:Request,res:Response)=>{
        const {id } = req.params;
        const {path} = req.body;
        fs.unlinkSync(join(process.cwd(),"uploads",path))
        const report = await ReportService.deleteDocumentsInReportToDB(id as any,path)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Documents deleted successfully",
            data: report
        });
    })



const updateBiopsySamples = catchAsync(async (req:Request,res: Response)=>{
    const {id } = req.params;
    const {samples,additional_details} = req.body;
    const user = req.user
    const report = await ReportService.updateBiopsySamples(id,samples,additional_details,user)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Biopsy samples updated successfully",
        data: report
    });
})

const addNoteInReport = catchAsync(async (req:Request,res: Response)=>{
    const {id } = req.params;
    const {note} = req.body;
    const report = await ReportService.addNoteInReportInDB(id,note)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Note added successfully",
        data: report
    });
})


const changeReportStatus = catchAsync(async (req:Request,res: Response)=>{
    const {id } = req.params;
    const {status} = req.body;
    const user = req.user
    const report = await ReportService.changeReportStatus(id,status,user)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Report status updated successfully",
        data: report
    });
})



export const ReportController = {
    getAllTestReports,
    getTestReportById,
    uploadDocuments,
    updateBiopsySamples,
    addNoteInReport,
    deleteDocuments,
    changeReportStatus
}