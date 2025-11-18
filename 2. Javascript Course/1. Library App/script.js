const myLibrary = [];

/* HTML Elements */
const bookDialog = document.getElementById('bookDialog');
const showDialogButton = document.getElementById('showDialogButton');
const closeDialogButton = document.getElementById('closeDialogButton');
const newBookForm = document.getElementById('newBookForm');
const libraryContainer = document.getElementById('libraryContainer');

/* Dialog Buttons */
showDialogButton.addEventListener('click', () => {
    bookDialog.showModal();
});

closeDialogButton.addEventListener('click', () => {
    bookDialog.close();
});

/* Book */
function Book(title, author, category, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.category = category;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

/* Add or Remove books from library */
function addBookToLibrary(title, author, category, pages, read) {
    const newBook = new Book(title, author, category, pages, read);
    myLibrary.push(newBook);
}


function removeBook(bookId) {
    myLibrary.splice(myLibrary.findIndex(book => book.id === bookId), 1);
    render(); 
}

/* Set read status */
function toggleRead(bookId) {
    const book = myLibrary.find(b => b.id === bookId);
    if (book) book.toggleReadStatus();
    render(); 
}

/* Display book cards */
function render() {
    libraryContainer.innerHTML = ''; 

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.bookId = book.id; 

        bookCard.innerHTML = `
            <div class="card-info">
                <p class="card-title">${book.title}</p>
                <p class="card-author">from ${book.author}</p>
                <p>Category: ${book.category}</p>
                <p>${book.pages} pages</p>
            </div>
            <div class="card-buttons">
                <button 
                    class="read-btn" 
                    style="background-color: ${book.read ? '#17a2b8' : '#ffc107'};"
                >
                    ${book.read ? 'Read' : 'Unread'}
                </button>
                
                <button class="remove-btn">
                    Remove
                </button>
            </div>
        `;
        
        const removeBtn = bookCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeBook(book.id);
        });

        const toggleReadBtn = bookCard.querySelector('.read-btn');
        toggleReadBtn.addEventListener('click', () => {
            toggleRead(book.id);
        });

        libraryContainer.appendChild(bookCard);
    });
}

/* Add new book event (after click button) */
newBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(newBookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const category = formData.get('category');
    const pages = Number(formData.get('pages'));
    const read = formData.has('read'); 

    addBookToLibrary(title, author, category, pages, read);
    render();

    newBookForm.reset();
    bookDialog.close();
});

/* Display examples of book cards */
addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", "Adventure", 1178, false);
addBookToLibrary("1984", "George Orwell", "Dystopian", 328, true);

render();