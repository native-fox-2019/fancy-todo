$("#login-submit").click(function() {
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    $.ajax("http://localhost:3000/user/login", {
        type: "POST",
        data: {
            email,
            password
        }
    })
    .done(result => {
        localStorage.jwt = result.token;
        switchToLoggedIn();
        showPage("todos");
    })
    .fail(message => console.log(message));
});