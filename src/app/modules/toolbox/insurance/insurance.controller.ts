import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { InsuranceService } from "./insurance.service";
import sendResponse from "../../../../shared/sendResponse";

const saveInsurance= catchAsync(
    async (req:Request,res:Response)=>{
        const {name} = req.body
        const user = req.user
        const insurance = await InsuranceService.saveInsuranceToDB(name,user)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Insurance saved successfully",
            data: insurance,
        })
    }
)

const getInsurances= catchAsync(
    async (req:Request,res:Response)=>{
        const query = req.query
        const insurances = await InsuranceService.getInsurancesFromDB(query)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Insurances retrieved successfully",
            data: insurances,
        })
    })

const updateInsurance= catchAsync(
    async (req:Request,res:Response)=>{
        const {name} = req.body
        const {id} = req.params
        const updatedInsurance = await InsuranceService.updateInsurancesFromDB(id, {name})
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Insurance updated successfully",
            data: updatedInsurance,
        })
    })

const deleteInsurance= catchAsync(
    async (req:Request,res:Response)=>{
        const {id} = req.params
        await InsuranceService.deleteInsurancesFromDB(id)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Insurance deleted successfully",
        })
    })

export const InsuranceController = {
    saveInsurance,
    getInsurances,
    updateInsurance,
    deleteInsurance,
}