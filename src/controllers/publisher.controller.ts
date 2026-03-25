import { Request, Response, NextFunction } from "express";
import { PublisherService } from "../services/Publisher.service.js";

export class PublisherController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const publishers = PublisherService.getAllPublishers();
            res.json(publishers);
        } catch (err) {
            next(err);
        }
    }
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const publisher = PublisherService.getPublisherById(id);
            res.json(publisher);
        } catch (err) {
            next(err);
        }
    }
    static getWithRelations(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const publisher = PublisherService.getPublisherWithRelations(id);
            res.json(publisher)
        } catch (err) {
            next(err);
        }
    }
}