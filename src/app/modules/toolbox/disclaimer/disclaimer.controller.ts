import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { DisclaimerService } from "./disclaimer.service";
import sendResponse from "../../../../shared/sendResponse";
import { DisType } from "./disclaimer.interface";

const createDisclaimer = catchAsync(
    async (req:Request,res:Response)=>{
        const body = req.body;

        
        const result = await DisclaimerService.saveAnyDisclaimerToDB(body);
        sendResponse(res,{
            success: true,
            statusCode: 200,
            message: 'Disclaimer created successfully',
            data: result
        })
    }
)

const getDisclaimer = catchAsync(
    async (req:Request,res:Response)=>{
        const type = req.params.type;
        const result = await DisclaimerService.getDisclaimerFromDB(type as DisType)
        sendResponse(res,{
            success: true,
            statusCode: 200,
            message: 'Disclaimer fetched successfully',
            data: result
        })
    }
)

export const DisclaimerController ={
    createDisclaimer,
    getDisclaimer
}