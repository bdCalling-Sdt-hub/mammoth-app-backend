import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IBill } from "./bill.interface";
import { BillService } from "./bill.service";
import sendResponse from "../../../shared/sendResponse";

const createBill = catchAsync(
    async (req:Request,res:Response)=>{
        const {bill_date,report,total_amount} = req.body;
        const bill = await BillService.createBillRecordToDB({bill_date:new Date(bill_date),report,total_amount });
        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Bill created successfully",
            data: bill,
        })
    }
)

const getAllBills = catchAsync(
    async (req:Request,res:Response)=>{
        const query = req.query
        const bills = await BillService.getAllBillRecordsFromDB(query)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Bills retrieved successfully",
            pagination: bills.paginations,
            data: bills.bills,
        })
    })

const getSingleBillInfo = catchAsync(
    async (req:Request,res:Response)=>{
        const billId:any = req.params.id
        const bill = await BillService.getBillRecordFromDB(billId)
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Bill retrieved successfully",
            data: bill,
        })
    })

const updateBillStatus = catchAsync(
    async (req:Request,res:Response)=>{
        const {id} = req.params;
        const {status} = req.body;
        const updatedBill = await BillService.changeBillStatusFromDB(id as any, status);
        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Bill status updated successfully",
            data: updatedBill,
        })
    })



export const BillController = {
    createBill,
    getAllBills,
    getSingleBillInfo,
    updateBillStatus,
}