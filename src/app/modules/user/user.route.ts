import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router
  .route('/profile')
  .get(auth(), UserController.getUserProfile)
  .put(
    auth(),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = UserValidation.updateUserZodSchema.parse(
          JSON.parse(req.body.data)
        );
      }
      return UserController.updateProfile(req, res, next);
    }
  );
router.put('/user/:id',auth(USER_ROLES.ADMIN),validateRequest(UserValidation.updateUserZodSchema),UserController.updateUser)
router
  .route('/')
  .post(
    auth(USER_ROLES.ADMIN,USER_ROLES.REPRESENTATIVE),
    fileUploadHandler(),
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  );

router.get('/users',auth(),UserController.getAllUsers)
router.get('/doctors',auth(),UserController.getAllDoctors)
router.put('/lock/:userId',auth(USER_ROLES.ADMIN),UserController.lockUnlockedUser)
router.get("/users/:userId",auth(),UserController.getSingleUserDetails)

export const UserRoutes = router;
