import express, { Request, Response } from 'express';
import { Dieases } from './dieases.model';
import sendResponse from '../../../shared/sendResponse';

const router = express.Router();

router.get("/",async (req:Request,res:Response) => {
    const dieases =await Dieases.find()
    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Dieases retrieved successfully",
        data: dieases,
    })
})

export const DieasesRoutes = router