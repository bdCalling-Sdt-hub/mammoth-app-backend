import { Dieases } from "../app/modules/diseases/dieases.model";
import { logger } from "../shared/logger";

const medicalData = [
    {
      name: "Metabolic",
      total: 6,
      disorders: [
        { name: "Diabetes Mellitus" },
        { name: "Hyperthyroidism" },
        { name: "Hypothyroidism" },
        { name: "Cushing's Syndrome" },
        { name: "Metabolic Syndrome" },
        { name: "Phenylketonuria" },
      ],
    },
    {
      name: "Nutritional",
      total: 6,
      disorders: [
        { name: "Malnutrition" },
        { name: "Vitamin Deficiency" },
        { name: "Obesity" },
        { name: "Kwashiorkor" },
        { name: "Anorexia Nervosa" },
        { name: "Scurvy" },
      ],
    },
    {
      name: "Connective tissue diseases",
      total: 6,
      disorders: [
        { name: "Rheumatoid Arthritis" },
        { name: "Systemic Lupus Erythematosus (SLE)" },
        { name: "Scleroderma" },
        { name: "Ehlers-Danlos Syndrome" },
        { name: "Marfan Syndrome" },
        { name: "Mixed Connective Tissue Disease" },
      ],
    },
    {
      name: "Infectious Diseases",
      total: 6,
      disorders: [
        { name: "Tuberculosis" },
        { name: "HIV/AIDS" },
        { name: "Hepatitis B" },
        { name: "Malaria" },
        { name: "Lyme Disease" },
        { name: "COVID-19" },
      ],
    },
    {
      name: "Neoplastic Diseases",
      total: 6,
      disorders: [
        { name: "Lung Cancer" },
        { name: "Breast Cancer" },
        { name: "Leukemia" },
        { name: "Lymphoma" },
        { name: "Colorectal Cancer" },
        { name: "Pancreatic Cancer" },
      ],
    },
    {
      name: "Medications",
      total: 6,
      disorders: [
        { name: "Steroid Use" },
        { name: "Chemotherapy" },
        { name: "Antibiotics" },
        { name: "Painkillers" },
        { name: "Antidepressants" },
        { name: "Immunosuppressants" },
      ],
    },
    {
      name: "Neuropathic",
      total: 6,
      disorders: [
        { name: "Peripheral Neuropathy" },
        { name: "Multiple Sclerosis" },
        { name: "Parkinson’s Disease" },
        { name: "Alzheimer’s Disease" },
        { name: "Epilepsy" },
        { name: "Guillain-Barré Syndrome" },
      ],
    },
  ];

export async function initalDieasesLoad(){
    const isDataExist = await Dieases.countDocuments()
    if(isDataExist){
        return
    }
    await Dieases.insertMany(medicalData)
    logger.info("Dieases loaded")
  }