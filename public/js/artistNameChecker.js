function buildQueryURL() {
  const queryURL = "https://www.theaudiodb.com/api/v1/json/";
  const queryParams = "5d656564694f534d656564";
  const queryMidURL = "/search.php?s=";

  nameOfArtist = $(".api-search")
    .val()
    .trim();

  console.log(queryURL + queryParams + queryMidURL + nameOfArtist);
  return queryURL + queryParams + queryMidURL + nameOfArtist;
}

// Clears the name of the artist that the user typed into the input box
// function clear() {
//   $(".api-search").empty();
// }

// Updates page to display whether the artist name exists or not
// function updatePage(artistData) {
//   clear();
//   console.log("done" + artistData);
// }

// Event listener on the check button to grab the name that was input and put a call out to the API to see if it matches any results
$(".api-button").on("click", event => {
  event.preventDefault();
  // Build the query URL for the ajax request
  const queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response);
    if (response.artists === null) {
      console.log("It's Available");
      $(".notoriginallol").empty();
      $(".results").text("Available!");
    } else {
      console.log("Sorry you ain't original");
      $(".results").empty();
      $(".notoriginallol").text("It's Not Available");
    }
  });
});
