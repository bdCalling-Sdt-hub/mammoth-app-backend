

import express from 'express';
import auth from '../../middlewares/auth';
import { ReportController } from './report.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { ReportValidation } from './report.validation';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.get("/",auth(),ReportController.getAllTestReports)

router.get("/:id",auth(),ReportController.getTestReportById)

router.put("/status/:id",auth(USER_ROLES.ADMIN,USER_ROLES.HISTOLOGIST),ReportController.changeReportStatus)
router.put("/doc/:id",auth(USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),fileUploadHandler(),ReportController.uploadDocuments)

router.delete("/doc/:id",auth(USER_ROLES.PATHOLOGIST,USER_ROLES.HISTOLOGIST),ReportController.deleteDocuments)

router.put("/biopsy/:id",auth(USER_ROLES.PATHOLOGIST),validateRequest(ReportValidation.updateBiopsySamplesZodSchema.partial()),ReportController.updateBiopsySamples)

router.post("/note/:id",auth(USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST,USER_ROLES.ADMIN),validateRequest(ReportValidation.addNoteZodSchema),ReportController.addNoteInReport)
export const ReportRoutes = router

