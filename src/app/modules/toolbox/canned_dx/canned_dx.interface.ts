import { Model } from "mongoose";

export type ICannedDx={
    content: string;
}

export type CannedDxModel = Model<ICannedDx>&{
    isContentExist(content: string): boolean
}