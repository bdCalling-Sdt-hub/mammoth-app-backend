import mongoose, { Model, Mongoose, Types } from "mongoose";

export type IPain = {
    title: string;
    disorders: IDisorder[]
}
export type IDisorder = {
    _id?:Types.ObjectId
    type:string

}

export type DisorderModel = Model<IDisorder>
export type PainModel = mongoose.Model<IPain> 