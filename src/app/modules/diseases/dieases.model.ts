import { model, Schema } from "mongoose";
import { DieasesModel, IDieases } from "./dieases.interface";

const disorderSchema = new Schema({
    name:{
        type: String,
        required: true
    }
})

const dieasesSchema = new Schema<IDieases,DieasesModel>({
    name: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    disorders: [disorderSchema]
})

export const Dieases = model("Dieases", dieasesSchema);