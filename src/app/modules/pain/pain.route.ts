import express from 'express';
import auth from '../../middlewares/auth';
import { PainController } from './pain.controller';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { PainValidation } from './pain.validation';

const router = express.Router();

router.get("/",auth(),PainController.getPains)
router.patch("/:id",auth(USER_ROLES.ADMIN),PainController.changeHideOfPain)
router.put("/disorder/:id",auth(USER_ROLES.ADMIN),PainController.updateDisorderInPain)
router.patch("/disorder/:id",auth(USER_ROLES.ADMIN),PainController.changeHideOfDisorder)
router.delete("/disorder",auth(USER_ROLES.ADMIN),validateRequest(PainValidation.deleteDisorderZodSchema),PainController.deleteDisorderFromPain)
router.post("/disorder",auth(USER_ROLES.ADMIN),validateRequest(PainValidation.createDisorderZodSchema),PainController.createDisorderIntoPain)

export const PainRoutes = router