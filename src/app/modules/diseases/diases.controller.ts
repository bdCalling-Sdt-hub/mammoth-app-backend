import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DieasesService } from "./dieases.service";
import sendResponse from "../../../shared/sendResponse";

const getAllDieases = catchAsync(
    async(req:Request,res:Response)=>{
        const query = req.query;
        const dieases = await DieasesService.getAllDieasesFromDB();
        sendResponse(res, {
            success: true,
            statusCode: 200,
            data: dieases,
        });
    }
)

const addNewDieases = catchAsync(
    async(req:Request,res:Response)=>{
        const body = req.body;
        const result = await DieasesService.addNewDieasesIntoDB(body);
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Dieases added successfully",
            data: result,
        });
    }
)

const deleteDieases = catchAsync(
    async(req:Request,res:Response)=>{
        const { id } = req.params;
        const result = await DieasesService.deleteDieasesFromDB(id);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Dieases deleted successfully",
            data: result,
        });
    }
)

const updateDieases = catchAsync(
    async(req:Request,res:Response)=>{
        const { id } = req.params;
        const body = req.body;
        const result = await DieasesService.updateDieasesFromDB(id, body);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Dieases updated successfully",
            data: result,
        });
    })

const addDisorderIntoDieases = catchAsync(
    async(req:Request,res:Response)=>{
        const { id } = req.params;
        const body = req.body;
        
        const result = await DieasesService.addDisorderIntoDieasesIntoDB(id, body);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Disorder added successfully to dieases",
            data: result,
        });
    })

const deleteDisorderFromDieases = catchAsync(
    async(req:Request,res:Response)=>{
        const { id } = req.params;
        const { disorder_id } = req.body;
        const result = await DieasesService.removeDisorderIntoDieasesIntoDB(id, disorder_id);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Disorder deleted successfully from dieases",
            data: result,
        });
    })

export const DieasesController = {
    getAllDieases,
    addNewDieases,
    deleteDieases,
    updateDieases,
    addDisorderIntoDieases,
    deleteDisorderFromDieases,
}