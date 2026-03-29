import { authors } from "../data/mock/Authors.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Author } from "../models/author.model.js";
import { Book } from "../models/book.model.js";
export class AuthorService {
    private static findAuthorOrThrow(id: number): Author {
        const author = authors.find(a => a.id === id);
        if (!author) {
            throw {
                status: 404,
                message: "Author not found",
                details: []
            };
        }
        return author;
    }
    static getAllAuthors(): Author[] {
        return authors;
    }
    static getAuthorById(id: number): Author {
        const author =  authors.find(author => author.id === id);
        if (!author) {
            throw {
                status: 404,
                message: "Author not found",
                details: []
            };
        }
        return author
    }
    static getBooksByAuthor(id: number): Book[] {
        return books.filter(book => book.authorId === id);
    }
    static getAuthorWithRelations(id: number) {
        const author = this.findAuthorOrThrow(id);
        const writtenBooks = this.getBooksByAuthor(id);
        return {
            ...author,
            books: writtenBooks
        };
    }
}