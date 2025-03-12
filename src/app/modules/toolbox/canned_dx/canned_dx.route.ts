
import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { CannedDxValidation } from './canned_dx.validation';
import { CannedDxController } from './canned_dx.controller';

const router = express.Router();

router.post("/",auth(USER_ROLES.ADMIN),validateRequest(CannedDxValidation.createCannedDxZodSchema),CannedDxController.createCannedDX)

router.get("/",auth(),CannedDxController.getCannedDXList)

router.put("/:id",auth(USER_ROLES.ADMIN),validateRequest(CannedDxValidation.createUpdateCannedDxZodSchema),CannedDxController.updateCannedDx)

router.delete("/:id",auth(USER_ROLES.ADMIN),CannedDxController.deleteCannedDx)

export const CannedDxRoutes = router;