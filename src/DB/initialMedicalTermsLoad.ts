import { MedicalTerms } from "../app/modules/medical_terms/medical_terms.model"
import { logger } from "../shared/logger"

const medical_terms = [
    {
      "content": "To objectively diagnose small fiber neuropathy.",
      "type": "medical_diagnosis"
    },
    {
      "content": "To diagnose inflammatory neuropathy.",
      "type": "medical_diagnosis"
    },
    {
      "content": "To diagnose vasculitis neuropathy that also involves the skin.",
      "type": "medical_diagnosis"
    },
    {
      "content": "To provide documentation, for purposes of insurance coverage, to support recommended treatments.",
      "type": "medical_diagnosis"
    },
    {
      "content": "To diagnose vasculitis neuropathy that also involves the skin.",
      "type": "medical_diagnosis"
    },
    {
      "content": "To provide documentation, for purposes of insurance coverage, to support recommended treatments.",
      "type": "medical_diagnosis"
    },
    {
      "content": "Pain that comes quickly can be severe but lasts a relatively short time.",
      "type": "pain_description"
    },
    {
      "content": "Severe pain of limited duration.",
      "type": "pain_description"
    },
    {
      "content": "An unpleasant sensation induced by noxious stimuli which are detected by nerve endings of nociceptive neurons.",
      "type": "pain_description"
    },
    {
      "content": "Unpleasant sensory and emotional experience associated with actual or potential tissue damage.",
      "type": "pain_description"
    },
    {
      "content": "The sensation of discomfort, distress, or agony, resulting from the stimulation of specialized nerve endings.",
      "type": "pain_description"
    },
    {
      "content": "Physical suffering or distress; to hurt.",
      "type": "pain_description"
    },
    {
      "content": "Severe pain of limited duration.",
      "type": "pain_description"
    },
    {
      "content": "An unpleasant sensation induced by noxious stimuli which are detected by nerve endings of nociceptive neurons.",
      "type": "pain_description"
    },
    {
      "content": "Unpleasant sensory and emotional experience associated with actual or potential tissue damage.",
      "type": "pain_description"
    },
    {
      "content": "The sensation of discomfort, distress, or agony, resulting from the stimulation of specialized nerve endings.",
      "type": "pain_description"
    },
    {
      "content": "To provide documentation, for purposes of insurance coverage, to support recommended treatments.",
      "type": "pain_description"
    },
    {
      "content": "Physical suffering or distress; to hurt.",
      "type": "pain_description"
    }
  ]

  export async function initalMedicalTermsLoad (){
    const isExist = await MedicalTerms.countDocuments()
    if (isExist) {
        return
    }
    await MedicalTerms.insertMany(medical_terms)
    logger.info("Medical Terms loaded successfully")
  }
  