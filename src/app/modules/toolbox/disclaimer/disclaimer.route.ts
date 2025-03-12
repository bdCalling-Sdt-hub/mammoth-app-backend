
import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { DisclaimerValidation } from './disclaimer.validation';
import { DisclaimerController } from './disclaimer.controller';

const router = express.Router();

router.post("/",auth(USER_ROLES.ADMIN),validateRequest(DisclaimerValidation.createDisclaimerZodSchema),DisclaimerController.createDisclaimer)

router.get("/:type",auth(),DisclaimerController.getDisclaimer)

export const DisclaimerRoutes = router