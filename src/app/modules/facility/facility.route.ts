import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityContoller } from './facility.controller';

const router = express.Router();

router.post("/",auth(USER_ROLES.ADMIN),validateRequest(FacilityValidation.createFaciliyValidationZodSchema),FacilityContoller.createFacility)
router.get("/",auth(),FacilityContoller.getAllFacilities)

router.get("/:id",auth(),FacilityContoller.getSingleFacilityById)

router.put("/:id",auth(USER_ROLES.ADMIN,USER_ROLES.REPRESENTATIVE),validateRequest(FacilityValidation.createUpdateFacilityZodSchema),FacilityContoller.updateFacility)

router.delete("/:id",auth(USER_ROLES.ADMIN),FacilityContoller.deleteFacility)

router.patch("/add-doctor/:id",auth(USER_ROLES.REPRESENTATIVE),FacilityContoller.addDoctorInFacility)

router.patch("/status/:id",auth(USER_ROLES.ADMIN),FacilityContoller.changeStatusOfFacility)


export const FacilityRoutes = router