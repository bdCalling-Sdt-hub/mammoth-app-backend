import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { MedicalTermsService } from "./medical_terms.service";
import sendResponse from "../../../shared/sendResponse";

const getAllMedicalTerms = catchAsync(
    async (req:Request,res:Response)=>{
        const query = req.query;
        const medicalTerms = await MedicalTermsService.getAllMedicalTermsFromDB(query);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Medical Terms retrieved successfully",
            data: medicalTerms
        });
    }
)

const createMedicalTerms = catchAsync(
    async (req:Request,res:Response)=>{
        const content = req.body;
        const medicalTerm = await MedicalTermsService.createMedicalTermToDB(content);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Medical Term created successfully",
            data: medicalTerm
        });
    }
)

const updateMedicalTerms = catchAsync(
    async (req:Request,res:Response)=>{
        const { id } = req.params;
        const content = req.body;
        const updatedMedicalTerm = await MedicalTermsService.updateMedicalTermFromDB(id, content);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Medical Term updated successfully",
            data: updatedMedicalTerm
        });
    })

const deleteMedicalTerms = catchAsync(
    async (req:Request,res:Response)=>{
        const { id } = req.params;
        await MedicalTermsService.deleteMedicalTermFromDB(id);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Medical Term deleted successfully"
        });
    })

export const MedicalTermsController = {
    getAllMedicalTerms,
    createMedicalTerms,
    updateMedicalTerms,
    deleteMedicalTerms,
 
}