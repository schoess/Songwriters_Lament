$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.artistName);
    console.log(data.id, data.artistName);

    // Now get songs in db form artist
    $.post("/api/" + data.id, songs => {
      console.log("song query", songs);
      $(".songTable").text("got songs");
    });
  });
});
