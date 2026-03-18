import { authors } from "../data/mock/Authors.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Author } from "../models/author.model.js";

export class AuthorService {
    static getAllAuthors(): Author[] {
        return authors;
    }
    static getAuthorById(id: number): Author | undefined {
        return authors.find(author => author.id === id);
    }
    static getBooksByAuthor(id: number) {
        return books.filter(book => book.authorId === id);
    }
    static getAuthorWithRelations(id: number) {
        const author = this.getAuthorById(id);
        if (!author) return undefined;
        const writtenBooks = this.getBooksByAuthor(id);
        return {
            ...author,
            books: writtenBooks
        };
    }
}