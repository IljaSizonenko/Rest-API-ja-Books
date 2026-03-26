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
        url: "http://localhost:3000/api/v1",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            year: { type: "integer" },
            authorId: { type: "integer" },
            genreId: { type: "integer" },
            publisherId: { type: "integer" },
          },
          required: ["title", "authorId", "genreId", "publisherId"],
        },
        Author: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            bio: { type: "string" },
          },
          required: ["name"],
        },
        Genre: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
          required: ["name"],
        },
        Publisher: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
          required: ["name"],
        },
        Review: {
          type: "object",
          properties: {
            id: { type: "integer" },
            bookId: { type: "integer" },
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
          required: ["bookId", "rating"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;