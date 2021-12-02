const form = document.querySelector('.form');
const titleInput = document.querySelector('#input-title');
const authorInput = document.querySelector('#input-author');

class Book { // This is the constructor 
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
    this.books = [];
    this.bookShelf = document.querySelector('.books-section');
  }

  generateRandomId = () => Math.random().toString(20).substr(2, 20);

  getExistingBooks = () => JSON.parse(localStorage.getItem('books'));

  saveToLocalStorage = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };// Adding books 
  addBooks() {
    const newBook = {
      title: this.title,
      author: this.author,
      id: this.generateRandomId(),
    };

    if (this.getExistingBooks()) {
      this.getExistingBooks().forEach((existingBook) => {
        this.books.push(existingBook);
      });
    }// saving in local storage and pushing into array
    this.books.push(newBook);
    this.saveToLocalStorage(this.books);
    this.books = [];
  }// removing book with filter function
  removeBook(bookId) {
    const filterBooks = this.getExistingBooks().filter(
      (existingBook) => existingBook.id !== bookId,
    );

    this.saveToLocalStorage(filterBooks);
    window.location.reload();
  }// showing the books in the web html
  displayBooks() {
    if (this.getExistingBooks()) {
      this.getExistingBooks().forEach((book) => {
        const textHtml = `
        <div class="book">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <button class="remove-btn" data-id=${book.id}>Remove</button>
        <hr class="bottom-border" />
        </div>`;

        this.bookShelf.insertAdjacentHTML('afterbegin', textHtml);
      });
    }
  }
}

const book = new Book();

book.displayBooks();// checking if the values are empty
form.addEventListener('submit', (e) => {
  if (titleInput.value !== '' && authorInput.value !== '') {
    const book = new Book(titleInput.value, authorInput.value);
    book.addBooks();
    titleInput.value = '';
    authorInput.value = '';
  } else {
    e.preventDefault();
    alert('You need to provide valid input for book title and author.');
  }
});// traverse through the remove buttons and add onclick event listeners
Array.from(document.querySelectorAll('.remove-btn')).forEach((btn) => btn.addEventListener('click', () => {
  book.removeBook(btn.dataset.id);
}));
