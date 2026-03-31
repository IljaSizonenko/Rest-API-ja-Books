import { prisma } from "../prisma/prismaClient";
import { NotFoundError } from "../middleware/notfounderror.middleware";

export class BookService {
    static async getAllBooks() {
        return prisma.book.findMany({
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
    }
    static async getBookById(id: number) {
        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true, 
            },
        });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
        return book;
    }
    static async getBooksByAuthor(authorId: number) {
        return prisma.book.findMany({
            where: { authorId },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true, 
            },
        });
    }
    static async getBooksByPublisher(publisherId: number) {
        return prisma.book.findMany({
            where: { publisherId },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
    }
    static async getBookWithRelations(id: number) {
        const book = await prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
        if (!book) {
            throw new NotFoundError("Book not found");
        }
        return book;
    }
    static async createBook(data: {
        title: string;
        isbn: string;
        publishedYear: number;
        pageCount: number;
        language: string;
        description?: string;
        authorId: number;
        publisherId: number;
        genreIds: number[];
    }) {
        await prisma.author.findUniqueOrThrow({ where: { id: data.authorId} });
        await prisma.publisher.findUniqueOrThrow({ where: { id: data.publisherId} });
        for (const gid of data.genreIds) {
            await prisma.genre.findUniqueOrThrow({ where: {id: gid} });
        }
        return prisma.book.create({
            data: {
                title: data.title,
                isbn: data.isbn,
                publishedYear: data.publishedYear,
                pageCount: data.pageCount,
                language: data.language,
                description: data.description,
                authorId: data.authorId,
                publisherId: data.publisherId,
                genres: {
                    connect: data.genreIds.map((id) => ({ id })),
                },
            },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
    }
    static async updateBook(
        id: number,
        data: Partial<{
            title: string,
            isbn: string,
            publishedYear: number,
            pageCount: number,
            language: string,
            description: string,
            authorId: number,
            publisherId: number,
            genreIds: number[];
        }>
    ) {
        await prisma.book.findUniqueOrThrow({ where: { id } });
        if (data.authorId !== undefined) {
            await prisma.author.findUniqueOrThrow({ where: { id: data.authorId } });
        }
        if (data.publisherId !== undefined) {
            await prisma.publisher.findUniqueOrThrow({ where: { id: data.publisherId } });
        }
        if (data.genreIds !== undefined) {
            for (const gid of data.genreIds) {
                await prisma.genre.findUniqueOrThrow({ where: { id: gid } });
            }
        }
        return prisma.book.update({
            where: { id },
            data: {
                ...data,
                genres: data.genreIds
                ? {
                    set: data.genreIds.map((gid) => ({ id: gid })),
                }
                : undefined,
            },
            include: {
                author: true,
                publisher: true,
                genres: true,
                reviews: true,
            },
        });
    }
    static async deleteBook(id: number) {
        await prisma.book.findUniqueOrThrow({ where: { id } });
        await prisma.book.delete({
            where: { id },
        });
        return { message: "Book deleted" };
    }
}