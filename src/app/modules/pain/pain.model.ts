import { model, Schema } from "mongoose";
import { DisorderModel, IDisorder, IPain, PainModel } from "./pain.interface";

const painSchema = new Schema<IPain,PainModel>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    disorders: [{ type: Schema.Types.ObjectId, ref: "Disorder" }]
})
const DisorderSchema = new Schema<IDisorder,DisorderModel>(
    {
      type: { type: String, required: true },
      isHidden: { type: Boolean, default: false }
    },
  );

export const Disorder = model<IDisorder, DisorderModel>("Disorder", DisorderSchema)
export const Pain = model<IPain,PainModel>("pain",painSchema)