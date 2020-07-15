// Adding event listeners for deleting, editing, and adding todos for later
// $(document).on("click", "button.delete", deleteSong);
// $(document).on("click", "button.complete", toggleComplete);
// $(document).on("click", ".todo-item", editSong);
// $(document).on("keyup", ".todo-item", finishEdit);
// $(document).on("blur", ".todo-item", cancelEdit);
// $(document).on("submit", "#todo-form", insertSong);

// const $songsContainer = $(".songs-container");

// function initSongs() {
//   $songsContainer.empty();
//   // create body goes here
//   //for each song.
// }

// function createBody(song){
//   const $newBody = $(
//     [
//       "<h5 class='card-title'>"
//     ]
//   )
// }

$(() => {
  // // CREATE input elements for the page.
  // const createInputLyrics = () => {
  //   const formClass = $("<form class='newLyrics' id='newLyric'>");
  //   const formGroup = $("<div class='form-group'>");
  //   const labelName = $("<label for='username'>");
  //   const inputSongTitle = $('<input class="songTitle" type="text" placeholder="Song Title">');
  //   const inputGenre = $('<input class="genre" type="text" placeholder="Genre">');
  //   const textareaLyrics = $('<textarea type="lyric" class="form-control" id="lyric-input" placeholder="Lyrics..." rows="8">');
  //   const textareaInspiration = $('<textarea type="inspiration" class="form-control" id="inspiration-input" placeholder="Inspirations..." rows="2">');
  //   const textareaNotes = $('<textarea type="notes" class="form-control" id="notes-input" placeholder="Notes..." rows="4">');
  //   const submitBtn = $('<button type="submit" class="btn btn-danger newLyrics">');

  //   // labeling
  //   labelName.text("Create Song");
  //   submitBtn.text("Create");
  //   // appending
  //   formGroup.append(labelName);
  //   formGroup.append($("<br></br>"));
  //   formGroup.append(inputSongTitle);
  //   formGroup.append(inputGenre);
  //   formGroup.append(textareaLyrics);
  //   formGroup.append(textareaInspiration);
  //   formGroup.append(textareaNotes);

  //   formClass.append(formGroup);
  //   formClass.append(submitBtn);
  //   // appending to page
  //   $("#lyricsBody").append(formClass);
  // };
  const getUserData = () => {
    return $.ajax({
      url: "/api/user_data",
      method: "GET"
    });
  };
  // saving user data.
  const userData = [];
  let idUpdate;

  //Taking from note taker app
  // GET request
  const getLyrics = () => {
    // we need the artist's id
    const id = userData[0].id;

    // turn it into a string to be sent in the url
    return $.ajax({
      url: "/api/lyrics/" + id.toString(),
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

  // Creates the HTML elements for the lyrics.
  const renderLyricList = lyrics => {
    const lyricsBody = $("#lyricsBody");

    // empty the div column
    lyricsBody.empty();

    // forEach to go through making the Card elements
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

      // appending text to their respective places.
      divCardSongTitle.text(lyric.title);
      divCardGenre.text(lyric.genre);
      divCardLyrics.text(lyric.lyrics);
      divCardInsp.text(lyric.inspiration);
      divCardNotes.text(lyric.notes);
      // adding id to the div column
      divCardBg.attr("data-value", lyric.id);

      // append in order, then append to the row where our lyrics boxes will  be displayed "#lyricsBody"
      divCardBody.append(divCardSongTitle);
      divCardBody.append(divCardGenre);
      divCardBody.append(divCardLyrics);
      divCardBody.append(divCardInsp);
      divCardBody.append(divCardNotes);

      divCardBg.append(divCardBody);
      divColSm.append(divCardBg);
      $("#lyricsBody").append(divColSm);
      // handling click event
      handleCardClick(lyric, divCardBg);
    });
  };

  // click event for updating!
  function handleCardClick(lyric, selector) {
    selector.on("click", e => {
      e.preventDefault();
      console.log(lyric);
      $(".newLyrics").addClass("d-none");
      $(".updateLyric").removeClass("d-none");

      $(".updateLyric").children().children(".songTitle").val(lyric.title);
      $(".updateLyric").children().children(".genre").val(lyric.genre);
      $(".updateLyric").children().children("#lyric-input").val(lyric.lyrics);
      $(".updateLyric").children().children("#inspiration-input").val(lyric.inspiration);
      $(".updateLyric").children().children("#notes-input").val(lyric.notes);
      idUpdate = lyric.id;
    });
  }

  // function to clear fields
  const clearForm = selector => {
    selector.children().children(".songTitle").val("");
    selector.children().children(".genre").val("");
    selector.children().children("#lyric-input").val("");
    selector.children().children("#inspiration-input").val("");
    selector.children().children("#notes-input").val("");
  };
  // function to get values from our text boxes
  const createLyricObj = selector => {
    // getting the lyrics and putting them in variable
    const songTitle = selector.children().children(".songTitle")
      .val()
      .trim();
    const genreText = selector.children().children(".genre")
      .val()
      .trim();
    const lyricsText = selector.children().children("#lyric-input")
      .val()
      .trim();
    const inspirationText = selector.children().children("#inspiration-input")
      .val()
      .trim();
    const noteText = selector.children().children("#notes-input")
      .val()
      .trim();

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
  // the function to render lyics lyrics
  const getAndRenderLyrics = () => {
    return getLyrics().then(renderLyricList);
  };

  // ==============================
  // Event listeners
  //
  // CREATING NEW LYRICS
  // for new lyrics, getting and creating it
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
        // location.reload();
        // reset the input values
        clearForm($("newLyric"));
        getAndRenderLyrics();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // update lyrics
  $("#updateLyric").submit(event => {
    event.preventDefault();
    // Storing it to the database
    //
    // First, storing it to an object
    const dataSong = createLyricObj($("#updateLyric"));

    // make POST request
    updateLyrics(idUpdate, dataSong)
      .then(() => {
        console.log("success!");
        // location.reload();
        // reset the input values
        clearForm($("#newLyric"));
        getAndRenderLyrics();
      })
      .catch(err => {
        console.log(err);
      });
  });

  // I FORGOT HOW TO DO CLICK EVENTS SO IM DOING THIS
  // Testing click events
  // $(".card").click(event => {
  //   event.preventDefault();
  //   // logs id of card.
  //   console.log("it works");
  //   const id = $(this);
  //   console.log(id);
  // });

  // CREATING ELEMENTS
  // arrow function notation for the event.
  // this event is to figure out how to create elements using jQuery.
  // $(".newNote").click(event => {
  //   event.preventDefault();
  //   // creating a card to the webpage.
  //   const id = 4;

  //   // Three divs ("col-sm-3", "card bg-warning", and "card-body")
  //   // div col-sm-3
  //   const divColSm = $("<div class='col-sm-3' id='" + id + "'>");

  //   const divCardBg = $("<div class='card bg-secondary'>");

  //   const divCardBody = $("<div class='card-body'>");

  //   const divCardSongTitle = $("<h5 class='card-title'>");
  //   const divCardGenre = $("<h6 class='card-subtitle'>");
  //   const divCardLyrics = $("<p class='card-text'>");

  //   divCardSongTitle.text("Songwriters Lament");
  //   divCardGenre.text("Rock");
  //   divCardLyrics.text(
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo lorem odio. Nam varius fringilla sapien, vitae tempus lectus finibus sed. Nullam sed consectetur eros. Pellentesque iaculis arcu in lacus aliquam, vel egestas nibh volutpat. Duis ullamcorper aliquam augue ac elementum."
  //   );
  //   // append in order, then append to the row where our lyrics boxes will be displayed "#lyricsBody"
  //   divCardBody.append(divCardSongTitle);
  //   divCardBody.append(divCardGenre);
  //   divCardBody.append(divCardLyrics);

  //   divCardBg.append(divCardBody);
  //   divColSm.append(divCardBg);
  //   $("#lyricsBody").append(divColSm);
  // });

  // after everything is initialized, get user_data then use it to get the artists song lyrics
  getUserData().then(result => {
    userData.push(result);
    getAndRenderLyrics();
  });
  // ^^ this fucking line.... this fucking line made me waste 4hrs of my life...
});
