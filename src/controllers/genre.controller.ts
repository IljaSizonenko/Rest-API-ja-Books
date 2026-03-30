import { Request, Response, NextFunction } from "express";
import { GenreService } from "../services/Genre.service.js";
import { parseId } from "../utils/parseId.utils.js";

export class GenreController {
    static getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const genres = GenreService.getAllGenres();
            res.json(genres)
        } catch (err) {
            next(err);
        }
    }
    static getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const genre = GenreService.getGenreById(id);
            res.json(genre);
        } catch (err) {
            next(err);
        }
    }
    static getWithRelations(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseId(String(req.params.id));
            const genre = GenreService.getGenreWithRelations(id);
            res.json(genre);
        } catch (err) {
            next(err);
        }
    }
}