import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/Book.service.js";
import { AuthorService } from "../services/Author.service.js";
import { contains, equals } from "../utils/filter.utils.js";
import { sortByField } from "../utils/sort.utils.js";
import { paginate } from "../utils/pagination.utils.js";
import { Book } from "../models/book.model.js";
import { parseId } from "../utils/parseId.utils.js";

export class BookController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let result = BookService.getAllBooks();
            if (req.query.title) {
                const title = String(req.query.title);
                result = result.filter(b => contains(b.title, title));
            }
            if (req.query.author) {
                const name = String(req.query.author).toLowerCase();
                const matchedAuthors = AuthorService.getAllAuthors().filter(a => {
                    const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();
                    return fullName.includes(name)
                });
                const authorIds = matchedAuthors.map(a => a.id);
                result = result.filter(b => authorIds.includes(b.authorId));
            }
            if (req.query.language) {
                result = result.filter(b =>
                    equals(b.language.toLowerCase(), String(req.query.language).toLowerCase())
                );
            }
            if (req.query.publishedYear) {
                result = result.filter(b => 
                    equals(b.publishedYear, Number(req.query.publishedYear))
                );
            }
            if (req.query.sortBy) {
                const sortBy = req.query.sortBy as keyof Book;
                const order = (req.query.order as "asc" | "desc") || "asc";
                result = sortByField(result, sortBy, order);
            }
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const response = paginate(result, page, limit);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
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
            const id = parseId(String(req.params.id));
            const updated = BookService.updateBook(id, req.body);
            res.json(updated);
        } catch (err) {
            next(err);
        }
    }
    static delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            BookService.deleteBook(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}