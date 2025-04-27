import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { NotificationController } from './notification.controller';
const router = express.Router();

router.get(
  '/',
  auth(),
  NotificationController.getNotificationFromDB
);
router.get(
  '/admin',
  auth(),
  NotificationController.adminNotificationFromDB
);
router.patch(
  '/:id',
  auth(),
  NotificationController.readNotification
);
router.put(
  '/read-all',
  auth(),
  NotificationController.readAllNtofication
);

export const NotificationRoutes = router;