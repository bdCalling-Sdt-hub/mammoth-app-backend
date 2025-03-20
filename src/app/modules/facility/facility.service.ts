import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { FacilityModel, IFacility } from "./facility.interface";
import { Facility } from "./facility.model";
import ApiError from "../../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";

const createFacilityToDB = async (content:Partial<IFacility>)=>{
    const user = (await User.find({facility_location:content?.address})).map(user=>user._id);
    const facility =await Facility.create({
        ...content,
        doctors:user.length?[...content?.doctors||[],...user]:content.doctors
    })
    return facility
}

async function hideDataFormat(facilities:IFacility[]
){
    const filteredFacilities = facilities.map(facility => {
        return {
          ...facility,
          disorders:facility?.disorders?.length&& facility?.disorders.filter(disorder => {
            if(disorder.isHidden) return false;
            if(disorder.disorders.length > 0) return true
            return !disorder.isHidden
          }).map(disorder=>disorder.disorders.length?{...disorder,disorders:disorder.disorders.filter(disorder=>!disorder.isHidden)}:disorder),
          reasons:facility?.reasons?.length&& facility?.reasons.filter(reason => !reason.isHidden),
          clinical_symptoms:facility?.clinical_symptoms?.length&& facility?.clinical_symptoms.filter(symptom => !symptom.isHidden)
        };
      });
      return filteredFacilities;
}

const filterFacilityData = (facilites:any[],query:Record<string,any>)=>{
    const search =query.searchTerm? query.searchTerm?.toLowerCase():""
    const filterBySearch = facilites.filter(facility=>{
        return Object.values(query).length? (
            search?
            (
            facility?.name?.toLowerCase().includes(search)||
            facility?.address?.toLowerCase().includes(search)||
            facility?.doctors?.some((doctor:any)=>doctor?.name?.toLowerCase().includes(search))||
            facility?.representative?.name?.toLowerCase().includes(search)
            ):(
                (!query.doctor|| facility?.doctors?.some((doctor:any)=>doctor.name.toLowerCase()===query.doctor.toLowerCase())) &&
                (!query.representative || facility?.representative?.name.toLowerCase()===query.representative.toLowerCase()) &&
                (!query.status || facility.status.toLowerCase().includes(query.status.toLowerCase())) 
            )
        ):facility
    })
    return filterBySearch

}

const getFacilitiesFromDB = async (query:Record<string,any>)=>{

    const result = new QueryBuilder(Facility.find({},{name:1,address:1,doctors:1,representative:1,status:1}), query)
    const facilities:any[] = await result.modelQuery.populate(['representative','doctors'],["name"]).lean();
    const filteredFacilities = query.showHidden ? facilities : await hideDataFormat(facilities)
    const searchResult = filterFacilityData(filteredFacilities, query)
    const finalArray = paginationHelper.paginateArray(searchResult,query)
    const list = query?.list ? filteredFacilities.filter(item=>item.status=="Active").map(item=>item.name):finalArray.data
    return {
        list,
        paginatationInfo:finalArray.pagination
    }
}

const updateFacilityToDB = async (facility_id:Types.ObjectId,content:Partial<IFacility>)=>{
    const facility = await Facility.findByIdAndUpdate(facility_id, content, {new:true})
    return facility
}

const deleteFacilityFromDB = async (facility_id:Types.ObjectId)=>{
    const facility = await Facility.findByIdAndDelete(facility_id)
    return facility
}
const addDoctorToFacilityInDB = async (facility_id:Types.ObjectId,doctor_id:Types.ObjectId)=>{
    const updateFacility = await Facility.findByIdAndUpdate(facility_id, {$push: {doctors:doctor_id}}, {new:true})
    const facility = await Facility.findById(facility_id)
    await User.findOneAndUpdate({_id:doctor_id},{facility_location:facility?.address})
    return facility
}

const gotSingleFacilityFromDB = async (query:Record<string,any>, facility_id:Types.ObjectId)=>{
    const facility = await Facility.findById(facility_id).populate(['representative','doctors'],["name", "company_name", "id", "email", "phone", "apt_number", "npi_number"]).lean()
    if(!facility) throw new ApiError(404, 'Facility not found')
    const hideDataFormatData = await hideDataFormat([facility as any])

    return query?.showHidden?facility:hideDataFormatData
}

const changeStatusOFFacilityFromDB = async (facility_id:Types.ObjectId)=>{
    const facility = await Facility.findById(facility_id)
    const update = await Facility.findByIdAndUpdate(facility_id, {status:facility?.status=="Active"?"Blocked":"Active"}, {new:true})
    return update
}


export const FacilityService = {
    createFacilityToDB,
    getFacilitiesFromDB,
    updateFacilityToDB,
    deleteFacilityFromDB,
    addDoctorToFacilityInDB,
    gotSingleFacilityFromDB,
    changeStatusOFFacilityFromDB
}