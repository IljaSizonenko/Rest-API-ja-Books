import { reviews } from "../data/mock/Reviews.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js";
import { ValidationError } from "../middleware/validationError.middleware.js";
import { NotFoundError } from "../middleware/notfounderrod.moddleware.js";

export class ReviewService {
    private static findReviewOrThrow(id: number): Review {
        const review = reviews.find(r => r.id === id);
        if (!review) {
            throw {
                status: 404,
                message: "Review not found",
                details: []
            };
        }
        return review;
    }
    private static findBookOrThrow(bookId: number): Book {
        const book = books.find(b => b.id === bookId);
        if (!book) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
        return book;
    }
    static getReviewsByBookId(bookId: number): Review[] {
        return reviews.filter(review => review.bookId === bookId);
    }
    static getReviewById(id: number): Review {
        const review = reviews.find(review => review.id === id);
        if (!review) {
            throw {
                status: 404,
                message: "Review not found",
                details: []
            };
        }
        return review
    }
    static addReview(
        bookId: number,
        data: Omit<Review, "id" | "createdAt" | "bookId">
    ): Review {
        this.findBookOrThrow(bookId);
        const newReview: Review = {
            id: Date.now(),
            bookId,
            userName: data.userName,
            rating: data.rating,
            comment: data.comment,
            createdAt: new Date().toISOString()
        };
        reviews.push(newReview);
        return newReview;
    }
    static updateReview(
        id: number,
        data: Partial<Omit<Review, "id" | "bookId" | "createdAt">>
    ): Review {
        const review = this.findReviewOrThrow(id);
        if (data.rating !== undefined) {
            if (typeof data.rating !== "number" || data.rating < 1 || data.rating > 5) {
                throw new ValidationError("Rating must be a number between 1 and 5");
            }
        }
        if (data.userName !== undefined) {
            review.userName = data.userName;
        }
        if (data.comment !== undefined) {
            review.comment = data.comment;
        }
        if (data.rating !== undefined) {
            review.rating = data.rating;
        }
        return review;
    }
    static deleteReview(id: number): void {
        const index = reviews.findIndex(r => r.id === id);
        if (index === -1) {
            throw new NotFoundError("Review not found");
        }
        reviews.splice(index, 1)
    }
    static getAverageRating(bookId: number): number | null {
        const bookReviews = this.getReviewsByBookId(bookId);
        if (bookReviews.length === 0) {
            return 0;
        }
        const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
        return parseFloat((sum / bookReviews.length).toFixed(2));
    }
}