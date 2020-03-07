'use strict'

$(document).ready(() => {
    refresh();
})

function refresh() {
    if (localStorage.token) {
        $('#logDiv').hide();
        $('#regDiv').hide();
        $('#todoDiv').show();
        // $('#mainPageTitle').html(`Hello ${asd}`);
        getAllTodos();
    } else {
        $('#todoDiv').hide();
        $('#regDiv').hide();
        $('#logDiv').show();
    }
    $('#regForm')[0].reset();
    $('#logForm')[0].reset();
    $('#addTodoForm')[0].reset();
}

$('#logOut').click((event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    signOut();
    $('#todoDiv').hide();
    $('#regDiv').hide();
    $('#logDiv').show();
});

$('#goToRegister').click((event) => {
    event.preventDefault();
    $('#logDiv').hide();
    $('#regDiv').show();
});
$('#goToLogin').click((event) => {
    event.preventDefault();
    $('#regDiv').hide();
    $('#logDiv').show();
});

$('#regForm').submit((event) => {
    event.preventDefault();
    register();
    refresh()
});

$('#logForm').submit((event) => {
    event.preventDefault();
    login();
    refresh();
});

$('#addTodoForm').submit((event) => {
    event.preventDefault();
    addNewTodo();
    refresh()
});
