import { z } from "zod"

export const reviewCreateSchema = z.object({
    reviewer: z.string().min(1, "Reviewer name is required"),
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    comment: z.string().min(1, "Comment is required")
});