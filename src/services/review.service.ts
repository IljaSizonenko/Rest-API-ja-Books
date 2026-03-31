import { prisma } from "../prisma/prismaClient";
import { NotFoundError } from "../middleware/notfounderror.middleware";

export class ReviewService {
    static async getReviewByBookId(bookId: number) {
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
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
        const book = await prisma.book.findUnique({
            where: { id: data.bookId },
        });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
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
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
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