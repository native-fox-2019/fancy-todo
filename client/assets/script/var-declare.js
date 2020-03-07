// login / register / logout
var $btnLogin = $(`#btn-login`) // button to show login form
var $btnReg = $(`#btn-register`) // button to show register form
var $btnLogout = $(`#btn-logout`) // button to log out

// forms
// login form
var login = {
    $form: $(`#loginForm`),
    $email: $(`#login-email`),
    $pass: $(`#login-password`)
}

// register form
var register = {
    $form: $(`#regForm`),
    $email: $(`#reg-email`),
    $pass: $(`#reg-password`)
}

// add form
var addList = {
    $form: $(`#add-list`),
    $title: $(`#add-list #title`),
    $descr: $(`#add-list #description`),
    $date: $(`#add-list #date`),
    $modal: $(`#md-add`)
}

// edit form
var edit = {
    $form: $(`#editTodo`),
    $title: $(`#edit-title`),
    $descr: $(`#edit-description`),
    $date: $(`#edit-date`),
    $modal: $(`#md-edit`)
}

// view
var $app = $(`.app`) // used to hide all (client will have a blank page)
var $register = $(`#register`) // register form div
var $login = $(`#login`) // login form div
var $list = $(`#list`) // shows todo div

// Others
var $err = $(`.errMsg`) // the part where error messages shows up
var $table = $(`#todo-list > tbody`) // the body of the table to show entries
var $tableList = $(`#todo-list > tbody:last-child`) // currently not used (remove if still not used)
var entry // entry data for edit form