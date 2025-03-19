import express from 'express';
import auth from '../../middlewares/auth';
import { PainController } from './pain.controller';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { PainValidation } from './pain.validation';

const router = express.Router();
router.get("/",auth(),PainController.getPains)
router.post("/",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),validateRequest(PainValidation.createPainZodSchema),PainController.createPain)
router.put("/pain/:id",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),validateRequest(PainValidation.createUpdatePainZodSchema),PainController.updatePain)

router.delete("/:id",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),PainController.deletePain)
router.put("/disorder/:pain_id",auth(USER_ROLES.ADMIN),PainController.updateDisorderInPain)
router.patch("/disorder",auth(USER_ROLES.ADMIN),validateRequest(PainValidation.deleteDisorderZodSchema),PainController.deleteDisorderFromPain)
router.post("/disorder",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),validateRequest(PainValidation.createDisorderZodSchema),PainController.createDisorderIntoPain)

export const PainRoutes = router