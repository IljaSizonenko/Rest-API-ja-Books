import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/Review.service.js";
import { parseId } from "../utils/parseId.utils.js";
import { BookService } from "../services/Book.service.js";
import { reviewCreateSchema } from "../validators/review.validators.js";

export class ReviewController {
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const review = ReviewService.getReviewById(id);
            res.json(review);
        } catch (err) {
            next(err);
        }
    }
    static getByBook(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            BookService.getBookById(bookId);
            const reviews = ReviewService.getReviewsByBookId(bookId);
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }
    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const book = BookService.getBookById(bookId);
            if (!book) {
                return res.status(404).json({
                    error: "Book not found",
                    details: []
                });
            }
            const parsed = reviewCreateSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: parsed.error.issues.map(e => ({
                        field: e.path.join("."),
                        message: e.message
                    }))
                });
            }
            const review = ReviewService.addReview(bookId, parsed.data);
            res.status(201).json(review);
        } catch (err) {
            next(err);
        }
    }
    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const updated = ReviewService.updateReview(id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            ReviewService.deleteReview(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
    static getAverageRating(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            BookService.getBookById(bookId);
            const rating = ReviewService.getAverageRating(bookId);
            res.json({ rating });
        } catch (err) {
            next(err);
        }
    }
}