import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { FacilityModel, IFacility } from "./facility.interface";
import { Facility } from "./facility.model";

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
          disorders:facility?.disorders&& facility?.disorders.filter(disorder => !disorder.isHidden),
          reasons:facility?.reasons&& facility?.reasons.filter(reason => !reason.isHidden),
          clinical_symptoms:facility?.clinical_symptoms&& facility?.clinical_symptoms.filter(symptom => !symptom.isHidden)
        };
      });
      return filteredFacilities;
}

const getFacilitiesFromDB = async (query:Record<string,any>)=>{

    const result = new QueryBuilder(Facility.find({
    }), query).paginate()
    const paginatationInfo = await result.getPaginationInfo();
    const facilities:any[] = await result.modelQuery.populate(['representative','doctors'],["name", "company_name", "id", "email", "phone", "apt_number", "npi_number"]).lean();
    const filteredFacilities = query.showHidden ? facilities : await hideDataFormat(facilities)
    return {
        filteredFacilities,
        paginatationInfo
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

const gotSingleFacilityFromDB = async (facility_id:Types.ObjectId)=>{
    const facility = await Facility.findById(facility_id).populate(['representative','doctors'],["name", "company_name", "id", "email", "phone", "apt_number", "npi_number"])
    return facility
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