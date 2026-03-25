import { books as booksFaker } from "../data/mock/Books.mock.faker.js"; 
import { Book } from "../models/book.model.js";
 
function logBooks(title: string, books: Book[]): void { 
  console.log("\n" + "=".repeat(60)); 
  console.log(title); 
  console.log("=".repeat(60)); 
  console.table(books); 
  console.log(`Total: ${books.length} books\n`); 
} 
 
async function main(): Promise<void> { 
  logBooks("1. Faker (generated)", booksFaker); 
} 
 
main().catch((err) => { 
  console.error("Failed to load books:", err); 
  process.exit(1); 
});