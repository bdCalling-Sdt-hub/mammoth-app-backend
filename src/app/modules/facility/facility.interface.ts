import { Model, Types } from "mongoose";



export interface IFacilityDisorders extends Document {
    name: string;
    isHidden: boolean;
    disorders: {
        _id: Types.ObjectId,
        name: string,
        isHidden: boolean
    }[]
}
export interface IReasons extends Document {
    _id: Types.ObjectId,
    name: string,
    isHidden: boolean
}
export interface IClinicalSymptops extends Document {
    _id: Types.ObjectId,
    title: string,
    isHidden: boolean;
    disorders: {
        _id: Types.ObjectId,
        name: string,
        isHidden: boolean;
        sides:string[]
    }
}
export type IFacility={
    name: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
    suite?: string;
    notificationEmail1: string;
    notificationEmail2?: string; 
    fax?: string; 
    accountType: string;
    representative?:Types.ObjectId;
    status:"Active"|"Blocked";
    doctors?:Types.ObjectId[],
    disorders: IFacilityDisorders[];
    reasons:IReasons[];
    clinical_symptoms:IClinicalSymptops[];
}
export type FacilityModel = Model<IFacility>

