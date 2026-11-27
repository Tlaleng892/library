const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Test: add 2 books manually
addBookToLibrary("Atomic Habits", "James Clear", 320, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

function displayBooks() {
  const list = document.getElementById("book-list");
  list.innerHTML = "";
  myLibrary.forEach(book => {
    const div = document.createElement("div");
    div.textContent = book.title + " by " + book.author + " - " + book.pages + " pages";
    list.appendChild(div);
  });
}

displayBooks();

// NEW PART - Listen to the form!
const form = document.getElementById("book-form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  addBookToLibrary(title, author, pages, false);
  displayBooks();
  form.reset();
});