import { books } from "../data/mock/Books.mock.faker.js";
import { authors } from "../data/mock/Authors.mock.faker.js";
import { genres } from "../data/mock/Genres.mock.faker.js";
import { publishers } from "../data/mock/Publishers.mock.faker.js";
import { reviews } from "../data/mock/Reviews.mock.faker.js";
import { Book } from "../models/book.model.js";
import { NotFoundError } from "../middleware/notfounderrod.moddleware.js";
import { AuthorService } from "./Author.service.js";
import { PublisherService } from "./Publisher.service.js";
import { GenreService } from "./Genre.service.js";

export class BookService {
    static getAllBooks(): Book[] {
        return books;
    }
    static getBookById(id: number): Book {
        const book = books.find(book => book.id === id);
        if (!book) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
        return book
    } 
    static getBooksByAuthor(authorId: number): Book[] {
        return books.filter(book => book.authorId === authorId);
    }
    static getBooksByPublisher(publisherId: number): Book[] {
        return books.filter(book => book.publisherId === publisherId);
    }
    static getBookWithRelations(id: number) {
        const book = this.findBookOrThrow(id);
        const relatedAuthors = authors.filter(a => a.id === book.authorId);
        const relatedGenres = genres.filter(g => book.genreIds.includes(g.id));
        const relatedPublisher = publishers.find(p => p.id === book.publisherId);
        const relatedReviews = reviews.filter(r => r.bookId === id);
        return {
            ...book,
            authors: relatedAuthors,
            genres: relatedGenres,
            publisher: relatedPublisher,
            reviews: relatedReviews
        };
    }
    private static findBookIndexOrThrow(id: number): number {
        const index = books.findIndex(b => b.id === id);
        if (index === -1) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
        return index;
    }
    private static findBookOrThrow(id: number): Book {
        const book = books.find(b => b.id === id);
        if (!book) {
            throw {
                status: 404,
                message: "Book not found",
                details: []
            };
        }
        return book;
    }
    static createBook(data: Omit<Book, "id">): Book {
        AuthorService.getAuthorById(data.authorId);
        PublisherService.getPublisherById(data.publisherId);
        data.genreIds.forEach(id => GenreService.getGenreById(id));
        const newBook: Book = {
            ...data,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        books.push(newBook);
        return newBook;
    }
    static updateBook(id: number, data: Partial<Omit<Book, "id">>): Book {
        const book = this.getBookById(id);
        if (data.authorId !== undefined) {
            AuthorService.getAuthorById(data.authorId);
        }
        if (data.genreIds !== undefined) {
            data.genreIds.forEach(id => GenreService.getGenreById(id));
        }
        if (data.publisherId !== undefined) {
            PublisherService.getPublisherById(data.publisherId);
        }
        const updated: Book = {
            ...book,
            ...data,
            updatedAt: new Date().toISOString()
        };
        const index = books.findIndex(b => b.id === id);
        books[index] = updated;
        return updated;
    }
    static deleteBook(id: number): void {
        const index = this.findBookIndexOrThrow(id);
        books.splice(index, 1);
    }
}