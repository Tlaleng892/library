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
      
${book.cover ? `<img src="${book.cover}" style="width:150px; height:200px; object-fit:cover; border-radius:8px;">` : ''}
<h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p>${book.pages} pages</p>
                  <p>${"⭐".repeat(book.rating || 0) || "No rating yet"}</p>
                  <button onclick="rateBook(${realIndex})">Rate ⭐</button>
      <p>${book.read ? "✅ Finished" : "📖 Not Yet"}</p>
      <button onclick="toggleRead(${realIndex})">${book.read ? "Mark Unread" : "Mark Read"}</button>
            <button onclick="editBook(${realIndex})">Edit</button>
      <button onclick="deleteBook(${realIndex})">Delete</button>
    `;
    container.appendChild(card);
  });
  updateStats();
}

function addBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("cover").value;
  if (title === "" || author === "") return alert("Please fill in title and author");
  myLibrary.push({ title: title, author: author, pages: Number(pages) || 0, read: false, rating: 0, cover: cover });
  saveLibrary();
  renderBooks();
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("cover").value = "";
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
function editBook(index) {
  let book = myLibrary[index];
  let newTitle = prompt("Edit Title:", book.title);
  if (newTitle === null) return;
  let newAuthor = prompt("Edit Author:", book.author);
  if (newAuthor === null) return;
  let newPages = prompt("Edit Pages:", book.pages);
  if (newPages === null) return;
  book.title = newTitle;
  book.author = newAuthor;
  book.pages = Number(newPages) || 0;
  saveLibrary();
  renderBooks();
}function rateBook(index) {
  let rating = prompt("Rate 1 to 5 stars:", myLibrary[index].rating || "");
  if (rating === null) return;
  rating = Number(rating);
  if (rating < 1 || rating > 5) { alert("Please enter 1 to 5"); return; }
  myLibrary[index].rating = rating;
  saveLibrary();
  renderBooks();
}