"use strict";

const BOOKS_API_URL = "https://openlibrary.org/search.json";

$(function () {
  const $searchForm = $("#book-search-form");
  const $queryInput = $("#book-query");
  const $loadButton = $("#load-books");
  const $buttonLabel = $("#button-label");
  const $bookList = $("#book-list");
  const $bookCount = $("#book-count");
  const $requestStatus = $("#request-status");
  const $emptyState = $("#empty-state");
  const $errorState = $("#error-state");
  const $errorMessage = $("#error-message");

  function showError(message) {
    $bookList.empty();
    $bookCount.text("—");
    $emptyState.prop("hidden", true);
    $errorMessage.text(message);
    $errorState.prop("hidden", false);
    $requestStatus.text("The request could not be completed.");
  }

  function parseBooks(data) {
    if (!data || !Array.isArray(data.docs)) {
      throw new Error("Open Library returned JSON in an unexpected format.");
    }

    return data.docs
      .filter((book) => book && typeof book.title === "string" && book.title.trim())
      .map((book) => ({
        title: book.title.trim(),
        author: Array.isArray(book.author_name) && book.author_name.length
          ? book.author_name.join(", ")
          : "Unknown author",
        genre: Array.isArray(book.subject) ? book.subject[0] : "",
        year: Number.isInteger(book.first_publish_year) ? book.first_publish_year : null,
        coverId: Number.isInteger(book.cover_i) ? book.cover_i : null
      }));
  }

  function renderBooks(books) {
    $bookList.empty();
    $bookCount.text(books.length);
    $emptyState.prop("hidden", books.length > 0);
    $emptyState.find("p").text(books.length
      ? "Your next favorite is one click away."
      : "Try another title or author to discover a book.");

    books.forEach((book, index) => {
      const $card = $("<article>", {
        class: "book-card",
        "aria-label": `${book.title} by ${book.author}`
      });
      const $cover = book.coverId
        ? $("<img>", {
            class: `book-cover book-cover-image tone-${index % 6}`,
            src: `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`,
            alt: `Cover of ${book.title}`,
            loading: "lazy"
          }).on("error", function () {
            $(this).replaceWith(
              $("<span>", {
                class: `book-cover tone-${index % 6}`,
                "aria-hidden": "true"
              }).text(book.title.charAt(0).toLocaleUpperCase())
            );
          })
        : $("<span>", {
            class: `book-cover tone-${index % 6}`,
            "aria-hidden": "true"
          }).text(book.title.charAt(0).toLocaleUpperCase());
      const $info = $("<div>", { class: "book-info" });
      const $title = $("<h3>", { class: "book-title" }).text(book.title);
      const publication = book.year ? ` · ${book.year}` : "";
      const $author = $("<p>", { class: "book-author" }).text(`by ${book.author}${publication}`);

      $info.append($title, $author);
      if (book.genre) {
        $info.append($("<span>", { class: "book-genre" }).text(book.genre));
      }

      $card.append($cover, $info);
      $bookList.append($card);
    });

    $errorState.prop("hidden", true);
    const query = $queryInput.val().trim() || "fiction";
    $requestStatus.text(books.length
      ? `Found ${books.length} ${books.length === 1 ? "book" : "books"} matching “${query}” in Open Library.`
      : `No books matched “${query}”. Try another title or author.`);
  }

  $searchForm.on("submit", function (event) {
    event.preventDefault();
    $loadButton.prop("disabled", true);
    $buttonLabel.text("Loading…");
    $requestStatus.text("Searching the Open Library catalogue…");
    $errorState.prop("hidden", true);
    $emptyState.prop("hidden", true);
    $bookList.empty();

    $.ajax({
      url: BOOKS_API_URL,
      method: "GET",
      dataType: "json",
      data: {
        q: $queryInput.val().trim() || "subject:fiction",
        limit: 6,
        fields: "title,author_name,first_publish_year,cover_i,subject"
      },
      headers: { Accept: "application/json" },
      cache: false
    })
      .done(function (data) {
        let books;
        try {
          books = parseBooks(data);
        } catch (error) {
          showError(error.message);
          console.error("Unexpected books response:", data);
          return;
        }
        renderBooks(books);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        const detail = errorThrown || textStatus || `HTTP ${jqXHR.status}`;
        showError(`The request failed (${detail}). Check the endpoint and make sure the page is served over HTTP.`);
        console.error("Book request failed:", textStatus, errorThrown);
      })
      .always(function () {
        $loadButton.prop("disabled", false);
        $buttonLabel.text("Search books");
      });
  });
});
