import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Types } from 'mongoose';
import { Facility } from '../facility/facility.model';

const createUserToDB = async (payload: any): Promise<IUser> => {
  //set role
  const newObj= {
    name:payload.firstName + ' ' + payload.lastName,
    role: payload.role,
    contact: payload.contact,
    email: payload.email,
    password: payload.password,
    image: payload.image,
    address: payload.address,
    company_name: payload.company_name,
    npi_number: payload.npi_number,
    apt_number: payload.apt_number,
    signature: payload.signature,
    facility_location: payload.facility_location,
    phone: payload.phone,
    
  }
  const createUser = await User.create(newObj);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }

  const faicilityExist = await Facility.updateMany({address:payload.facility_location},{$push:{doctors:createUser._id}})

  //save to DB
  const authentication = {
    oneTimeCode: '0000',
    expireAt: new Date(Date.now() + 3 * 60000),
  };
  await User.findOneAndUpdate(
    { _id: createUser._id },
    { $set: { authentication } }
  );

  return createUser;
};

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

const getAllUserFromDB = async (query:Record<string,any>) => {
  const result = new QueryBuilder(User.find(), query).paginate().search(['role'])
  const paginatationInfo =await result.getPaginationInfo();
  const users = await result.modelQuery.lean().exec();
  return { users, paginatationInfo };
}

const getDoctosAsList = async () => {
  const doctors = await User.aggregate([
    { $match: {
      $or:[
        { role: USER_ROLES.DOCTOR },
        { role: USER_ROLES.PATHOLOGIST },
        { role: USER_ROLES.HISTOLOGIST },
        { role: USER_ROLES.REPRESENTATIVE },
      ]
    } },
    { $project: { _id: 1, firstName: 1, lastName: 1, role: 1, contact: 1, email: 1, image: 1, facility_location: 1 } }
  ])
  return doctors;
}

const lockUnlockUserFromDb = async (user_id:Types.ObjectId) =>{
  const user = await User.findOne({_id: user_id})
  if(!user){
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found')
  }
  user.isLocked =!user.isLocked
 const updateUser = await User.findOneAndUpdate({_id: user},{isLocked: user.isLocked})
  return updateUser

}
export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  getAllUserFromDB,
  getDoctosAsList,
  lockUnlockUserFromDb,
};
