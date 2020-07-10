// to make this work in handlebars, we use a function
//
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
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
  // arrow function notation for the event.
  // this event is to figure out how to create elements using jQuery.
  $(".card").click(event => {
    event.preventDefault();
    // creating a card to the webpage.
    const id = 4;

    // Three divs ("col-sm-3", "card bg-warning", and "card-body")
    // div col-sm-3
    const divColSm = $("<div class='col-sm-3' id='" + id + "'>");

    const divCardBg = $("<div class='card bg-secondary'>");

    const divCardBody = $("<div class='card-body'>");

    divCardBody.text(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo lorem odio. Nam varius fringilla sapien, vitae tempus lectus finibus sed. Nullam sed consectetur eros. Pellentesque iaculis arcu in lacus aliquam, vel egestas nibh volutpat. Duis ullamcorper aliquam augue ac elementum."
    );
    // append in order, then append to the row where our lyrics boxes will be displayed "#lyricsBody"
    divCardBg.append(divCardBody);
    divColSm.append(divCardBg);
    $("#lyricsBody").append(divColSm);
  });
});
