import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API Mock",
      version: "1.0.0",
      description: "API documentation for Book API with PostgreSQL data",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            isbn: { type: "string" },
            publishedYear: { type: "integer" },
            pageCount: { type: "integer" },
            language: { type: "string" },
            description: { type: "string", nullable: true },
            coverImage: { type: "string", nullable: true },
            authorId: { type: "integer" },
            publisherId: { type: "integer" },
            genreIds: {
              type: "array",
              items: { type: "integer" },
              nullable: true
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        BookCreate: {
          type: "object",
          properties: {
            title: { type: "string" },
            isbn: { type: "string" },
            publishedYear: { type: "integer" },
            pageCount: { type: "integer" },
            language: { type: "string" },
            description: { type: "string" },
            coverImage: { type: "string" },
            authorId: { type: "integer" },
            publisherId: { type: "integer" },
            genreIds: {
              type: "array",
              items: { type: "integer" }
            }
          },
          required: ["title", "isbn", "publishedYear", "pageCount", "language", "authorId", "publisherId"]
        },
        BookUpdate: {
          type: "object",
          description: "Partial update of a book",
          properties: {
            title: { type: "string" },
            isbn: { type: "string" },
            publishedYear: { type: "integer" },
            pageCount: { type: "integer" },
            language: { type: "string" },
            description: { type: "string" },
            coverImage: { type: "string" },
            authorId: { type: "integer" },
            publisherId: { type: "integer" },
            genreIds: {
              type: "array",
              items: { type: "integer" }
            }
          }
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "integer" },
            bookId: { type: "integer" },
            reviewer: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        ReviewCreate: {
          type: "object",
          properties: {
            reviewer: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" }
          },
          required: ["reviewer", "rating", "comment"]
        },
        Pagination: {
          type: "object",
          properties: {
            currentPage: { type: "integer" },
            totalPages: { type: "integer" },
            totalItems: { type: "integer" },
            itemsPerPage: { type: "integer" },
            hasNextPage: { type: "boolean" },
            hasPreviousPage: { type: "boolean" }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;