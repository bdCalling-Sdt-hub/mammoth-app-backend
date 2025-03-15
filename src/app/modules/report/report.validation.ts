import { z } from "zod";
const microscopicDiagnosisSchema = z.object({
    canned_dx: z.string(),
    description: z.string(),
  });
  

const BiopsySampleSchema = z.object({
    sample_area: z.string().min(1, 'Sample area is required').optional(),
    sample_side: z.string().min(1, 'Sample side is required').optional(),
    specimen_id: z.string().min(1, 'Specimen ID is required').optional(),
    report_id: z.string().min(1, 'Report ID is required'),
    microscopic_diagnosis: microscopicDiagnosisSchema.optional(),
    microscopic_examination: z.string().optional(),
    gross_description: z.string().optional(),
    comment: z.string().optional(),
});
const updateBiopsySamplesZodSchema = z.object({
    body: z.object({
        samples: z.array(BiopsySampleSchema).min(1),
        additional_details:z.object(
            {
                biopsies_demonstrate: z.string(),
                nerve_fibber_density_consistent: z.string(),
                neuropathy: z.array(z.string()), // An array of strings for 'neuropathy'
              }
        )
    }),

})

const addNoteZodSchema = z.object({
    body: z.object({
        note: z.string(),
    }),
})

export const ReportValidation = {
    updateBiopsySamplesZodSchema,
    addNoteZodSchema,
};