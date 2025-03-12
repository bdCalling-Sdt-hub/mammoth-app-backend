import { DisType, IDisclamiler } from "./disclaimer.interface";
import { Disclaimer } from "./disclaimer.model";

const saveAnyDisclaimerToDB = async (content:Partial<IDisclamiler>)=>{
    
    await Disclaimer.isExistDisclaimer(content.type!)
    const disclaimer = await Disclaimer.findOneAndUpdate({type:content.type},content)
    return disclaimer
}

const getDisclaimerFromDB = async (type: DisType)=>{
    const disclaimer = await Disclaimer.findOne({type})
    return disclaimer
}

export const DisclaimerService = {
    saveAnyDisclaimerToDB,
    getDisclaimerFromDB
}