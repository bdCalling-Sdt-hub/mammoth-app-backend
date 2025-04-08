import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { model, Schema, Types } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModal } from './user.interface';
import { string } from 'zod';

const userSchema = new Schema<IUser, UserModal>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      minlength: 8,
    },
    phone:{
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://i.ibb.co/z5YHLV9/profile.png',
    },
    status: {
      type: String,
      enum: ['active', 'delete'],
      default: 'active',
    },
    company_name: {
      type: String,
      required: false,
    },
    npi_number: {
      type: Number,
      required: false,
    },
    apt_number: {
      type: Number,
      required: false,
    },
    signature: {
      type: String,
      required: false,
    },
    facility_location: {
      type: String,
      required: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },

    verified: {
      type: Boolean,
      default: true,
    },
    id:Number,
    name:String,
    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
    address:{type: String, required: false}
  },
  { timestamps: true }
);

//exist user check
userSchema.statics.isExistUserById = async (id: string) => {
  const isExist = await User.findById(id);
  return isExist;
};

userSchema.statics.isExistUserByEmail = async (email: string) => {
  const isExist = await User.findOne({ email });
  return isExist;
};

userSchema.statics.isUnblockedUser = async (id: string) => {
  const user = await User.findOne({ _id: id,isLocked:true });
  return user?._id?true:false;
}

//is match password
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

//check user
userSchema.pre('save', async function (next) {
  //check user
  
  const isExist = await User.findOne({ email: this.email });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exist!');
  }
  //generate id
  this.name = this.firstname+" "+this.lastname
  this.id = 1000 + await User.countDocuments();

  //password hash
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.statics.updateName = async function (id:Types.ObjectId){
  const user = await User.findById(id)

  
  if(!user){
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  const name = user.firstname+" "+user.lastname
  
  await User.findOneAndUpdate({_id:id},{name:name})
}
  


export const User = model<IUser, UserModal>('User', userSchema);
