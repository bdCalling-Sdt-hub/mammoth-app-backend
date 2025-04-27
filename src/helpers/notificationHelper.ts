import { INotification } from "../app/modules/notification/notification.interface";
import { Notification } from "../app/modules/notification/notification.model";
import { User } from "../app/modules/user/user.model";
import { USER_ROLES } from "../enums/user";
import { timeHelper } from "./timeHelper";


export const sendNotifications = async (data:INotification,role:USER_ROLES[]) =>{
      //@ts-ignore
      const socketIo = global.io;
      const result:any = await Notification.create({
          ...data,
          role
      });

    const users = await User.find({role:{
        $in:role
    },status:{$ne:'deleted'}});
    
      users.forEach((user) => {
          if (socketIo) {
              socketIo.emit(`getNotification::${user._id}`, {
                  ...data,
                  receiver: user._id,
              });
          }
      });
      
  
      return result;

}



  

  