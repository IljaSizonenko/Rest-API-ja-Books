import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/Review.service.js";

export class ReviewController {
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const review = ReviewService.getReviewById(id);
            res.json(review);
        } catch (err) {
            next(err);
        }
    }
    static getByBook(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = Number(req.params.bookId);
            const reviews = ReviewService.getReviewsByBookId(bookId);
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }
    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = Number(req.params.id);
            const review = ReviewService.addReview(bookId, req.body);
            res.status(201).json(review);
        } catch (err) {
            next(err);
        }
    }
    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const updated = ReviewService.updateReview(id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            ReviewService.deleteReview(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
    static getAverageRating(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = Number(req.params.id);
            const rating = ReviewService.getAverageRating(bookId);
            res.json({ rating });
        } catch (err) {
            next(err);
        }
    }
}