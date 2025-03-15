import { z } from "zod";
const DisorderSchema = z.object({
    name: z.string().min(1, 'Disorder name is required'),
})
const DieasesSchema = z.object({
    name: z.string().min(1, 'Disease name is required'),
    total: z.number().min(0, 'Total cases must be a non-negative number'),
    disorders: z.array(DisorderSchema),
})
const MedicalTermsSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    type: z.enum(["medical_diagnosis", "pain_description"]),
})
const symptopSchema = z.object({
    name: z.string().min(1, 'Disorder name is required'),
    sides: z.array(z.string()).min(1, 'At least one side is required'),
})
const ClinicalSymptomsSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    disorders: z.array(symptopSchema),
})

const BiopsySampleSchema = z.object({
    sample_area: z.string().min(1, 'Sample area is required'),
    sample_side: z.string().min(1, 'Sample side is required'),
    specimen_id: z.string().min(1, 'Specimen ID is required'),
});
const createPatientReportBiopsyZodSchema = z.object({
    body: z.object({
        patient_info:z.object({
            name: z.string().min(1, 'Name is required'),
            email: z.string().email('Invalid email address'),
            phone: z.string().min(10, 'Invalid phone number'),
            address: z.string().min(1, 'Address is required'),
            aptNumber: z.string().optional(),
            gender: z.enum(["Male", "Female", "Other"]),
            dateOfBirth: z.string(),
            insuranceCompany: z.string().min(1, 'Insurance company is required'),
            memberId: z.string().min(1, 'Member ID is required'),
            reasonsForVisit: z.array(z.string()),
            sensorySymptoms: z.array(z.string()),
            ethnicity: z.string().min(1, 'Ethnicity is required'),
            orderingPhysician: z.string().min(1, 'Ordering physician is required'),
            
        }),
        report_info:z.object({
            dieases: z.array(DieasesSchema),
            medical_terms: z.array(MedicalTermsSchema),
            clinical_symptoms: z.array(ClinicalSymptomsSchema),
            documents: z.array(z.string()).optional(),
            cpt: z.array(z.string()).optional(),
            icd: z.array(z.string()).optional(),
            facility_location: z.string().min(1, "Facility location is required"),
            ordering_provider: z.string().min(1,"Ordering Provider is required")
        }),
        biopsy_info: z.array(BiopsySampleSchema)
    }),
})


export const PatientValidation = {
    createPatientReportBiopsyZodSchema,
}