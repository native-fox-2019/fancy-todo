function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/googleSignIn',
        data: { token: id_token },
        success: (gToken) => {
            console.log('google sign-in success!');
            localStorage.setItem('token', gToken.token);
            refresh();
        },
        error: (err) => {
            console.log('google sign-in fail!\n',err.responseText);
        }
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('google sign-out success!');
    });
}