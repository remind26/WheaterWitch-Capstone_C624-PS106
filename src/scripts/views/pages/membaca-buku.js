/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */

const RekomenBuku = {
  async render() {
    return `
    <div class="hero" id="hero">
      <img src="./images/heros/hero-image_2.jpg" alt="Hero Image">
      <div class="hero-text" tabindex="0">
        <h1>Welcome to Book Recommendations</h1>
        <p>Discover your next favorite book here!</p>
      </div>
    </div>
    <div class="book-recommendations">
      <h2>Book Recommendations</h2>
      <div class="book-grid" id="book-list"></div>
    </div>
    `;
  },

  async afterRender() {
    const bookList = document.getElementById('book-list');
    try {
      const response = await fetch('https://openlibrary.org/subjects/literature.json?limit=30');
      const data = await response.json();
      const booksHtml = data.works.map((book) => `
        <div class="book-item">
          <div class="book-card">
            <h3>${book.title}</h3>
            <p>by ${book.authors.map((author) => author.name).join(', ')}</p>
            <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg" alt="${book.title} cover" />
            <p><a href="https://openlibrary.org${book.key}" target="_blank">More Info</a></p>
          </div>
        </div>
      `).join('');
      bookList.innerHTML = booksHtml;
    } catch (error) {
      bookList.innerHTML = '<p>Error fetching book recommendations. Please try again.</p>';
    }
  },
};

export default RekomenBuku;
