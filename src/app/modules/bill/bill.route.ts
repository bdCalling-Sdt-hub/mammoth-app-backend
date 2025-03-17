import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BillValidation } from './bill.validation';
import { BillController } from './bill.controller';
import { USER_ROLES } from '../../../enums/user';
const router = express.Router();

router.post("/",auth(),validateRequest(BillValidation.createBillZodSchema),BillController.createBill)
router.get("/",auth(),BillController.getAllBills)
router.get("/:id",auth(),BillController.getSingleBillInfo)
router.patch("/:id",auth(USER_ROLES.DOCTOR,USER_ROLES.ADMIN,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),validateRequest(BillValidation.updateBillStatusZodSchema),BillController.updateBillStatus)
export const BillRotues = router