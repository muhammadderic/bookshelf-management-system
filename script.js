// ===== VARIABLES =====
const my_bookshelf_storage = "BOOKSHELF_STORAGE"

// ===== ADD EVENTS =====
const inputErrorTitle = document.getElementById("input_error_title")
const inputErrorAuthor = document.getElementById("input_error_author")
const inputErrorYear = document.getElementById("input_error_year")

const inputBookTitle = document.getElementById("input_book_title")
const inputBookAuthor = document.getElementById("input_book_author")
const inputBookYear = document.getElementById("input_book_year")
const inputIsCompleted = document.getElementById("is_completed")
const addButton = document.getElementById("add_button")

const readingBooks = document.getElementById("reading-books")
const finishedBooks = document.getElementById("finished-books")

const addBookTitle = document.getElementById("add-book-title")

const inputSearch = document.getElementById("input-search")
const searchButton = document.getElementById("search-button")
const searchResult = document.getElementById("search-result")

// Get data onload
window.addEventListener("load", function () {
  showData()
})

// Create data
addButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (addButton.value) {
    const id = parseInt(addButton.value)
    const newBook = {
      id: id,
      title: inputBookTitle.value,
      author: inputBookAuthor.value,
      year: inputBookYear.value,
      isCompleted: inputIsCompleted.checked,
    }

    let bookList = getData().filter(book => book.id !== id)
    bookList.unshift(newBook)
    localStorage.setItem(my_bookshelf_storage, JSON.stringify(bookList))

    inputBookTitle.value = ""
    inputBookAuthor.value = ""
    inputBookYear.value = ""
    inputIsCompleted.checked = false
    location.reload()
  } else {
    let inputCheckValue = true;

    inputErrorTitle.classList.add("display_error")
    inputErrorAuthor.classList.add("display_error")
    inputErrorYear.classList.add("display_error")

    if (inputBookTitle.value === "") {
      inputErrorTitle.classList.remove("display_error")
      inputCheckValue = false
    }
    if (inputBookAuthor.value === "") {
      inputErrorAuthor.classList.remove("display_error")
      inputCheckValue = false
    }
    if (inputBookYear.value === "") {
      inputErrorYear.classList.remove("display_error")
      inputCheckValue = false
    }

    if (inputCheckValue) {
      const newBook = {
        id: +new Date(),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
        year: inputBookYear.value,
        isCompleted: inputIsCompleted.checked,
      }

      createBook(newBook)
      inputBookTitle.value = ""
      inputBookAuthor.value = ""
      inputBookYear.value = ""
      inputIsCompleted.checked = false
      location.reload()
    }
  }
})

// get data from local storage
function getData() {
  return JSON.parse(localStorage.getItem(my_bookshelf_storage)) || []
}

// Create book and store in local storage
function createBook(book) {
  let bookList = getData()
  bookList.unshift(book)
  localStorage.setItem(my_bookshelf_storage, JSON.stringify(bookList))
}

// Show data from local storage
function showData() {
  const bookList = getData()
  readingBooks.innerHTML = ""
  finishedBooks.innerHTML = ""

  bookList.forEach(book => {
    if (book.isCompleted) {
      let ele = `
        <div class="d-grid card space-between">
          <div class="card__status card__status--finished"></div>
          <div class="card__detail">
            <p class="card__title">${book.title}</p>
            <p class="card__author">${book.author}</p>
            <p class="card__year">${book.year}</p>
          </div>
          <div class="card__manager d-flex jc-end">
            <span 
              title="read again" 
              class="icon material-symbols-outlined"
              onclick="changeBookStatus(${book.id}, 'You want to read this book again?')"
            >
              change_circle
            </span>
            <span 
              title="edit" 
              class="icon material-symbols-outlined"
              onclick="updateBook(${book.id})"
            >
              edit_note
            </span>
            <span 
              title="delete" 
              class="icon icon-delete material-symbols-outlined"
              onclick="deleteBook(${book.id})"
            >
              delete_forever
            </span>
          </div>
        </div>
      `
      finishedBooks.innerHTML += ele
    } else {
      let ele = `
        <div class="d-grid card space-between">
          <div class="card__status card__status--reading"></div>
          <div class="card__detail">
            <p class="card__title">${book.title}</p>
            <p class="card__author">${book.author}</p>
            <p class="card__year">${book.year}</p>
          </div>
          <div class="card__manager d-flex jc-end">
            <span 
              title="finished" 
              class="icon material-symbols-outlined"
              onclick="changeBookStatus(${book.id}, 'Are you finish this book?')"
            >
              check_box
            </span>
            <span 
              title="edit" 
              class="icon material-symbols-outlined"
              onclick="updateBook(${book.id})"
            >
              edit_note
            </span>
            <span 
              title="delete" 
              class="icon icon-delete material-symbols-outlined"
              onclick="deleteBook(${book.id})"
            >
              delete_forever
            </span>
          </div>
        </div>
      `
      readingBooks.innerHTML += ele
    }
  })
}

// Update book
function updateBook(id) {
  let updatedBook = getData().filter(book => book.id === id)[0]
  console.log(updatedBook)

  addBookTitle.innerHTML = "Edit Book"
  addButton.innerHTML = "Edit"

  addButton.value = updatedBook.id
  inputBookTitle.value = updatedBook.title
  inputBookAuthor.value = updatedBook.author
  inputBookYear.value = updatedBook.year
  updatedBook.isCompleted ? inputIsCompleted.checked = true : inputIsCompleted.checked = false
}

// Delete book
function deleteBook(id) {
  const confirmation = confirm("You want delete this book?")
  if (confirmation) {
    let bookList = getData().filter(book => book.id !== id)
    localStorage.setItem(my_bookshelf_storage, JSON.stringify(bookList))
    location.reload()
  }
}

// Change book status
function changeBookStatus(id, text) {
  const confirmation = confirm(text)
  if (confirmation) {
    let changedBook = getData().filter(book => book.id === id)[0]

    const newBook = {
      ...changedBook,
      isCompleted: !changedBook.isCompleted,
    }

    let bookList = getData().filter(book => book.id !== id)
    bookList.unshift(newBook)
    localStorage.setItem(my_bookshelf_storage, JSON.stringify(bookList))
    location.reload()
  }
}

// Search input title
searchButton.addEventListener("click", function (e) {
  e.preventDefault()
  searchResult.innerHTML = ""
  let searchCheck = true

  let bookList = getData()
  bookList.forEach(book => {
    if (book.title.toLowerCase() === inputSearch.value.toLowerCase()) {
      let ele = `
        <div class="d-grid card space-between">
          <div class="card__status card__status--reading"></div>
          <div class="card__detail">
            <p class="card__title">${book.title}</p>
            <p class="card__author">${book.author}</p>
            <p class="card__year">${book.year}</p>
          </div>
          <div class="card__status-text d-flex jc-center ai-center">
            <p class="status-book ${book.isCompleted ? 'status-finished' : 'status-reading'}">${book.isCompleted ? "Finished" : "Reading"}</p>
          </div>
        </div>
      `
      searchResult.innerHTML += ele
      searchCheck = false
    }
  })
  if (searchCheck) {
    searchResult.innerHTML = "not found"
  }
})