import { publishers } from "../data/mock/Publishers.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Publisher } from "../models/publisher.model.js";
import { Book } from "../models/book.model.js";

export class PublisherService {
    private static findPublisherOrThrow(id: number): Publisher {
        const publisher = publishers.find(p => p.id === id);
        if (!publisher) {
            throw {
                status: 404,
                message: "Publisher not found",
                details: []
            };
        }
        return publisher;
    }
    static getAllPublishers(): Publisher[] {
        return publishers;
    }
    static getPublisherById(id: number): Publisher {
        const publisher = publishers.find(publisher => publisher.id === id);
        if (!publisher) {
            throw {
                status: 404,
                message: "Publisher not found",
                details: []
            };
        }
        return publisher
    }
    static getBooksByPublisher(id: number): Book[] {
        return books.filter(book => book.publisherId === id)
    }
    static getPublisherWithRelations(id: number) {
        const publisher = this.findPublisherOrThrow(id);
        const relatedBooks = this.getBooksByPublisher(id);
        return {
            ...publisher,
            books: relatedBooks
        };
    }
}