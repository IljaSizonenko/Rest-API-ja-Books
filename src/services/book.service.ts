import { prisma } from "../prisma/prismaClient";
import { NotFoundError } from "../middleware/notfounderror.middleware";
import { prismaContains, prismaEquals } from "../utils/filter.utils";
import { getPagination, buildPaginationMeta } from "../utils/pagination.utils";
import { getSortOptions } from "../utils/sort.utils";

export class BookService {
    static async getAllBooks(query: any) {
        const { page, limit, skip, take } = getPagination(query.page, query.limit);
        const where = {
            title: prismaContains(query.title),
            language: prismaEquals(query.language),
            publishedYear: prismaEquals(Number(query.year)),
            author: query.author
                ? {
                    OR: [
                        { firstName: prismaContains(query.author) },
                        { lastName: prismaContains(query.author) }
                    ]
                }
                : undefined,
            genres: query.genre
                ? { some: { name: prismaContains(query.genre) } }
                : undefined,
            publisher: query.publisher
                ? { name: prismaContains(query.publisher) }
                : undefined
        };
        const orderBy = getSortOptions(query.sortBy, query.order);
        const [totalItems, books] = await Promise.all([
            prisma.book.count({ where }),
            prisma.book.findMany({
                where,
                include: {
                    author: true,
                    publisher: true,
                    genres: true,
                    reviews: true,
                },
                orderBy,
                skip,
                take
            })
        ]);
        return {
            data: books,
            pagination: buildPaginationMeta(totalItems, page, limit)
        };
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
        await prisma.author.findUniqueOrThrow({ where: { id: data.authorId } });
        await prisma.publisher.findUniqueOrThrow({ where: { id: data.publisherId } });
        for (const gid of data.genreIds) {
            await prisma.genre.findUniqueOrThrow({ where: { id: gid } });
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
            title: string;
            isbn: string;
            publishedYear: number;
            pageCount: number;
            language: string;
            description: string;
            authorId: number;
            publisherId: number;
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
                    ? { set: data.genreIds.map((gid) => ({ id: gid })) }
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
        await prisma.book.delete({ where: { id } });
        return { message: "Book deleted" };
    }
}