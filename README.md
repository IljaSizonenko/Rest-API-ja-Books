Autor: Ilja Sizonenko <br>
Rest API ja Books on backendi rakendus, mis koosneb kahest osast ja on loodud raamatuandmete haldamiseks. <br>
1 osa on selline osa, mis kasutab fake mock-andmed, <br>
2 osa on selline osa, mis võtab andmed PostgreSQL andmebaasist. <br>
Mõlemad oasd kasutavad express.js ja sisaldavad CRUD funktsionaalsust.

**Kuidas installida?** <br>
Esiteks, on vaja installida rakendust käsuga "git clone https://github.com/IljaSizonenko/Rest-API-ja-Books.git" <br>
Teiseks, on vaja teha "npm install" selleks, et saada node_modules. Ilma selleta rakendus ei tööta.

**Kuidas käivitada?**<br>
Mõlemad osad kasutavad natuke teised tehnoloogiad, siis iga osa käivitatakse erinevalt. <br>
Osa1 käivitamiseks on vaja teha "npm run build", et kompileerida kogu osa. <br>
Pärast käivitada "npm start", mis käivitab serverit. <br>
Kui express ei ole installitud, siis on vaja käivitada "npm install --save-dev @types/express" <br>
Osa2 käivitamiseks on vaja teha "npm run dev" käsu. <br>
Enne seda on vaja käivitada "npm run seed", et andmebaasi andmetega täita. <br>
Mõlemate osade dokumentatsioon asub addressil http://localhost:3000/api-docs/ <br>
NB! Ühelt serverilt teisele vahetamiseks on vaja sulgeda Swaggeri ja VS Code'i ning seejärel uuesti VS Code'i avama.

**API endpoint'id**<br>
Mõlemad osad kasutavad samad endpoint'id: <br>
Books: <br>
GET/api/v1/books, mis tagastab kõik raamatud koos filtreerimisega, sorteerimisega ja paginatsiooniga <br>
POST/api/v1/books, mis lisab uue raamatu <br>
GET/api/v1/books/{id}, mis tagastab raamatu ID järgi, <br>
PUT/api/v1/books/{id}, mis Uuendab raamatu andmeid <br>
DELETE/api/v1/books/{id}, mis eemaldab raamatut <br>

Reviews: <br>
GET/api/v1/books/{bookId}/reviews, mis tagastab kõik raamatu arvustused <br>
POST/api/v1/books/{bookId}/reviews, mis lisab uut arvustust. <br>
GET/api/v1/books/{bookId}/reviews/average, mis tagastab raamatu keskmist hinnangut.

**Kuidas testida?** <br>
Kogu juhis, kuidas testida, on kirjeldatud Swagger UI osas. <br>
Swagger UI näitab andmed sisestamiseks, millised vead võivad tekkida ja nii edasi.

**cURL näited** <br>
Kõik raamatud: <br>
curl -X 'GET' \ <br>
  'http://localhost:3000/api/v1/books?title=the' \ <br>
  -H 'accept: application/json'<br>

Uue raamatu lisamine:
curl -X 'POST' \ <br>
  'http://localhost:3000/api/v1/books' \ <br>
  -H 'accept: application/json' \ <br>
  -H 'Content-Type: application/json' \ <br>
  -d '{ <br>
  "title": "string",<br>
  "isbn": "193171344",<br>
  "publishedYear": 2025,<br>
  "pageCount": 3,<br>
  "language": "en",<br>
  "description": "wer",<br>
  "coverImage": "https://example.com.jpg",<br>
  "authorId": 9,<br>
  "publisherId": 3,<br>
  "genreIds": [<br>
    6,7<br>
  ]<br>
}'<br>

Kõik raamatud ID järgi: <br>
curl -X 'GET' \ <br>
  'http://localhost:3000/api/v1/books/3' \ <br>
  -H 'accept: application/json' <br>

Raamatu uuendamine: <br>
curl -X 'PUT' \<br>
  'http://localhost:3000/api/v1/books/10' \ <br>
  -H 'accept: application/json' \ <br>
  -H 'Content-Type: application/json' \ <br>
  -d '{<br>
  "title": "string",<br>
  "isbn": "1451345132",<br>
  "publishedYear":2026,<br>
  "pageCount": 3,<br>
  "language": "rt",<br>
  "description": "wert",<br>
  "coverImage": "https://example.com.jpg",<br>
  "authorId": 8,<br>
  "publisherId": 3,<br>
  "genreIds": [<br>
    6,7<br>
  ]<br>
}'<br>

Raamatu eemaldamine: <br>
curl -X 'DELETE' \ <br>
  'http://localhost:3000/api/v1/books/10' \ <br>
  -H 'accept: application/json'<br>

Kõik arvustused:<br>
curl -X 'GET' \<br>
  'http://localhost:3000/api/v1/books/4/reviews' \ <br>
  -H 'accept: application/json'<br>

Uue arvustuse lisamine: <br>
curl -X 'POST' \ <br>
  'http://localhost:3000/api/v1/books/3/reviews' \ <br>
  -H 'accept: application/json' \ <br>
  -H 'Content-Type: application/json' \ <br>
  -d '{ <br>
  "userName": "string", <br>
  "rating": 5, <br>
  "comment": "string" <br>
}' <br>

Keskmised hinnangud: <br>
curl -X 'GET' \ <br>
  'http://localhost:3000/api/v1/books/2/reviews/average' \ <br>
  -H 'accept: application/json'
