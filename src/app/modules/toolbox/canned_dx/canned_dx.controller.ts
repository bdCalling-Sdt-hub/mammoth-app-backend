import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { CannedDxService } from "./canned_dx.service";
import sendResponse from "../../../../shared/sendResponse";

const createCannedDX = catchAsync(
    async (req:Request,res:Response) => {
        const { ...cannedDXData } = req.body;
        const result = await CannedDxService.addCannedDxToDB(cannedDXData);
        sendResponse(res,{
            success: true,
            statusCode: 201,
            message: 'CannedDX created successfully',
            data: result
        })
    }
)

const getCannedDXList = catchAsync(
    async (req:Request,res:Response) => {
        const result = await CannedDxService.getAllCannedDxFromDB();
        sendResponse(res,{
            success: true,
            statusCode: 200,
            message: 'CannedDX list retrieved successfully',
            data: result
        })
    })

const updateCannedDx = catchAsync(
    async (req:Request,res:Response) => {
        const { id } = req.params;
        const {...cannedDXData } = req.body;
        const result = await CannedDxService.updateCannedDxFromDB(id,cannedDXData.content);
        sendResponse(res,{
            success: true,
            statusCode: 200,
            message: 'CannedDX updated successfully',
            data: result
        })
    })

const deleteCannedDx = catchAsync(
    async (req:Request,res:Response) => {
        const { id } = req.params;
        const result = await CannedDxService.deleteCannedDxFromDB(id);
        sendResponse(res,{
            success: true,
            statusCode: 200,
            message: 'CannedDX deleted successfully',
            data: result
        })
    })

export const CannedDxController = {
    createCannedDX,
    getCannedDXList,
    updateCannedDx,
    deleteCannedDx
}