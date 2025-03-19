import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FacilityService } from "./facility.service";
import { Types } from "mongoose";

const createFacility = catchAsync(
    async (req:Request, res:Response) => {
        const facilityData = req.body;
        const result = await FacilityService.createFacilityToDB(facilityData)
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Facility created successfully",
            data: result
        });
    }
)

const getAllFacilities = catchAsync(
    async (req:Request, res:Response) => {
        const query = req.query
        const facilities = await FacilityService.getFacilitiesFromDB(query)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Facilities fetched successfully",
            pagination:facilities.paginatationInfo,
            data: facilities.list
        });
    })

const updateFacility = catchAsync(
    async (req:Request, res:Response) => {
        const facilityId:any = req.params.id
        const facilityData = req.body
        const result = await FacilityService.updateFacilityToDB(facilityId as Types.ObjectId, facilityData)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Facility updated successfully",
            data: result
        });
    })

const deleteFacility = catchAsync(
    async (req:Request, res:Response) => {
        const facilityId:any = req.params.id
        await FacilityService.deleteFacilityFromDB(facilityId as Types.ObjectId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Facility deleted successfully"
        });
    })

const addDoctorInFacility = catchAsync(
    async (req:Request, res:Response) => {
        const facilityId:any = req.params.id
        const doctorId:any = req.body.doctor_id
        await FacilityService.addDoctorToFacilityInDB(facilityId as Types.ObjectId, doctorId as Types.ObjectId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Doctor added successfully to facility"
        });
    })

const getSingleFacilityById = catchAsync(
    async (req:Request, res:Response) => {
        const facilityId:any = req.params.id
        const query = req.query
        const facility = await FacilityService.gotSingleFacilityFromDB(query,facilityId as Types.ObjectId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Facility fetched successfully",
            data: facility
        });
    })

const changeStatusOfFacility = catchAsync(
    async (req:Request, res:Response) => {
        const facilityId:any = req.params.id

        await FacilityService.changeStatusOFFacilityFromDB(facilityId as Types.ObjectId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Facility status changed successfully"
        });
    })
    




export const FacilityContoller = {
    createFacility,
    getAllFacilities,
    updateFacility,
    deleteFacility,
    addDoctorInFacility,
    getSingleFacilityById,
    changeStatusOfFacility
}