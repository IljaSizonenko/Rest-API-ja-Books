import { prisma } from "../prisma/prismaClient";
import { NotFoundError } from "../middleware/notfounderror.middleware";

export class ReviewService {
    private static async ensureBookExists(bookId: number) {
        const book = await prisma.book.findUnique({ where: { id: bookId} });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
    }
    static async getReviewByBookId(
        bookId: number,
        query?: { rating?: number; sortBy?: string; order?: "asc" | "desc" }
    ) {
        await this.ensureBookExists(bookId);
        const where = {
            bookId,
            rating: query?.rating ? Number(query.rating) : undefined,
        };
        const allowedSortFields = ["createdAt", "rating", "userName"] as const;
        let orderBy: any = { createdAt: "desc" };
        if (query?.sortBy && allowedSortFields.includes(query.sortBy as any)) {
            orderBy = {
                [query.sortBy]: query.order === "desc" ? "desc" : "asc",
            };
        }
        return prisma.review.findMany({
            where,
            orderBy,
            include: { book: true },
        });
    }
    static async createReview(data: {
        bookId: number;
        rating: number;
        comment: string;
        userName: string;
    }) {
        return prisma.$transaction(async (tx) => {
            await tx.book.findUniqueOrThrow({ where: { id: data.bookId } });
            if (data.rating < 1 || data.rating > 5) {
                throw new Error("Rating must be between 1 and 5");
            }
            return tx.review.create({
                data: {
                    rating: data.rating,
                    comment: data.comment,
                    userName: data.userName,
                    bookId: data.bookId,
                },
                include: { book: true },
            });
        });
    }
    static async updateReview(
        id: number,
        data: Partial<{
            rating: number;
            comment: string;
            userName: string;
        }>
    ) {
        return prisma.$transaction(async (tx) => {
            const review = await tx.review.findUnique({ where: { id } });
            if (!review) {
                throw new NotFoundError("Review not found");
            }
            if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
                throw new Error("Rating must be between 1 and 5");
            }
            return tx.review.update({
                where: { id },
                data,
                include: { book: true },
            });
        });
    }
    static async deleteReview(id: number) {
        return prisma.$transaction(async (tx) => {
            const review = await tx.review.findUnique({ where: { id } });
            if (!review) {
                throw new NotFoundError("Review not found");
            }

            await tx.review.delete({ where: { id } });

            return { message: "Review deleted" };
        });
    }
    static async getAverageRating(bookId: number) {
        await this.ensureBookExists(bookId);
        const result = await prisma.review.aggregate({
            where: { bookId },
            _avg: { rating: true },
        });
        return {
            bookId,
            averageRating: result._avg.rating ?? 0,
        };
    }
}