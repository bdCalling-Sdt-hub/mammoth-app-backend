import QueryBuilder from "../../../builder/QueryBuilder"
import { IInsurance } from "./insurance.interface"
import { Insurance } from "./insurance.model"

const saveInsuranceToDB = async (name:string)=>{
    const isExist = await Insurance.isInsuranceExist(name)
    if(isExist){
        throw new Error('Insurance already exist')
    }
    const insurance = new Insurance({name})
    await insurance.save()
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