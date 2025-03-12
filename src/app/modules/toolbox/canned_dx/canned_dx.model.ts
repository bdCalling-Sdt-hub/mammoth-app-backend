import mongoose, { Schema } from "mongoose";
import { CannedDxModel, ICannedDx } from "./canned_dx.interface";

const cannedDxSchema = new Schema<ICannedDx,CannedDxModel>({
    content: {
        type: String,
        required: true,
        unique: true,
    }
},{
    timestamps: true
})

cannedDxSchema.statics.isContentExist = async (content: string): Promise<boolean> => {
    return await CannedDx.exists({ content })?true:false;
}

export const CannedDx = mongoose.model<ICannedDx,CannedDxModel>("CannedDx", cannedDxSchema);