"use strict"

const baseURL = 'http://localhost:3000'

$(document).ready(function () {

    // if (!localStorage.getItem('token')) {
    //     console.log('Not logged in yet!')
    //     $('#main-page').hide()
    //     $("#landingPage").show()
    // } else {
    //     console.log('Already logged in!')
    //     showMainPage()
    // }
    refresh()
});

//=========== PARAMETER AREA =========//
let username = $("#username")
let email = $("#email")
let password = $("#password")
let emailLogin = $("#emailLogin")
let passwordLogin = $("#passwordLogin")

//=========== BUTTON AREA ======//

$("#button-login-landingpage-submit").on("click",function(){
    $("#landingPage").hide()
    $("#loginForm").show()
})

$("#button-register-landingpage-submit").on("click",function(){
    $("#landingPage").hide()
    $("#registerForm").show()
})

$("#button-register-loginform-submit").on("click",function(){
    $("#landingPage").hide()
    $("#loginForm").hide()
    $("#registerForm").show()
})

$("#logout-button").on("click", function(event){
    localStorage.removeItem('token')
    refresh()
})

$("#login-form").on("submit", function(event){
    event.preventDefault()
    login()
})

$("#register-form").on("submit",function(event){
    event.preventDefault()
    register()
    $("#landingPage").hide()
    $("#registerForm").hide()
    $("#loginForm").show()
})

$('.pageContainer').on("click", "#back-button", function(event){
    event.preventDefault()
    refresh()
})

$("#add-task-button").on("click", function(event){
    event.preventDefault()
    $("#main-page").hide()
    $("#addTaskPage").show()
})

$('#addTaskForm').on('submit', function(event) {
    event.preventDefault();
    addNewTask()
    refresh()
})

$('#editTaskForm').on('submit',(event) => {
    event.preventDefault()
    editTask()
    refresh()
})

//=========== FUNCTION AREA ==========//

function refresh() {
    if (!localStorage.getItem('token')) {
        console.log('Not logged in yet!')
        $('#main-page').hide()
        $("#addTaskPage").hide()
        $("#landingPage").show()
    } else {
        console.log('Already logged in!')
        showMainPage()
    }
}

function register(){
    $.ajax({
        url : "http://localhost:3000/user/register",
        method : "post",
        contentType  : "application/json",
        data : JSON.stringify({
            username : username.val(),
            email : email.val(),
            password : password.val()
        })
    })
    .done(function(data){
        console.log(data)
    })
    .fail(function(jqxhr,status,error){
        console.log(jqxhr.responseJSON)
    })
    .always(function(){

    })
}

function login(){
    $.ajax({
        url: "http://localhost:3000/user/login",
        method : "post",
        contentType : "application/json",
        data : JSON.stringify({
        email : emailLogin.val(),
        password : passwordLogin.val()
        })
    })
    .done(function(data){
        console.log(data)
        localStorage.setItem('token', data.token)
        refresh()
    })
    .fail(function(jqxhr,status,error){
        console.log(error)
    })
    .always(function(data){

    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : "http://localhost:3000/user/googleLogin",
        method : "post",
        data : { token: id_token }
    })
    .done(function(data){
        localStorage.setItem('token',data.token)
        refresh()
    })
    .fail(function(error){
        console.log('token fail :',error)
    })
    .always(function(data){

    })

  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
function showMainPage() {
    $("#loginForm").hide()
    $("#registerForm").hide()
    $("#addTaskPage").hide()
    $("#editTaskPage").hide()
    $("#landingPage").hide()
    $('#translatePage').hide()
    $('#randomTaskPage').hide()
    $('#taskId').hide()
    getAllTasks()
    $('#main-page').show()
}
