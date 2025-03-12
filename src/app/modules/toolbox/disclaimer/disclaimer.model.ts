import { model, Schema } from "mongoose";
import { IDisclamiler ,DisclaimerModel, DisType} from "./disclaimer.interface";

const disclaimerSchema = new Schema<IDisclamiler,DisclaimerModel>({
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["report_disclaimer", "length_response","non_length_response"],
        required: true
    }
})

disclaimerSchema.statics.isExistDisclaimer = async (type:DisType)=>{
    const exist = await Disclaimer.exists({ type});
    if(!exist){
        
       const created = await Disclaimer.create({ type,content:"test"})
       
    }
}

export const Disclaimer = model<IDisclamiler,DisclaimerModel>("disclaimer",disclaimerSchema)