import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type INotification = {
  text: string;
  sender?: Types.ObjectId;
  receiver?: Types.ObjectId;
  title?: string;
  read: boolean;
  direction?: string;
  link?: string;
  role?:USER_ROLES[]
  readBy?: Types.ObjectId[]
};

export type NotificationModel = Model<INotification>;