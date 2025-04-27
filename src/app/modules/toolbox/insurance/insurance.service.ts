import { JwtPayload } from "jsonwebtoken"
import { USER_ROLES } from "../../../../enums/user"
import { sendNotifications } from "../../../../helpers/notificationHelper"
import QueryBuilder from "../../../builder/QueryBuilder"
import { IInsurance } from "./insurance.interface"
import { Insurance } from "./insurance.model"
import { User } from "../../user/user.model"

const saveInsuranceToDB = async (name:string,user:JwtPayload)=>{
    const userData = await User.findOne({email:user.email})
    const isExist = await Insurance.isInsuranceExist(name)
    if(isExist){
        throw new Error('Insurance already exist')
    }
    const insurance = new Insurance({name})
    await insurance.save()

    await sendNotifications({
        title:"New Insurance Added",
        text:"New Insurance Added by "+userData?.name,
        read:false,
        direction:"insurance",
        role:[USER_ROLES.ADMIN],
    },[USER_ROLES.ADMIN])

    await sendNotifications({
        title:"New Insurance Added",
        text:`${name} insurance is available now`,
        read:false,
        direction:"insurance",
        role:[USER_ROLES.DOCTOR],
    },[USER_ROLES.DOCTOR])
    return insurance
}

const getInsurancesFromDB = async (query:Record<string,any>)=>{
    const result = new QueryBuilder(Insurance.find(),query).search(['name'])
    const insurances = await result.modelQuery.exec()
    return insurances
}

const updateInsurancesFromDB = async (id:string,content:Partial<IInsurance>)=>{
    const insurance = await Insurance.findByIdAndUpdate(id,content,{new:true})
    return insurance
}

const deleteInsurancesFromDB = async (id:string)=>{
    const insurance = await Insurance.findByIdAndDelete(id)
    return insurance
}

export const InsuranceService = {
    saveInsuranceToDB,
    getInsurancesFromDB,
    updateInsurancesFromDB,
    deleteInsurancesFromDB
}