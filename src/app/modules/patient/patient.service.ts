import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { IBiopsySample, IReport } from "../report/report.interface";
import { Biopsy, Report } from "../report/report.model";
import { IPatient } from "./patient.interface";
import { Patient } from "./patient.model";
import { sendNotifications } from "../../../helpers/notificationHelper";
import { USER_ROLES } from "../../../enums/user";
import { Facility } from "../facility/facility.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

const createPatientInfoInDB = async (content:Partial<IPatient>,report_info:Partial<IReport>,biopsyInfo:Partial<IBiopsySample>[],user:JwtPayload)=>{
    const patient = await Patient.isPatientExist(content)
    const reportNo = (await Report.countDocuments())+1+1000
    const userData = await User.findOne({email:user.email})
    let biopsyArr:any[] = []
    
    const report = new Report({
        patient:patient._id,
        report_no: reportNo,
        doctor: content.orderingPhysician,
       ...report_info
    })
    for(const biopsy of biopsyInfo){
        const bio = await Biopsy.create({
            report_id:report._id,
           ...biopsy
        })
        biopsyArr.push(bio._id)
    }
    report.biopsy_sample = biopsyArr
    await report.save()
    const facility = await Facility.findOne({_id:report.facility_location})
    await sendNotifications({
        title:"New Patient Admitted",
        text:`${content.firstname+" "+content.lastname} has been admitted to ${facility?.name} by ${userData?.name}.`,
        read:false,
        direction:"patient",
        role:[USER_ROLES.DOCTOR,USER_ROLES.HISTOLOGIST,USER_ROLES.ADMIN],
        link:`${patient._id}`,
    },[USER_ROLES.DOCTOR,USER_ROLES.HISTOLOGIST,USER_ROLES.ADMIN])
    return patient
}

const updatePatientInfoInDB = async (id:string,content:Partial<IPatient>)=>{
    const patient = await Patient.findByIdAndUpdate(id,content,{new:true})
   await Patient.updateName(patient?._id!)
    return patient
}

const deletePatientInfoFromDB = async (id:string)=>{
    const patient = await Patient.findByIdAndUpdate(id,{status:"deleted"},{new:true})
    
    return patient
}

const getAllPatientInfoFromDB = async (query:Record<string,any>)=>{
    const result = new QueryBuilder(Patient.find({status:{
        $ne:"deleted"
    }},{name:1,phone:1,email:1,insuranceCompany:1,patientId:1}),query).paginate().search(['name', 'phone', 'email', 'insuranceCompany','patientId',]).filter().sort()
    const paginatationInfo = await result.getPaginationInfo();
    const patients = await result.modelQuery.lean().exec()
    return { patients, paginatationInfo };
}

const downloadAllPatientInfoFromDB = async (query:Record<string,any>)=>{
    const result = new QueryBuilder(Patient.find({},{name:1,phone:1,email:1,insuranceCompany:1,_id:0,patientId:1}),query).paginate().search(['name', 'phone', 'email', 'insuranceCompany','patientId']).filter()
    const paginatationInfo = await result.getPaginationInfo();
    const patients = await result.modelQuery.lean().exec()
    return patients
}

const getPatientInfoFromDB = async (patient_id:Types.ObjectId)=>{
    const patient = await Patient.findById(patient_id).populate(['orderingPhysician']).lean()
    const reports = await Report.find({patient:patient?._id}).populate([
        {
            path: 'biopsy_sample',
        },
        {
            path: 'doctor',
        },
        {
            path: 'patient',
        },

    ]).sort({createdAt:-1}).lean()
    return { patient, reports }

}

export const PatientService = {
    createPatientInfoInDB,
    updatePatientInfoInDB,
    deletePatientInfoFromDB,
    getAllPatientInfoFromDB,
    getPatientInfoFromDB,
    downloadAllPatientInfoFromDB
}