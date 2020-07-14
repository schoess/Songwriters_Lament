$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const nameInput = $("input#username-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      artistName: nameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.artistName || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.artistName, userData.password);
    nameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(artistName, password) {
    $.post("/api/signup", {
      artistName: artistName,
      password: password
    })
      .then(res => {
        console.log(res);
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
  // User clicks register button; transfer control to register page
  function redirectToLogin() {
    window.location.href = "/login";
  }
  $("#loginButton").on("click", redirectToLogin);
});
