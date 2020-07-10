$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const usernameInput = $("input#username-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    // console.log(usernameInput.val().trim());
    event.preventDefault();
    const userData = {
      username: usernameInput.val().trim()
    };

    if (!userData.username) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username);
    usernameInput.val("");
  });
  // loginUser does a post to our "api/signup" route and if successful, redirects us the the members page
  function loginUser(username) {
    $.post("/api/signup", {
      artistName: username
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
