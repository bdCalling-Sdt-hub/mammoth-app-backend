import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IPatient } from "./patient.interface";
import { IBiopsySample, IReport } from "../report/report.interface";
import { PatientService } from "./patient.service";
import sendResponse from "../../../shared/sendResponse";
import { downloadHelper } from "../../../helpers/downloadHelper";

const createPaitentInfo = catchAsync(
    async (req:Request,res:Response)=>{
        const {patient_info,report_info,biopsy_info}:{patient_info:IPatient,report_info:IReport,biopsy_info:IBiopsySample[]}=req.body
        const patient = await PatientService.createPatientInfoInDB(patient_info,report_info,biopsy_info);
        sendResponse(res,{
            success: true,
            statusCode: 201,
            message: 'Patient information created successfully',
            data: patient
        })
    }
)

// const downloadPatientData = catchAsync(
//     async (req:Request,res:Response)=>{
//         const query = req.query
//         const data = await PatientService.downloadAllPatientInfoFromDB(query)
//         query?.download=='pdf'? await downloadHelper.pdfDownload(res,data,"Patients Information"):await downloadHelper.excelDownload(res,data)
//     })


const getAllPatients = catchAsync(
    async (req:Request,res:Response)=>{
        const query = req.query
        const patients = await PatientService.getAllPatientInfoFromDB(query)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Patients retrieved successfully",
            pagination: patients.paginatationInfo,
            data: patients.patients,
        })
    })

const getPatientDataById = catchAsync(
    async (req:Request,res:Response)=>{
        const patientId:any = req.params.id
        const patient = await PatientService.getPatientInfoFromDB(patientId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Patient data retrieved successfully",
            data: patient,
        })
    })

const updatePatientDataById = catchAsync(
    async (req:Request,res:Response)=>{
        const patientId:any = req.params.id
        const updatedPatient = await PatientService.updatePatientInfoInDB(patientId,req.body)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Patient data updated successfully",
            data: updatedPatient,
        })
    })
    
const deletePatientDataById = catchAsync(
    async (req:Request,res:Response)=>{
        const patientId:any = req.params.id
        await PatientService.deletePatientInfoFromDB(patientId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Patient data deleted successfully",
        })
    })
    
    



export const PatientController = {
    createPaitentInfo,
    getAllPatients,
    getPatientDataById,
    updatePatientDataById,
    deletePatientDataById,
    // downloadPatientData,
}