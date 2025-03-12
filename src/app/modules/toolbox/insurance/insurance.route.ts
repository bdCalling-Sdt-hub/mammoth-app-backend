import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { InsuranceValidation } from './insurance.validation';
import { InsuranceController } from './insurance.controller';

const router = express.Router();

router.post('/',auth(USER_ROLES.ADMIN),validateRequest(InsuranceValidation.createSaveInsuranceZodSchema),InsuranceController.saveInsurance)

router.get('/',auth(),InsuranceController.getInsurances)

router.put('/:id',auth(USER_ROLES.ADMIN),InsuranceController.updateInsurance)

router.delete('/:id',auth(USER_ROLES.ADMIN),InsuranceController.deleteInsurance)

export const InsuranceRoutes = router;