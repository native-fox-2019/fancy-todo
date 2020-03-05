// login / register / logout
var $btnLogin = $(`#btn-login`)
var $btnReg = $(`#btn-register`)
var $btnLogout = $(`#btn-logout`)

// forms
var login = {
    $form: $(`#loginForm`),
    $email: $(`#login-email`),
    $pass: $(`#login-password`)
}

var register = {
    $form: $(`#regForm`),
    $email: $(`#reg-email`),
    $pass: $(`#reg-password`)
}

var addList = {
    $form: $(`add-list`),
    $title: $(`#add-list #title`),
    $descr: $(`#add-list #description`),
    $date: $(`#add-list #date`)
}

// view
var $app = $(`.app`)
var $register = $(`#register`)
var $login = $(`#login`)
var $list = $(`#list`)

// Others
var $err = $(`.errMsg`)
var $table = $(`#todo-list`)