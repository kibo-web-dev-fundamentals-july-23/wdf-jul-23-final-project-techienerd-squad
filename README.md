# TechieNerd Library Website

![TechieNerd Logo](image/germany.jpg)

This is the main repository for the TechieNerd library website. The website is designed to allow users to browse books by genre. This README provides an overview of the project structure, styles, and JavaScript code used to create the website.

## Project Structure

### Files
- `index.html`: The main HTML file for the TechieNerd library website, containing the code for the header, introduction, main content, and footer sections of the website.
- `style.css`: Contains the CSS styles for the website.
- `script.js`: Contains the JavaScript code for the website.
- `image/tnslogo.jpg`: The logo for the TechieNerd library.
- `svgs/bx-left-arrow-alt.svg`: An SVG icon for the left arrow.
- `svgs/bx-right-arrow-alt.svg`: An SVG icon for the right arrow.

### General Styles
- The `:root` pseudo-element sets default colors for the website.
- The `*, *::before, *::after` rules remove default margins, padding, and fonts from all elements.
- The `html` and `body` rules set the default font size and line height.
- The `a:not()` rule ensures that links are underlined in browsers that don't support the `-moz-appearance` property.
- The `image`, `picture`, and `svg` rules ensure that images are displayed at their full size.
- The `@media (prefers-reduced-motion: reduce)` rule reduces animation speed and duration for browsers with reduced motion settings.

### Font Styles
- The `body` rule sets the default font family and color for the website.
- The `h1`, `h2`, `h3`, `h4`, `h5`, `h6` rules set the font family and weight for the headings.

### Header and Top Navbar Styles
- The `header` rule sets the background image and color for the header.
- The `.stick` class makes the navbar stick to the top of the screen when the user scrolls down.
- The `.navbar` rule sets the overall style for the navbar, including padding, display, and alignment.
- The `.navbar__brand`, `.navbar__menu` rules set the style for the logo and menu items in the navbar.
- The `.navbar__link` rule sets the style for the links in the navbar, including text color, font weight, and text decoration.

### Introduction Section Styles
- The `.introduction` rule sets the background color, padding, and display for the introduction section.
- The `.introduction__title` rule sets the style for the title of the introduction section.
- The `.introduction__text` rule sets the style for the text content of the introduction section.

### Genres Section Styles
- The `.genre__controls` rule sets the style for the controls that allow users to browse the genres.
- The `.section__title` rule sets the style for the title of the genres section.
- The `.btn-container` rule sets the style for the container that holds the genre buttons.
- The `.g-btn` rule sets the style for the genre buttons, including the background color, border, and text color.

### Book Listings Section Styles
- The `#collections` rule sets the style for the book listings section.
- The `.books-container` rule sets the padding and display for the container that holds the book listings.
- The `.book` rule sets the style for each book listing, including the background color, border radius, padding, and cursor.
- The `.book__cover` rule sets the style for the book cover image.
- The `.book__title` rule sets the style for the book title.

### About Section Styles
- The `.about` rule sets the background color and padding for the about section.
- The `.section__title` rule sets the style for the title of the about section.
- The `.about__content` rule sets the style for the text content of the about section.

### Footer Styles
- The `.footer` rule sets the background color, color, padding, and text alignment for the footer.
- The `.footer__title` rule sets the style for the title of the footer.
- The `.footer__list` rule sets the style for the list of links in the footer.
- The `.footer__list li` rule sets the style for each link in the footer list.
- The `.footer__text` rule sets the style for the copyright text in the footer.

## JavaScript Functionality

The JavaScript code provided in this repository does the following:

- Fetches a JSON file that contains a list of books and their genres.
- Creates a button for each genre in the JSON file.
- When a user clicks on a button, the code sets the active genre and displays the books for that genre.
- Creates a modal that displays the details of a book when the user clicks on the book's cover image.

## Suggestions for Improvement

Feel free to explore the code and contribute to the TechieNerd library website project. If you have any questions or suggestions, please don't hesitate to reach out to us!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
