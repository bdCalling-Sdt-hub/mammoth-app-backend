import { model, Schema } from 'mongoose';
import { INotification, NotificationModel } from './notification.interface';
import { USER_ROLES } from '../../../enums/user';

const notificationSchema = new Schema<INotification, NotificationModel>(
  {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    },
    role: [{
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    }],
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Notification = model<INotification, NotificationModel>(
  'Notification',
  notificationSchema
);