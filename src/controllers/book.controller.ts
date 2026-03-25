import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/Book.service.js";

export class BookController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const books = BookService.getAllBooks();
            res.json(books);
        } catch (err) {
            next(err);
        }
    }
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const book = BookService.getBookById(id);
            res.json(book);
        } catch (err) {
            next(err);
        }
    }
    static create(req: Request, res: Response, next: NextFunction) {
        try {
            const book = BookService.createBook(req.body);
            res.status(201).json(book)
        } catch (err) {
            next(err);
        }
    }
    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const updated = BookService.updateBook(id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            BookService.deleteBook(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}