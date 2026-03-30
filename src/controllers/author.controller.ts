import { Request, Response, NextFunction } from "express";
import { AuthorService } from "../services/Author.service.js";
import { parseId } from "../utils/parseId.utils.js";

export class AuthorController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const authors = AuthorService.getAllAuthors();
            res.json(authors);
        } catch (err) {
            next(err);
        }
    }
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const author = AuthorService.getAuthorById(id);
            res.json(author);
        } catch (err) {
            next(err);
        }
    } 
    static getWithRelations(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const author = AuthorService.getAuthorWithRelations(id);
            res.json(author);
        } catch (err) {
            next(err);
        }
    }
}