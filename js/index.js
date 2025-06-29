const bookmarkNameInput = document.getElementById("bookmarkName");
const siteURLInput = document.getElementById("WibsiteName");
const tableContent = document.getElementById("showTableDetails");

// Bootstrap modal instance
const validationModal = new bootstrap.Modal(document.getElementById("validationModal"));

// Load bookmarks or start empty
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
renderBookmarks();

// Add new bookmark
function addBookmark() {
  const name = bookmarkNameInput.value.trim();
  const url = siteURLInput.value.trim();

  const isNameValid = validateName(name);
  const isURLValid = validateURL(url);

  // Show modal if either is invalid
  if (!isNameValid || !isURLValid) {
    validationModal.show();
    return;
  }

  // Create and save bookmark
  bookmarks.push({ name, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Render table and clear form
  renderBookmarks();
  clearForm();
}

// Validate name length
function validateName(name) {
  return name.length >= 3;
}

// Validate URL format
function validateURL(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +                            // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain
    '((\\d{1,3}\\.){3}\\d{1,3}))' +                  // OR IP
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +              // port/path
    '(\\?[;&a-z\\d%_.~+=-]*)?' +                     // query string
    '(\\#[-a-z\\d_]*)?$','i'                         // fragment
  );
  return pattern.test(url);
}

// Remove a bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
}

// Display all bookmarks
function renderBookmarks() {
  tableContent.innerHTML = bookmarks.map((bookmark, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.url}" class="btn btn-success" target="_blank">
          <i class="fa-solid fa-eye"></i> Visit
        </a>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteBookmark(${index})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>
  `).join('');
}

// Clear form fields
function clearForm() {
  bookmarkNameInput.value = '';
  siteURLInput.value = '';
}
