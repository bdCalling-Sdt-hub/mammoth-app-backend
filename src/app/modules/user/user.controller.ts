import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getMultipleFilesPath, getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { Types } from 'mongoose';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const files:any = req.files
    const user = req.user
    const images = getMultipleFilesPath(req.files, 'image');
    const result = await UserService.createUserToDB({
      ...userData,
      image: images?.length ? images[0]:"",
      signature:images?.length==2?images[1]:""
    },user);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    
    const result = await UserService.updateProfileToDB(user, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

// Get All Users from DB

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const user = req.user
  const result = await UserService.getAllUserFromDB(query,user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users retrieved successfully',
    pagination:result.paginatationInfo,
    data: result.users,
  });
});



const getAllDoctors = catchAsync(async (req: Request, res: Response) =>{
  const result = await UserService.getDoctosAsList();
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Doctors retrieved successfully',
    data: result,
  })
})

const lockUnlockedUser = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserService.lockUnlockUserFromDb(userId as any);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:"User Locked Successfully",
      data: result,
    })
  }
)
const getSingleUserDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDb(userId as any);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User retrieved successfully',
      data: result,
    });
  }
)

const updateUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
 
    
    const data = req.body;
    
    
    const result = await UserService.updateUserToDB(id as any, data);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User updated successfully',
      data: result,
    });
  }
)
export const UserController = { createUser, getUserProfile, updateProfile,
  getAllUsers,
  getAllDoctors,
  lockUnlockedUser,
  getSingleUserDetails,
  updateUser,

 };
