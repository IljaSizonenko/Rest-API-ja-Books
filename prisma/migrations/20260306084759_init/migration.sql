-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "author_books";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "authors";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "books";

-- CreateTable
CREATE TABLE "books"."Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors"."Author" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author_books"."AuthorBook" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "AuthorBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorBook_author_id_book_id_key" ON "author_books"."AuthorBook"("author_id", "book_id");

-- AddForeignKey
ALTER TABLE "author_books"."AuthorBook" ADD CONSTRAINT "AuthorBook_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author_books"."AuthorBook" ADD CONSTRAINT "AuthorBook_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
