import { Model } from "mongoose";
export type DisType = "report_disclaimer"| "length_response"|"non_length_response"
export type IDisclamiler = {
    content:string;
    type:DisType
}

export type DisclaimerModel = {
    isExistDisclaimer(type:DisType):void
} & Model<IDisclamiler>