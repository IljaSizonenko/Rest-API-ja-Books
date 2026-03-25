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
        const book = this.getBookById(id);
        if (!book) return undefined;
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
    static createBook(data: Book): Book {
        const newBook: Book = {
            ...data,
            id: Date.now()
        };
        books.push(newBook);
        return newBook;
    }
    static updateBook(id: number, data: Partial<Book>): Book {
        const index = books.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Book not found");
        }
        books[index] = { ...books[index], ...data };
        return books[index];
    }
    static deleteBook(id: number): void {
        const index = books.findIndex(b => b.id === id);
        if (index === -1) {
            throw new Error("Book not found")
        }
        books.splice(index, 1)
    }
}