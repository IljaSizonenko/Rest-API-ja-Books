import { publishers } from "../data/mock/Publishers.mock.faker.js";
import { books } from "../data/mock/Books.mock.faker.js";
import { Publisher } from "../models/publisher.model.js";

export class PublisherService {
    static getAllPublishers(): Publisher[] {
        return publishers;
    }
    static getPublisherById(id: number): Publisher | undefined {
        return publishers.find(publisher => publisher.id === id);
    }
    static getBooksByPublisher(id: number) {
        return books.filter(book => book.publisherId === id)
    }
    static getPublisherWithRelations(id: number) {
        const publisher = this.getPublisherById(id);
        if (!publisher) return undefined;
        const relatedBooks = this.getBooksByPublisher(id);
        return {
            ...publisher,
            books: relatedBooks
        };
    }
}