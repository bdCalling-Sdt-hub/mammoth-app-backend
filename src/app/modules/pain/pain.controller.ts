import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PainService } from "./pain.service";
import sendResponse from "../../../shared/sendResponse";

const getPains = catchAsync(
    async (req:Request,res:Response) => {
        const query = req.query
        const pains = await PainService.getAllPainsFromDB( query);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            data: pains,
        });
    }
)

const createDisorderIntoPain =catchAsync(
 async (req:Request, res:Response) => {
    const {pain_id,disorder_name} = req.body
    const result = await PainService.createDisorderIntoPain(pain_id,disorder_name)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Disorder added successfully to pain',
        data: result,
    })
})

const deleteDisorderFromPain = catchAsync(
    async (req:Request,res:Response) => {
        const {pain_id,disorder_id} = req.body
        const result = await PainService.deleteDisOrderFromDB(pain_id,disorder_id)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Disorder deleted successfully from pain',
            data: result,
        })
    }
)

const updateDisorderInPain = catchAsync(
    async (req:Request,res:Response) => {
        const {pain_id}= req.params
        const content = req.body
        
        
        const result = await PainService.updateDisorderToDB(pain_id,content)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Disorder updated successfully in pain',
            data: result,
        })
    })



export const PainController =  {
    getPains,
    createDisorderIntoPain,
    deleteDisorderFromPain,
    updateDisorderInPain,
   
}