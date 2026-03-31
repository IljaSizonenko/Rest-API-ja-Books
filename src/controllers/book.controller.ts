import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { parseId } from "../utils/parseId.utils";

export class BookController {
    static async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await BookService.getAllBooks(req.query);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    static async getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const book = await BookService.getBookById(id);
            res.json(book);
        } catch (error) {
            next(error);
        }
    }
    static async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await BookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    }
    static async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const updated = await BookService.updateBook(id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }
    static async deleteBook(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const result = await BookService.deleteBook(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}