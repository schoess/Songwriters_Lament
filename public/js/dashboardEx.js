// to make this work in handlebars, we use a function
//
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  // DATA
  // Saving user data to an array for retrival of users songs in the DB.
  const userData = [];
  // variable that will keep track of which updated song (by id) the user selected.
  let idUpdate;

  // Requests
  // ==============================
  // GET request
  const getLyrics = () => {
    // we need the artist's id.
    const id = userData[0].id;

    // turn it into a string to be sent in the url.
    return $.ajax({
      url: "/api/lyrics/" + id.toString(),
      method: "GET"
    });
  };
  // USER GET request
  const getUserData = () => {
    return $.ajax({
      url: "/api/user_data",
      method: "GET"
    });
  };

  // PUT request
  const updateLyrics = (id, data) => {
    return $.ajax({
      url: "/api/lyrics/" + id.toString(),
      method: "PUT",
      data: data
    });
  };

  // DELETE request
  const deleteLyrics = id => {
    return $.ajax({
      url: "/api/lyrics/" + id.toString(),
      method: "DELETE"
    });
  };

  // FUNCTIONS
  // ============================
  // Creates the HTML elements for the lyrics.
  const renderLyricList = lyrics => {
    const lyricsBody = $("#lyricsBody");

    // empty the div column.
    lyricsBody.empty();

    // forEach to go through making the Card elements.
    lyrics.forEach(lyric => {
      const divColSm = $("<div class='col-sm-3'>");
      const divCardBg = $("<div class='card bg-secondary'>");
      const divCardBody = $("<div class='card-body'>");
      // Song Title, Genre, and Lyrics to place text in.
      const divCardSongTitle = $("<h5 class='card-title'>");
      const divCardGenre = $("<h6 class='card-subtitle'>");
      const divCardLyrics = $("<p class='card-text'>");
      const divCardInsp = $("<p class='card-text'>");
      const divCardNotes = $("<p class='card-text'>");
      const deleteIcon = $("<i class='fas fa-trash'>");

      // appending text to their respective places.
      divCardSongTitle.text(lyric.title);
      divCardGenre.text(lyric.genre);
      divCardLyrics.text(lyric.lyrics);
      divCardInsp.text(lyric.inspiration);
      divCardNotes.text(lyric.notes);
      // adding id to the div column.
      divCardBg.attr("data-value", lyric.id);

      // append in order, then append to the row where our lyrics boxes will  be displayed "#lyricsBody".
      divCardBody.append(deleteIcon);
      divCardBody.append(divCardSongTitle);
      divCardBody.append(divCardGenre);
      divCardBody.append(divCardLyrics);
      divCardBody.append(divCardInsp);
      divCardBody.append(divCardNotes);

      divCardBg.append(divCardBody);
      divColSm.append(divCardBg);
      $("#lyricsBody").append(divColSm);
      // handling click event (update).
      handleCardClick(lyric, divCardBg);
      // handling click event (delete).
      handleDeleteClick(lyric, deleteIcon);
    });
  };

  // Clear fields the text fields (depending on which one is used)
  const clearForm = selector => {
    selector
      .children()
      .children(".songTitle")
      .val("");
    selector
      .children()
      .children(".genre")
      .val("");
    selector
      .children()
      .children("#lyric-input")
      .val("");
    selector
      .children()
      .children("#inspiration-input")
      .val("");
    selector
      .children()
      .children("#notes-input")
      .val("");
  };
  // Get the values from our text boxes.
  const createLyricObj = selector => {
    // getting the lyrics and putting them in variable.
    const songTitle = selector
      .children()
      .children(".songTitle")
      .val()
      .trim();
    const genreText = selector
      .children()
      .children(".genre")
      .val()
      .trim();
    const lyricsText = selector
      .children()
      .children("#lyric-input")
      .val()
      .trim();
    const inspirationText = selector
      .children()
      .children("#inspiration-input")
      .val()
      .trim();
    const noteText = selector
      .children()
      .children("#notes-input")
      .val()
      .trim();

    // store it in an object and return it
    songObj = {
      title: songTitle,
      genre: genreText,
      lyrics: lyricsText,
      inspiration: inspirationText,
      notes: noteText,
      ArtistId: userData[0].id
    };
    return songObj;
  };

  // the function to render lyrics
  const getAndRenderLyrics = () => {
    return getLyrics().then(renderLyricList);
  };

  // ==============================
  // Event listeners
  //
  // CREATING NEW LYRICS
  $("#newLyric").submit(event => {
    event.preventDefault();
    // Storing it to the database
    //
    // First, storing it to an object
    const dataSong = createLyricObj($("#newLyric"));

    // make POST request
    $.post("/api/lyrics", dataSong)
      .then(() => {
        console.log("success!");
        // reset the input values
        clearForm($("#newLyric"));
        // render cards (lyrics)
        getAndRenderLyrics();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // UPDATING lyrics
  $("#updateLyric").submit(event => {
    event.preventDefault();
    // Storing it to the database
    //
    // First, storing it to an object
    const dataSong = createLyricObj($("#updateLyric"));

    // make PUT request
    updateLyrics(idUpdate, dataSong)
      .then(() => {
        console.log("success!");
        // reset the input values
        clearForm($("#updateLyric"));
        // After updating,
        // shows the create form and hides the update form
        $(".newLyrics").removeClass("d-none");
        $(".updateLyric").addClass("d-none");
        // render cards (lyrics)
        getAndRenderLyrics();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // DELETE lyrics
  function handleDeleteClick(lyric, selector) {
    selector.on("click", e => {
      e.preventDefault();
      console.log("deleting works");
      deleteLyrics(lyric.id)
        .then(() => {
          console.log("success!");
          // Because selecting the Delete button also clicks the card (thereby causing an update), we need to reset it to normal.
          // reset the input values
          clearForm($("#updateLyric"));
          // After deleting,
          // reverts the create form and update form
          $(".newLyrics").removeClass("d-none");
          $(".updateLyric").addClass("d-none");
          // render cards (lyrics)
          getAndRenderLyrics();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // create click events when putting elements to the DOM
  // click event for updating!
  function handleCardClick(lyric, selector) {
    selector.on("click", e => {
      e.preventDefault();
      console.log(lyric);
      // hides the create form and shows the update form
      $(".newLyrics").addClass("d-none");
      $(".updateLyric").removeClass("d-none");

      // getting the values to edit and update
      $(".updateLyric")
        .children()
        .children(".songTitle")
        .val(lyric.title);
      $(".updateLyric")
        .children()
        .children(".genre")
        .val(lyric.genre);
      $(".updateLyric")
        .children()
        .children("#lyric-input")
        .val(lyric.lyrics);
      $(".updateLyric")
        .children()
        .children("#inspiration-input")
        .val(lyric.inspiration);
      $(".updateLyric")
        .children()
        .children("#notes-input")
        .val(lyric.notes);
      // using our data id (idUpdate) to know which song was selected
      idUpdate = lyric.id;
    });
  }

  // after everything is initialized, get user_data then use it to get the artists song lyrics
  getUserData().then(result => {
    userData.push(result);
    getAndRenderLyrics();
  });
  // ^^ this fucking line.... this fucking line made me waste 4hrs of my life...
});
