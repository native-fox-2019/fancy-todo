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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Google Sign-In Success!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: (err) => {
            Swal.fire({
                icon: `error`,
                title: `Error!`,
                text: `Google Sign-In Failed. Please Try Again.`
            })
        }
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Google Sign-Out Success!',
            showConfirmButton: false,
            timer: 1500
        })
    });
}