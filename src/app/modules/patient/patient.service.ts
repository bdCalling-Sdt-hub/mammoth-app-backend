import QueryBuilder from "../../builder/QueryBuilder";
import { IPatient } from "./patient.interface";
import { Patient } from "./patient.model";

const createPatientInfoInDB = async (content:Partial<IPatient>)=>{
    const patient = new Patient(content)
    await patient.save()
    return patient
}

const updatePatientInfoInDB = async (id:string,content:Partial<IPatient>)=>{
    const patient = await Patient.findByIdAndUpdate(id,content,{new:true})
    return patient
}

const deletePatientInfoFromDB = async (id:string)=>{
    const patient = await Patient.findByIdAndDelete(id)
    return patient
}

const getPatientInfoFromDB = async (query:Record<string,any>)=>{
    const result = new QueryBuilder(Patient.find(),query).paginate()
    const paginatationInfo = await result.getPaginationInfo();
    const patients = await result.modelQuery.lean().exec()
    return { patients, paginatationInfo };
}

const PatientService = {
    createPatientInfoInDB,
    updatePatientInfoInDB,
    deletePatientInfoFromDB,
    getPatientInfoFromDB,
}