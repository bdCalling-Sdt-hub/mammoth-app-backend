import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  id?:number;
  firstname:string;
  lastname: string;
  name:string
  role: USER_ROLES;
  phone: string;
  email: string;
  password: string;
  image: string;
  address:string;
  company_name: string;
  npi_number?:number;
  apt_number?: number;
  signature?: string;
  isLocked?: boolean;
  facility_location?: string;
  status: 'active' | 'delete';
  verified: boolean;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
  isUnblockedUser(id: string): boolean
  updateName(id:Types.ObjectId): void
} & Model<IUser>;

