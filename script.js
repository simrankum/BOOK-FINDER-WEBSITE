// Define the API endpoint URL and API key
const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyArIes8imMz5szHdvsUzBmZn56BLW_aFAs';

// Render a book card using its data attributes
function renderBookCard(book) {
  const card = document.createElement('div');
  card.classList.add('book-card');
  card.dataset.id = book.id;
  card.dataset.title = book.volumeInfo.title;
  card.dataset.author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
  card.dataset.published = book.volumeInfo.publishedDate;
  const img = document.createElement('img');
  img.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192.png?text=No+image';
  img.alt = book.volumeInfo.title;
  card.appendChild(img);
  const details = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = book.volumeInfo.title;
  details.appendChild(title);
  const author = document.createElement('p');
  author.textContent = `Author(s): ${card.dataset.author}`;
  details.appendChild(author);
  const published = document.createElement('p');
  published.textContent = `Published: ${card.dataset.published}`;
  details.appendChild(published);
  const summary = document.createElement('p');
  summary.textContent = `Summary: ${book.volumeInfo.description}`;
  details.appendChild(summary); // Add the summary to the details section of the card

  // Add a "more" button to toggle the display of the book summary
  const moreButton = document.createElement('button');
moreButton.textContent = 'Summary';
let showDetails = false; // initialize flag to false

moreButton.addEventListener('click', () => {
  if (!showDetails) {
    // show full details
    const summary = document.createElement('p');
    summary.textContent = `Summary: ${book.volumeInfo.description}`;
    details.appendChild(summary);
    moreButton.textContent = 'Hide';
  } else {
    // hide full details
    details.removeChild(details.lastChild);
    moreButton.textContent = 'Summary';
  }
  showDetails = !showDetails; // toggle flag
});

details.appendChild(moreButton);
card.appendChild(details);

//download button
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download PDF';
downloadButton.addEventListener('click', async () => {
  const fileName = `${card.dataset.title} ${card.dataset.author} doctype:pdf`;
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(fileName)}&btnI=1`;
  window.open(searchUrl, '_blank');
});
  





    
details.appendChild(downloadButton);
card.appendChild(details);
return card;

}

// Query the API for matching books
async function searchBooks(query) {
  const response = await fetch(`${API_URL}?q=${query}&key=${API_KEY}`);
  const data = await response.json();
  return data.items;
}

// Listen for search form submissions
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchResults.textContent = 'Searching...';
  const query = searchInput.value;
  const books = await searchBooks(query);
  searchResults.innerHTML = '';
  if (books.length === 0) {
    searchResults.textContent = 'No results found.';
  } else {
    books.forEach((book) => {
      const card = renderBookCard(book);
      searchResults.appendChild(card);
    });
  }
});