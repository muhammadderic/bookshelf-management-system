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

// Get data onload
window.addEventListener("load", function () {
  showData()
})

// Create data
addButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (addButton.value) {
    console.log(addButton.value)
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