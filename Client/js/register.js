$("#register-submit").click(function() {
    const email = $("#register-email").val();
    const password = $("#register-password").val();
    $.ajax("http://localhost:3000/users/register", {
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
    .fail(message => console.log(message, "masiukakk"));
});

$("#register-generate").click(function () {
    $("#register-passwords").html("");
    $.ajax("http://localhost:3000/passwordWolf/generate", {
        type: "GET"
    })
    .done(result => {
        let html = "<p>Random passwords:</p><ul>";
        for (let i = 0; i < result.length; i++) {
            const password = result[i].password;
            html += "<li>" + password + "</li>";
        }
        html += "</ul>";
        $("#register-passwords").html(html);
    })
    .fail(message => console.log(message));
});