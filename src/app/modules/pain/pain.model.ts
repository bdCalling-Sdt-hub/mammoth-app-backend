import { model, Schema } from "mongoose";
import { DisorderModel, IDisorder, IPain, PainModel } from "./pain.interface";
const DisorderSchema = new Schema<IDisorder,DisorderModel>(
  {
    type: { type: String, required: true },

  },
);

const painSchema = new Schema<IPain,PainModel>({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    disorders: [DisorderSchema]
})


export const Pain = model<IPain,PainModel>("pain",painSchema)