'use strict'

function refresh() {
    if (localStorage.token) {
        $('#logDiv').hide();
        $('#regDiv').hide();
        $('#todoDiv').show();
        getAllTodos();
    } else {
        $('#todoDiv').hide();
        $('#regDiv').hide();
        $('#logDiv').show();
    }
    // $('form').reset();
}

$(document).ready(()=>{
    refresh();
})

$('#logOut').click(()=>{
    localStorage.removeItem('token');
    $('#todoDiv').hide();
    $('#regDiv').hide();
    $('#logDiv').show();
});

$('#goToRegister').click(()=>{
    $('#logDiv').hide();
    $('#regDiv').show();
});
$('#goToLogin').click(()=>{
    $('#regDiv').hide();
    $('#logDiv').show();
});

$('#regForm').submit((event)=>{
    register(event);
    $('#regForm')[0].reset();
});

$('#logForm').submit((event)=>{
    login(event);
    $('#logForm')[0].reset();
});

$('#addTodoForm').submit((event)=>{
    addNewTodo(event);
    $('#addTodoForm')[0].reset();
});
