const form = document.querySelector('.form');
const titleInput = document.querySelector('#input-title');
const authorInput = document.querySelector('#input-author');
class Book {
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
    this.books = [];
    this.bookShelf = document.querySelector('.books-container');
  }

  generateRandomId = () => Math.random().toString(20).substr(2, 20);

  getExistingBooks = () => JSON.parse(localStorage.getItem('books'));

  saveToLocalStorage = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };

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
    }
    this.books.push(newBook);
    this.saveToLocalStorage(this.books);
    // this.books = [];
  }

  removeBook(bookId) {
    const filterBooks = this.getExistingBooks().filter(
      (existingBook) => existingBook.id !== bookId,
    );

    this.saveToLocalStorage(filterBooks);
    window.location.reload();
  }

  displayBooks() {
    this.bookShelf.innerHTML = '';
    if (this.getExistingBooks()) {
      this.getExistingBooks().forEach((book, index) => {
        const textHtml = `
        <div class="book ${index % 2 === 0 ? 'silver-books' : ''}">
          <p class="book-title">${book.title}</p><span>by</span>
          <p class="book-author">${book.author}</p>
          <button class="remove-btn" data-id=${book.id}>Remove</button>
        </div>`;

        this.bookShelf.insertAdjacentHTML('afterbegin', textHtml);
      });
    }
  }
}

const book = new Book();

book.displayBooks();

form.addEventListener('submit', (e) => {
  if (titleInput.value !== '' && authorInput.value !== '') {
    const book = new Book(titleInput.value, authorInput.value);
    book.addBooks();
    titleInput.value = '';
    authorInput.value = '';
  } else {
    e.preventDefault();
  }
});

// traverse through the remove buttons and add onclick event listeners
Array.from(document.querySelectorAll('.remove-btn')).forEach((btn) => btn.addEventListener('click', () => {
  book.removeBook(btn.dataset.id);
}));