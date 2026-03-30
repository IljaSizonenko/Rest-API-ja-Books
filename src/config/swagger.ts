import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book API Mock",
      version: "1.0.0",
      description: "API documentation for Book API with Mock data",
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
            description: { type: "string" },
            coverImage: { type: "string" },
            authorId: { type: "integer" },
            publisherId: { type: "integer" },
            genreIds: {
              type: "array",
              items: { type: "integer" }
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          },
          required: ["title", "isbn", "publishedYear", "authorId", "publisherId"],
        },
        Author: {
          type: "object",
          properties: {
            id: { type: "integer" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            birthYear: { type: "integer" },
            nationality: { type: "string" },
            biography: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          },
          required: ["firstName", "lastName", "birthYear", "nationality"]
        },
        Genre: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" }
          },
          required: ["name"]
        },
        Publisher: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            country: { type: "string" },
            foundedYear: { type: "integer" },
            website: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          },
          required: ["name", "country", "foundedYear"]
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "integer" },
            bookId: { type: "integer" },
            userName: { type: "string" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          },
          required: ["bookId", "userName", "rating"]
        }
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;