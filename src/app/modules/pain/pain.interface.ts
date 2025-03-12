import mongoose, { Model } from "mongoose";

export type IPain = {
    title: string;
    isHidden: boolean;
    disorders: mongoose.Types.ObjectId[];
}
export type IDisorder = {
    type: {type: String, required: true},
    isHidden: {type: Boolean, default: false},
}

export type DisorderModel = Model<IDisorder>
export type PainModel = mongoose.Model<IPain> 