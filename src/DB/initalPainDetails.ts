import { Disorder,Pain as PainType } from "../app/modules/pain/pain.model";
import { logger } from "../shared/logger";

const painTypes = [
    {
      id: 1,
      title: "Leg Pain",
      disorders: [
        { id: 101, type: "E03.9 Hypothyroidism, unspecified" },
        { id: 102, type: "E07.9 Disorder of thyroid, unspecified" },
        { id: 103, type: "E10.40 Type 1 DM with diabetic neuropathy, unspecified" },
        { id: 104, type: "E11.40 Type 2 DM with diabetic neuropathy, unspecified" },
        { id: 105, type: "E16.2 Hypoglycemia" },
        { id: 106, type: "E53.8 Deficiency of B group vitamins" },
        { id: 107, type: "M79.2 Fibromyalgia" },
        { id: 108, type: "M54.5 Low back pain" },
        { id: 109, type: "M47.9 Spondylosis, unspecified", isHidden: true },
        { id: 110, type: "M25.5 Pain in joint, unspecified", isHidden: true },
      ],
    },
    {
      id: 2,
      title: "Chest Pain",
      disorders: [
        { id: 201, type: "I20.9 Angina pectoris, unspecified" },
        { id: 202, type: "I21.9 Acute myocardial infarction, unspecified" },
        { id: 203, type: "I22.9 Subsequent myocardial infarction, unspecified" },
        { id: 204, type: "R07.9 Chest pain, unspecified" },
        { id: 205, type: "J44.9 Chronic obstructive pulmonary disease" },
        { id: 206, type: "R06.02 Shortness of breath" },
        { id: 207, type: "K21.9 Gastro-esophageal reflux disease" },
        { id: 208, type: "R55 Syncope and collapse" },
        { id: 209, type: "I11.9 Hypertensive heart disease", isHidden: true },
        { id: 210, type: "I63.9 Cerebral infarction", isHidden: true },
      ],
    },
    {
      id: 3,
      title: "Headache",
      disorders: [
        { id: 301, type: "G43.9 Migraine, unspecified" },
        { id: 302, type: "G44.1 Tension-type headache" },
        { id: 303, type: "R51 Headache" },
        { id: 304, type: "G44.2 Cluster headache" },
        { id: 305, type: "G45.9 Transient cerebral ischemic attack" },
        { id: 306, type: "I63.9 Cerebral infarction" },
        { id: 307, type: "R42 Dizziness and giddiness" },
        { id: 308, type: "G45.0 Vertebrobasilar artery syndrome" },
        { id: 309, type: "G44.3 Post-traumatic headache", isHidden: true },
        { id: 310, type: "G44.4 Chronic tension-type headache", isHidden: true },
      ],
    },
    {
      id: 4,
      title: "Abdominal Pain",
      disorders: [
        { id: 401, type: "R10.9 Abdominal pain, unspecified" },
        { id: 402, type: "K21.9 Gastro-esophageal reflux disease" },
        { id: 403, type: "K25.9 Gastric ulcer" },
        { id: 404, type: "K70.9 Alcoholic liver disease" },
        { id: 405, type: "K52.9 Noninfective gastroenteritis" },
        { id: 406, type: "I10 Essential hypertension" },
        { id: 407, type: "K80.9 Cholelithiasis" },
        { id: 408, type: "K30 Dyspepsia" },
        { id: 409, type: "K41.9 Inguinal hernia", isHidden: true },
        { id: 410, type: "R63.5 Abnormal weight gain", isHidden: true },
      ],
    },
    {
      id: 5,
      title: "Joint Pain",
      disorders: [
        { id: 501, type: "M15.9 Osteoarthritis, unspecified" },
        { id: 502, type: "M17.9 Osteoarthritis of knee" },
        { id: 503, type: "M19.9 Osteoarthritis" },
        { id: 504, type: "M30.9 Systemic vasculitis" },
        { id: 505, type: "M45.9 Ankylosing spondylitis" },
        { id: 506, type: "M79.7 Fibromyalgia" },
        { id: 507, type: "M54.5 Low back pain" },
        { id: 508, type: "M77.9 Tendinitis" },
        { id: 509, type: "M76.9 Plantar fasciitis", isHidden: true },
        { id: 510, type: "M19.0 Primary osteoarthritis of hip", isHidden: true },
      ],
    },
    {
      id: 6,
      title: "Neck Pain",
      disorders: [
        { id: 601, type: "M54.2 Cervicalgia" },
        { id: 602, type: "M54.3 Sciatica" },
        { id: 603, type: "M51.9 Intervertebral disc disorder, unspecified" },
        { id: 604, type: "M54.4 Lumbago with sciatica" },
        { id: 605, type: "M62.9 Muscle disorder, unspecified" },
        { id: 606, type: "M53.8 Other dorsopathies" },
        { id: 607, type: "M76.8 Other enthesopathies of lower limb" },
        { id: 608, type: "M99.01 Segmental and somatic dysfunction of cervical region" },
        { id: 609, type: "M41.9 Scoliosis, unspecified", isHidden: true },
        { id: 610, type: "M60.9 Myositis, unspecified", isHidden: true },
      ],
    },
    {
      id: 7,
      title: "Back Pain",
      disorders: [
        { id: 701, type: "M54.5 Low back pain" },
        { id: 702, type: "M51.9 Intervertebral disc disorder, unspecified" },
        { id: 703, type: "M53.2 Spinal stenosis, cervical region" },
        { id: 704, type: "M54.4 Lumbago with sciatica" },
        { id: 705, type: "M79.1 Myalgia" },
        { id: 706, type: "M75.1 Rotator cuff syndrome" },
        { id: 707, type: "M47.9 Spondylosis, unspecified" },
        { id: 708, type: "M22.9 Internal derangement of knee" },
        { id: 709, type: "M16.9 Osteoarthritis of hip", isHidden: true },
        { id: 710, type: "M99.02 Segmental and somatic dysfunction of thoracic region", isHidden: true },
      ],
    },
    {
      id: 8,
      title: "Pelvic Pain",
      disorders: [
        { id: 801, type: "N94.6 Dysmenorrhea, unspecified" },
        { id: 802, type: "R10.2 Pelvic and perineal pain" },
        { id: 803, type: "N85.9 Abnormal uterine and vaginal bleeding" },
        { id: 804, type: "N81.9 Female genital prolapse" },
        { id: 805, type: "M62.8 Other disorders of muscle" },
        { id: 806, type: "K62.5 Hemorrhoids" },
        { id: 807, type: "N80.9 Endometriosis" },
        { id: 808, type: "N93.9 Abnormal bleeding from female genital tract" },
        { id: 809, type: "N89 Vaginitis and vulvovaginitis", isHidden: true },
        { id: 810, type: "N73.9 Female pelvic inflammatory disease", isHidden: true },
      ],
    },
    {
      id: 9,
      title: "Shoulder Pain",
      disorders: [
        { id: 901, type: "M75.1 Rotator cuff syndrome" },
        { id: 902, type: "M75.9 Shoulder lesion, unspecified" },
        { id: 903, type: "M54.6 Pain in thoracic spine" },
        { id: 904, type: "M76.1 Patellar tendinitis" },
        { id: 905, type: "M79.5 Pain in limb, unspecified" },
        { id: 906, type: "M67.9 Synovial disorder, unspecified" },
        { id: 907, type: "M10.9 Gout, unspecified" },
        { id: 908, type: "M99.03 Segmental and somatic dysfunction of the shoulder" },
        { id: 909, type: "M23.8 Other internal derangement of the knee", isHidden: true },
        { id: 910, type: "M41.8 Other deforming dorsopathies", isHidden: true },
      ],
    },
    {
      id: 10,
      title: "Facial Pain",
      disorders: [
        { id: 1001, type: "G44.9 Tension-type headache" },
        { id: 1002, type: "G50.9 Trigeminal nerve disorder" },
        { id: 1003, type: "R51 Headache" },
        { id: 1004, type: "J39.1 Tonsillitis" },
        { id: 1005, type: "M79.0 Rheumatic myopathy" },
        { id: 1006, type: "M53.1 Cervicalgia with radiculopathy" },
        { id: 1007, type: "G40.9 Epilepsy, unspecified" },
        { id: 1008, type: "M54.2 Cervicalgia", isHidden: true },
        { id: 1009, type: "M99.01 Segmental and somatic dysfunction of cervical region", isHidden: true },
      ],
    },
  ];

export const initalPainDetails = async () => {
    const isDataExist = await PainType.countDocuments()
    if (isDataExist) {
        return
    }
    for (const painTypeData of painTypes) {
        // Check if this pain type already exists by its `title`
        const existingPainType = await PainType.findOne({ title: painTypeData.title }).populate('disorders');
  
        if (!existingPainType) {
          // Create new disorders and add them to the pain type
          const disorderIds = [];
  
          for (const disorderData of painTypeData.disorders) {
            // Check if disorder already exists in the database
            let existingDisorder = await Disorder.findOne({ id: disorderData.id });
  
            if (!existingDisorder) {
              // If disorder doesn't exist, create a new one
              existingDisorder = new Disorder(disorderData);
              await existingDisorder.save();
            }
  
            disorderIds.push(existingDisorder._id);
          }
  
          // Create new pain type with the disorder references
          const newPainType = new PainType({
            id: painTypeData.id,
            title: painTypeData.title,
            disorders: disorderIds
          });
  
          await newPainType.save();
        }
    }
    logger.info("Pain Data created successfully")
    

}

