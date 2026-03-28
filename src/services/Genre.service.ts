import { genres } from "../data/mock/Genres.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Genre } from "../models/genre.model.js";
import { Book } from "../models/book.model.js";

export class GenreService {
    static getAllGenres(): Genre[] {
        return genres;
    }
    static getGenreById(id: number): Genre | undefined {
        return genres.find(genre => genre.id === id);
    }
    static getBooksByGenre(id: number): Book[] {
        return books.filter(book => book.genreIds.includes(id));
    }
    private static findGenreOrThrow(id: number): Genre {
        const genre = genres.find(g => g.id === id);
        if (!genre) {
            throw {
                status: 404,
                message: "Genre not found",
                details: []
            }
        }
        return genre;
    }
    static getGenreWithRelations(id: number) {
        const genre = this.findGenreOrThrow(id);
        const relatedBooks = this.getBooksByGenre(id);
        return {
            ...genre,
            books: relatedBooks
        };
    }
}