import express, { Request, Response } from 'express';
import { Dieases } from './dieases.model';
import sendResponse from '../../../shared/sendResponse';
import auth from '../../middlewares/auth';
import { DieasesController } from './diases.controller';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { DieasesValidation } from './dieases.validation';

const router = express.Router();

router.get("/",auth(),DieasesController.getAllDieases)
router.put("/alt/:id",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST),DieasesController.updateDieases)
router.post("/",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST),validateRequest(DieasesValidation.createAddDieasesZodSchema),DieasesController.addNewDieases)

router.delete("/:id",auth(USER_ROLES.ADMIN,USER_ROLES.DOCTOR,USER_ROLES.PATHOLOGIST),DieasesController.deleteDieases)

router.put("/disorder/:id",auth(USER_ROLES.ADMIN,USER_ROLES.PATHOLOGIST,USER_ROLES.DOCTOR),DieasesController.addDisorderIntoDieases)

router.delete("/disorder/:id",auth(USER_ROLES.ADMIN,USER_ROLES.PATHOLOGIST,USER_ROLES.DOCTOR),DieasesController.deleteDisorderFromDieases)
export const DieasesRoutes = router