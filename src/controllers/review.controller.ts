import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/review.service";
import { parseId } from "../utils/parseId.utils";

export class ReviewController {
    static async getReviewsByBookId(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const reviews = await ReviewService.getReviewByBookId(bookId);
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }
    static async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const { rating, comment, userName } = req.body;
            const review = await ReviewService.createReview({
                bookId,
                rating,
                comment,
                userName,
            });
            res.status(201).json(review);
        } catch (err) {
            next(err)
        }
    }
    static async getAverageRating(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = parseId(String(req.params.bookId));
            const result = await ReviewService.getAverageRating(bookId);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}