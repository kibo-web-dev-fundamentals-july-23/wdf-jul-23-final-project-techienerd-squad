document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display books from data.json
    function displayBooks(pageNumber) {
        fetch("data.json")
            .then((response) => response.json())
            .then((data) => {
                const booksPerPage = 6; // Number of books per page
                const startIndex = (pageNumber - 1) * booksPerPage;
                const endIndex = startIndex + booksPerPage;
                const bookList = document.getElementById("book-list");

                // Clear previous book entries
                bookList.innerHTML = "";

                for (let i = startIndex; i < endIndex && i < data.length; i++) {
                    const book = data[i];
                    const listItem = document.createElement("li");
                    const bookLink = document.createElement("a");
                    bookLink.href = book.link; // Link to the book
                    bookLink.target = "_blank"; // Open in a new tab
                    const img = document.createElement("img");
                    img.src = book.coverImage;
                    img.alt = `Cover image of ${book.title} by ${book.author}`;
                    bookLink.appendChild(img);

                    // Create book information container
                    const bookInfo = document.createElement("div");
                    bookInfo.classList.add("book-info");
                    bookInfo.style.display = "none"; // Initially hidden

                    // Author and Title
                    const authorTitle = document.createElement("div");
                    authorTitle.classList.add("author-title");
                    authorTitle.innerHTML = `<strong>${book.title}</strong> by ${book.author}`;
                    bookInfo.appendChild(authorTitle);

                    // Preview of the first chapter (about 100 words)
                    const preview = document.createElement("p");
                    preview.textContent =
                        book.firstChapterPreview.substring(0, 100) + "...";

                    // Create "Read Now" button
                    const readNowButton = document.createElement("button");
                    readNowButton.textContent = "Read Now";
                    readNowButton.classList.add("btn", "btn-primary", "btn-sm", "mr-2");
                    readNowButton.addEventListener("click", () => {
                        // Load and display the PDF using PDF.js
                        displayPDF(book.link);
                    });

                    // Create "Download" button
                    const downloadButton = document.createElement("a");
                    downloadButton.href = book.link; // Link to download the book
                    downloadButton.download = `${book.title}.pdf`; // Specify the download filename
                    downloadButton.textContent = "Download";
                    downloadButton.classList.add("btn", "btn-secondary", "btn-sm");

                    // Append buttons, book information, and preview to the list item
                    listItem.appendChild(bookLink);
                    bookInfo.appendChild(preview);
                    listItem.appendChild(bookInfo);
                    listItem.appendChild(readNowButton);
                    listItem.appendChild(downloadButton);
                    bookList.appendChild(listItem);

                    // Event listener for hover
                    listItem.addEventListener("mouseenter", () => {
                        bookInfo.style.display = "block"; // Show the book info on hover
                    });

                    listItem.addEventListener("mouseleave", () => {
                        bookInfo.style.display = "none"; // Hide the book info on mouse leave
                    });
                }

                // Add pagination controls
                const totalPages = Math.ceil(data.length / booksPerPage);
                const pagination = document.getElementById("pagination");
                pagination.innerHTML = "";

                for (let i = 1; i <= totalPages; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.href = "#";
                    pageLink.textContent = i;
                    pageLink.addEventListener("click", () => displayBooks(i));
                    pagination.appendChild(pageLink);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    // Function to display PDF using PDF.js
    function displayPDF(pdfLink) {
        // Initialize PDF.js
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";

        // Fetch and display the PDF
        const loadingTask = pdfjsLib.getDocument(pdfLink);

        loadingTask.promise
            .then(function (pdf) {
                // Fetch the first page
                return pdf.getPage(1);
            })
            .then(function (page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF.js
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Append the canvas to the page
                document.body.appendChild(canvas);

                // Render the page content on the canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                page.render(renderContext);
            })
            .catch(function (reason) {
                console.error("Error loading PDF: " + reason);
            });
    }

    // Initial load of books on page load (e.g., page 1)
    displayBooks(1);
});
