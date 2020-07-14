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
  // I FORGOT HOW TO DO CLICK EVENTS SO IM DOING THIS
  // Testing click events
  $(".card").click(function(event) {
    event.preventDefault();
    // logs id of card.
    console.log($(this).attr("id"));
    // text info inside card
    console.log(
      $(this)
        .text()
        .trim()
    );
  });

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

      // append in order, then append to the row where our lyrics boxes will  be displayed "#lyricsBody"
      divCardBody.append(divCardSongTitle);
      divCardBody.append(divCardGenre);
      divCardBody.append(divCardLyrics);
      divCardBody.append(divCardInsp);
      divCardBody.append(divCardNotes);

      divCardBg.append(divCardBody);
      divColSm.append(divCardBg);
      $("#lyricsBody").append(divColSm);
    });
  };

  // the method to render lyics lyrics
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

    // getting the lyrics and putting them in variable
    const songTitle = $(".songTitle").val().trim();
    const genreText = $(".genre").val().trim();
    const lyricsText = $("#lyric-input").val().trim();
    const inspirationText = $("#inspiration-input").val().trim();
    const noteText = $("#notes-input").val().trim();

    // Storing it to the database
    //
    // First, storing it to an object
    const dataSong = {
      title: songTitle,
      genre: genreText,
      lyrics: lyricsText,
      inspiration: inspirationText,
      notes: noteText,
      ArtistId: userData[0].id
    };

    // make POST request
    $.post("/api/lyrics", dataSong)
      .then(() => {
        console.log("success!");
        // location.reload();
        // reset the input values
        $(".songTitle").val("");
        $(".genre").val("");
        $("#lyric-input").val("");
        $("#inspiration-input").val("");
        $("#notes-input").val("");
        getAndRenderLyrics();
      })
      .catch(err => {
        console.log(err);
      });
  });

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
