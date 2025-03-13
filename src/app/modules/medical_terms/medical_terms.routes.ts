

import express from 'express';
import auth from '../../middlewares/auth';
import { MedicalTermsController } from './medical_terns.controller';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { MedicalTermsValidation } from './medical_terms.validation';

const router = express.Router();

router.get("/",auth(),MedicalTermsController.getAllMedicalTerms)
router.post("/",auth(USER_ROLES.ADMIN),validateRequest(MedicalTermsValidation.createMedicalTermsZodSchema),MedicalTermsController.createMedicalTerms)
router.put("/:id",auth(USER_ROLES.ADMIN),validateRequest(MedicalTermsValidation.createUpdateMedicalTermsZodSchema),MedicalTermsController.updateMedicalTerms)
router.delete("/:id",auth(USER_ROLES.ADMIN),MedicalTermsController.deleteMedicalTerms)

export const MedicalTermsRoutes = router