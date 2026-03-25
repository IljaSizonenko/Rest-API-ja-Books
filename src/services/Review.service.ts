import { reviews } from "../data/mock/Reviews.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Review } from "../models/review.model.js"

export class ReviewService {
    static getReviewsByBookId(bookId: number): Review[] {
        return reviews.filter(review => review.bookId === bookId);
    }
    static getReviewById(id: number): Review | undefined {
        return reviews.find(review => review.id === id);
    }
    static addReview(
        bookId: number,
        data: Omit<Review, "id" | "createdAt" | "bookId">
    ): Review | undefined {
        const bookExists = books.some(book => book.id === bookId);
        if (!bookExists) return undefined;
        const newReview: Review = {
            id: reviews.length + 1,
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
    ): Review | undefined {
        const review = this.getReviewById(id);
        if (!review) return undefined;
        Object.assign(review, data);
        return review;
    }
    static deleteReview(id: number): boolean {
        const index = reviews. findIndex(r => r.id === id);
        if (index === -1) return false;
        reviews.splice(index, 1);
        return true;
    }
    static getAverageRating(bookId: number): number | null {
        const bookReviews = this.getReviewsByBookId(bookId);
        if (bookReviews.length === 0) return null;
        const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
        return parseFloat((sum / bookReviews.length).toFixed(2));
    }
}