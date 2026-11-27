let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: true, rating: 0 },
  { title: "Harry Potter", author: "J.K. Rowling", pages: 300, read: false, rating: 0 }
];
let currentFilter = "all";

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function setFilter(filter) {
  currentFilter = filter;
  renderBooks();
}

function updateStats() {
  let total = myLibrary.length;
  let finished = myLibrary.filter(b => b.read).length;
  let toRead = total - finished;
  let totalPages = myLibrary.reduce((sum, b) => sum + Number(b.pages), 0);
  document.getElementById("stats").innerHTML = 
    `📚 ${total} books &nbsp; | &nbsp; ✅ ${finished} finished &nbsp; | &nbsp; 📖 ${toRead} to read &nbsp; | &nbsp; 📄 ${totalPages} pages total`;
}

function renderBooks() {
  let container = document.getElementById("library");
  let searchText = document.getElementById("search").value.toLowerCase();
  let sortBy = document.getElementById("sort").value;
  container.innerHTML = "";

  let filtered = myLibrary.filter(book => {
    let matchesSearch = book.title.toLowerCase().includes(searchText) || book.author.toLowerCase().includes(searchText);
    let matchesFilter = currentFilter === "all" || (currentFilter === "read" && book.read) || (currentFilter === "unread" && !book.read);
    return matchesSearch && matchesFilter;
  });

  if (sortBy === "title") filtered.sort((a,b) => a.title.localeCompare(b.title));
  if (sortBy === "pages") filtered.sort((a,b) => a.pages - b.pages);
  if (sortBy === "rating") filtered.sort((a,b) => b.rating - a.rating);

  filtered.forEach((book) => {
    let realIndex = myLibrary.indexOf(book);
    let card = document.createElement("div");
    card.className = "book-card" + (book.read ? " read" : "");
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "✅ Finished" : "📖 Not Yet"}</p>
      <button onclick="toggleRead(${realIndex})">${book.read ? "Mark Unread" : "Mark Read"}</button>
      <button onclick="deleteBook(${realIndex})">Delete</button>
    `;
    container.appendChild(card);
  });
  updateStats();
}

function addBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  if (title === "" || author === "") return alert("Please fill in title and author");
  myLibrary.push({ title: title, author: author, pages: Number(pages) || 0, read: false, rating: 0 });
  saveLibrary();
  renderBooks();
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
}

function toggleRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
  saveLibrary();
  renderBooks();
}

function deleteBook(index) {
  if (confirm("Delete this book?")) {
    myLibrary.splice(index, 1);
    saveLibrary();
    renderBooks();
  }
}

document.getElementById("search").addEventListener("input", renderBooks);
renderBooks();