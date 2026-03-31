import { z } from "zod";
export const bookCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    isbn: z.string().min(8, "ISBN must be at least 8 characters"),
    publishedYear: z.number().int().min(0, "Invalid year"),
    pageCount: z.number().int().min(1, "Page count must be positive"),
    language: z.string().min(1, "Language is required"),
    description: z.string().optional(),
    coverImage: z.string().url("Cover image must be a valid URL").optional(),
    authorId: z.number().int("Author ID must be a number"),
    publisherId: z.number().int("Publisher ID must be a number"),
    genreIds: z.array(z.number().int()).optional()
});
export const bookUpdateSchema = bookCreateSchema.partial();