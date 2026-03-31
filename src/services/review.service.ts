import { prisma } from "../prisma/prismaClient";
import { NotFoundError } from "../middleware/notfounderror.middleware";

export class ReviewService {
    private static async ensureBookExists(bookId: number) {
        const book = await prisma.book.findUnique({ where: { id: bookId} });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
    }
    static async getReviewByBookId(bookId: number) {
        await this.ensureBookExists(bookId);
        return prisma.review.findMany({
            where: { bookId },
            include: {
                book: true
            },
        });
    }
    static async createReview(data: {
        bookId: number;
        rating: number;
        comment?: string;
        reviewer: string;
    }) {
        await this.ensureBookExists(data.bookId);
        return prisma.review.create({
            data: {
                rating: data.rating,
                comment: data.comment,
                reviewer: data.reviewer,
                bookId: data.bookId,
            },
            include: {
                book: true
            },
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