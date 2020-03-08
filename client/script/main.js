$(document).ready(function(){
    if(localStorage.getItem(`token`)) {
        $(`#error`).empty()
        $(`#todos`).show()
        listShow()
        weather()
    } else {
        $(`#error`).empty()
        $(`#login`).show()
    }
})

$(`#btn-login`).click(function(){
    $(`#error`).empty()
    $(`#register`).hide()
    $(`#login`).show()
})

$(`#btn-register`).click(function(){
    $(`#error`).empty()
    $(`#login`).hide()
    $(`#register`).show()
})

$(`#btn-cancel-add`).click(function(){
    $(`#error`).empty()
    $(`#add`).hide()
    $(`#todos`).show()
})

$(`#btn-cancel-edit`).click(function(){
    $(`#error`).empty()
    $(`#edit`).hide()
    $(`#todos`).show()
})

$(`#btn-todo`).click(function(){
    $(`#error`).empty()
    $(`#todos`).hide()
    $(`#add`).show()
})

$(`#btn-logout`).click(function(){
    localStorage.removeItem("token")
    $(`#error`).empty()
    $('#list-todos').empty()
    $(`#login-form`)[0].reset()
    $(`#todos`).hide()
    $(`#login`).show()
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
})

$(`#btn-news`).click(function(){
    $(`#error`).empty()
    $(`#todos`).hide()
    $(`#news-page`).show()
    news()
})

$(`#btn-news-out`).click(function(){
    $(`#error`).empty()
    $(`#news`).empty()
    $(`#news-page`).hide()
    $(`#todos`).show()
})

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   }

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token+"<<<token google")
    $.ajax({
        type:"POST",
        url:"http://localhost:3000/user/googlelogin",
        data:{
            id_token
        },
        success:function(response ){
            console.log(response)
            localStorage.setItem("token",response.token)
            $(`#login`).hide()
            $(`#todos`).show()
            listShow()
        }
    })
  }