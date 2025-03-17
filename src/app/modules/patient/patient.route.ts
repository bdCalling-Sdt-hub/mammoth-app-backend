import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PatientValidation } from './patient.validation';
import { PatientController } from './patient.controller';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();
router.post("/intake",auth(USER_ROLES.ADMIN,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),validateRequest(PatientValidation.createPatientReportBiopsyZodSchema),PatientController.createPaitentInfo)
router.get("/",auth(),PatientController.getAllPatients)
router.get("/:id",auth(),PatientController.getPatientDataById)
router.put("/:id",auth(USER_ROLES.ADMIN,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),validateRequest(PatientValidation.createPatientReportBiopsyZodSchema.partial()),PatientController.updatePatientDataById)

router.delete("/:id",auth(USER_ROLES.ADMIN,USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),PatientController.deletePatientDataById)

export const PatientRoutes = router