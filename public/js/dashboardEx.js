// to make this work in handlebars, we use a function
//
// Make sure we wait to attach our handlers until the DOM is fully loaded.
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

  // CREATING NEW LYRICS
  // for new lyrics, getting and creating it
  $(".newLyrics").submit(event => {
    event.preventDefault();

    // getting the lyrics and putting them in variable
    let songTitle = $(".songTitle").val().trim();
    let genreText = $(".genre").val().trim();
    let lyricsText = $("#lyric-input").val().trim();

    // Storing it to the database
    //
    // First, storing it to an object
    let dataSong = {
      title: songTitle,
      genre: genreText,
      lyrics: lyricsText
    }
    // make POST request
    $.post("/api/store_lyrics", dataSong)
    .then(() => {
      return console.log("success!");
    })
    .catch(err => {
      console.log(err);
    });

    
    
    const id = 4;
    // Card body.
    // The structure to make the card body. Three divs ("col-sm-3", "card bg-warning", and "card-body")
    // div col-sm-3
    const divColSm = $("<div class='col-sm-3' id='" + id + "'>");
    const divCardBg = $("<div class='card bg-secondary'>");
    const divCardBody = $("<div class='card-body'>");

    // Song Title, Genre, and Lyrics to place text in.
    const divCardSongTitle = $("<h5 class='card-title'>");
    const divCardGenre = $("<h6 class='card-subtitle'>");
    const divCardLyrics = $("<p class='card-text'>");

    // appending text to their respective places.
    divCardSongTitle.text(songTitle);
    divCardGenre.text(genreText);
    divCardLyrics.text(lyricsText);

    // append in order, then append to the row where our lyrics boxes will be displayed "#lyricsBody"
    divCardBody.append(divCardSongTitle);
    divCardBody.append(divCardGenre);
    divCardBody.append(divCardLyrics);

    divCardBg.append(divCardBody);
    divColSm.append(divCardBg);
    $("#lyricsBody").append(divColSm);
    
  });

  // CREATING ELEMENTS
  // arrow function notation for the event.
  // this event is to figure out how to create elements using jQuery.
  $(".newNote").click(event => {
    event.preventDefault();
    // creating a card to the webpage.
    const id = 4;

    // Three divs ("col-sm-3", "card bg-warning", and "card-body")
    // div col-sm-3
    const divColSm = $("<div class='col-sm-3' id='" + id + "'>");

    const divCardBg = $("<div class='card bg-secondary'>");

    const divCardBody = $("<div class='card-body'>");

    const divCardSongTitle = $("<h5 class='card-title'>");
    const divCardGenre = $("<h6 class='card-subtitle'>");
    const divCardLyrics = $("<p class='card-text'>");

    divCardSongTitle.text("Songwriters Lament");
    divCardGenre.text("Rock");
    divCardLyrics.text(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo lorem odio. Nam varius fringilla sapien, vitae tempus lectus finibus sed. Nullam sed consectetur eros. Pellentesque iaculis arcu in lacus aliquam, vel egestas nibh volutpat. Duis ullamcorper aliquam augue ac elementum."
    );
    // append in order, then append to the row where our lyrics boxes will be displayed "#lyricsBody"
    divCardBody.append(divCardSongTitle);
    divCardBody.append(divCardGenre);
    divCardBody.append(divCardLyrics);

    divCardBg.append(divCardBody);
    divColSm.append(divCardBg);
    $("#lyricsBody").append(divColSm);
  });
});


