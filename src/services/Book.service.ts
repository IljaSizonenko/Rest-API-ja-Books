import { books } from "../data/mock/Books.mock.faker.js";
import { authors } from "../data/mock/Authors.mock.faker.js";
import { genres } from "../data/mock/Genres.mock.faker.js";
import { publishers } from "../data/mock/Publishers.mock.faker.js";
import { reviews } from "../data/mock/Reviews.mock.faker.js";
import { Book } from "../models/book.model.js";

export class BookService {
    static getAllBooks(): Book[] {
        return books;
    }
    static getBookById(id: number): Book | undefined {
        return books.find(book => book.id === id);
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
        const newBook: Book = {
            ...data,
            id: Date.now()
        };
        books.push(newBook);
        return newBook;
    }
    static updateBook(id: number, data: Partial<Book>): Book {
        const index = this.findBookIndexOrThrow(id);
        books[index] = { ...books[index], ...data };
        return books[index];
    }
    static deleteBook(id: number): void {
        const index = this.findBookIndexOrThrow(id);
        books.splice(index, 1);
    }
}