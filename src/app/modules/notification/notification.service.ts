import { JwtPayload } from 'jsonwebtoken';
import { INotification } from './notification.interface';
import { Notification } from './notification.model';
import mongoose from 'mongoose';
import { timeHelper } from '../../../helpers/timeHelper';
import { paginationHelper } from '../../../helpers/paginationHelper';
import QueryBuilder from '../../builder/QueryBuilder';

// get notifications
const getNotificationFromDB = async (user: JwtPayload,query:Record<string,any>) => {
  const result = new QueryBuilder(Notification.find({
    role:{
      $in:user.role
    }
  }),query).paginate().sort()
  const paginateArr = await result.getPaginationInfo();

  const data = await result.modelQuery.lean()


  const unreadCount = await Notification.countDocuments({
    role: { $in: user.role },
    readBy: { $ne: user.id },
  });


  return {
    result: data.map((item:any)=>({...item,read:item?.readBy?.some((i:any)=>i==user.id)})),
    pagination:paginateArr,
    unreadCount,
  };
};


// read notifications only for user
const readNotificationToDB = async (
  user: JwtPayload,
  id: string
): Promise<INotification | undefined> => {
  const result: any = await Notification.findOneAndUpdate(
    { _id: id,role:{ $in:user.role }, readBy: { $ne: user.id } },
    { $push: { readBy: user.id } },
    { new: true }
  )
  return result;
};

// get notifications for admin
const adminNotificationFromDB = async () => {
  const result = await Notification.find({ type: 'ADMIN' });
  return result;
};

const readAllNotificationAllToDB = async (user:JwtPayload)=>{
    const result = await Notification.updateMany({role:{ $in:user.role },readBy:{$ne:user.id}},{$push:{readBy:user.id}});
    return result
}

// read notifications only for admin
const adminReadNotificationToDB = async (): Promise<INotification | null> => {
  const result: any = await Notification.updateMany(
    { type: 'ADMIN', read: false },
    { $set: { read: true } },
    { new: true }
  );
  return result;
};


export const NotificationService = {
  adminNotificationFromDB,
  getNotificationFromDB,
  readNotificationToDB,
  adminReadNotificationToDB,
  readAllNotificationAllToDB
};