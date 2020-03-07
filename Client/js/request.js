function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    delete localStorage.jwt;
    switchToLoggedOut();
    showPage("login");
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/user/googlelogin`,
        data: {
            token: id_token
        }
    })
    .done(result => {
        localStorage.jwt = result.token;
        switchToLoggedInWithGoogle();
        showPage("todos");
    })
    .fail(message => console.log(message));
}