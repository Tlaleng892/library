class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now() + Math.random();
  }
}

let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [
  new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
  new Book("Harry Potter", "J.K. Rowling", 300, false)
];

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function displayBooks() {
  const list = document.getElementById("book-list");
  const search = document.getElementById("search")?.value.toLowerCase() || "";
  list.innerHTML = "";

  myLibrary
    .filter(book => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search))
    .forEach(book => {
      const div = document.createElement("div");
      div.className = "book-card" + (book.read ? " read" : "");
      div.innerHTML = `
        <strong>${book.title}</strong><br>
        by ${book.author} - ${book.pages} pages<br>
        <span>${book.read ? "✅ Finished" : "📖 Not yet"}</span><br>
        <button onclick="toggleRead(${book.id})">${book.read ? "Mark Unread" : "Mark Read"}</button>
        <button onclick="deleteBook(${book.id})">Delete</button>
      `;
      list.appendChild(div);
    });
}

function toggleRead(id) {
  const book = myLibrary.find(b => b.id === id);
  if (book) book.read = !book.read;
  saveLibrary();
  displayBooks();
}

function deleteBook(id) {
  myLibrary = myLibrary.filter(b => b.id !== id);
  saveLibrary();
  displayBooks();
}

document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  myLibrary.push(new Book(title, author, pages));
  saveLibrary();
  displayBooks();
  this.reset();
});

document.getElementById("search")?.addEventListener("input", displayBooks);

displayBooks();