import { Model } from "mongoose";

export type IInsurance = {
    name: string;
}

export type InsuranceModel = {
    isInsuranceExist(name: string): boolean;
} & Model<IInsurance>