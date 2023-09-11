const header = document.querySelector(".navbar");
const btnContainer = document.querySelector(".btn-container");
const btn = document.querySelector(".g-btn");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const bookTemplate = document
  .getElementsByTagName("template")[0]
  .content.querySelector("article");
const booksContainer = document.querySelector(".books-container");
let year = new Date();
const footer__year = document.querySelector(".footer__year");
footer__year.innerText = year.getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  // control the genres container movement

  left.addEventListener("click", () => {
    btnContainer.scrollLeft -= 50;
  });

  right.addEventListener("click", () => {
    btnContainer.scrollLeft += 50;
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      btnContainer.scrollLeft += 50;
    } else if (e.key === "ArrowLeft") {
      btnContainer.scrollLeft -= 50;
    }
  });

  window.addEventListener("scroll", () => {
    window.scrollY > 0
      ? header.classList.add("stick")
      : header.classList.remove("stick");
  });
  let genres = [];

  fetch("./data.json")
    .then((data) => data.json())
    .then((modified_data) => {
      let database = modified_data.results;
      database.forEach((book) => {
        let raw_genre = book.genres;
        if (Array.isArray(raw_genre)) {
          raw_genre.forEach((genre) => {
            if (!genres.includes(genre)) {
              genres.push(genre);
            }
          });
        }
      });

      // create button for all genre
      genres.forEach((genre) => {
        let newbtn = btn.cloneNode();
        newbtn.innerText = genre;
        btnContainer.append(newbtn);
      });

      const allBtn = document.querySelectorAll(".g-btn");
      function setActive(clickedBtn) {
        allBtn.forEach((element) => {
          if (element.innerText === clickedBtn) {
            element.classList.add("active-btn");
          } else {
            element.classList.remove("active-btn");
          }
        });
      }
      function setHeading(local) {
        const activeHeading = document.querySelector(".bl__title");
        activeHeading.innerText = local;
      }
      function setDisplay(genre) {
        let books = document.querySelectorAll(".book");

        books.forEach((book) => {
          let bookGenre = book.getAttribute("data-genre");
          if (genre === "All" || bookGenre.includes(genre)) {
            book.style.display = "block";
          } else {
            book.style.display = "none";
          }
        });
      }

      allBtn.forEach((button) => {
        button.addEventListener("click", () => {
          active = button.innerText;
          localStorage.setItem("genre", active);
          setActive(active);
          setHeading(active);
          setDisplay(active);
        });
      });

      database.forEach((book) => {
        let newBook = document.importNode(bookTemplate, true);
        let bookTitle = book.title;
        let coverImage = book.coverImg;
        let bookGenres = book.genres;

        newBook.querySelector("h3").innerText = bookTitle;
        newBook.querySelector("img").src = coverImage;
        newBook.setAttribute("data-genre", bookGenres.join(", "));

        // Add click event to display book details
        newBook.querySelector("img").addEventListener("click", () => {
          displayBookDetails(book);
        });

        booksContainer.append(newBook);
      });

      let local = localStorage.getItem("genre") || "All";
      setActive(local);
      setHeading(local);
      setDisplay(local);
    });

  // display the book details
  function displayBookDetails(bookData) {
    const modal = document.createElement("div");
    modal.classList.add("book-details-modal");

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${bookData.author}`;

    const titleElement = document.createElement("p");
    titleElement.textContent = `Title: ${bookData.title}`;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${bookData.description}`;

    modal.appendChild(authorElement);
    modal.appendChild(titleElement);
    modal.appendChild(descriptionElement);

    document.body.appendChild(modal);

    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.style.display = "block";
  }
});
