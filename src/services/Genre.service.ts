import { genres } from "../data/mock/Genres.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Genre } from "../models/genre.model.js";

export class GenreService {
    static getAllGenres(): Genre[] {
        return genres;
    }
    static getGenreById(id: number): Genre | undefined {
        return genres.find(genre => genre.id === id);
    }
    static getBooksByGenre(id: number) {
        return books.filter(book => book.genreIds.includes(id));
    }
    static getGenreWithRelations(id: number) {
        const genre = this.getGenreById(id);
        if (!genre) return undefined;
        const relatedBooks = this.getBooksByGenre(id);
        return {
            ...genre,
            books: relatedBooks
        };
    }
}