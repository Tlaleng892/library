const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // unique id for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype to toggle read status later
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Test: add 2 books manually
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

console.log(myLibrary);
