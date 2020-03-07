let $main = $('#main-page')
let $todoData = $('#todos-datas')
let $login = $('#login-page')
let $register = $('#register-page')
let $add = $('#add-page')
let $edit = $('#edit-page')

let $loginBtn = $('#login-button')
let $registerBtn = $('#register-button')
let $addBtn = $('#add-button')
let $editBtn = $('#edit-button')

let $backRegister = $('#back-register')
let $backAdd = $('#back-add')
let $backEdit = $('#back-edit')

let reload = $('#reload-button')
let $all = $('#.all')

if(localStorage.token){
    $(document).ready (() => {
        $all.hide()
        showMain()
    })
} else {
    $all.hide()
    showLogin
}
    