function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/googleSignIn',
        data: { token: id_token },
        success: (gToken) => {
            console.log(gToken);
            localStorage.setItem('token', gToken);
            refresh();
        },
        error: (err) => {
            console.log('gToken fail :',err);
        }
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}