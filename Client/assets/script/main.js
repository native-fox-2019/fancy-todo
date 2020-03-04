import { showAll } from "../../../Server/controllers/todoController"

let $buttonLogin = $(`#btn-login`)
let $buttonRegister = $(`#btn-register`)
let $buttonLogout = $(`#btn-logout`)
let $buttonDelete = $(`#btn-delete`)
let $buttonList = $(`#btn-list`)

let $loginEmail = $(`#email-login`)
let $loginPassword = $(`#password-login`)

let $registerEmail = $(`#email-register`)
let $registerPassword = $(`#password-register`)

let $title = $('#title')
let $description = $('#description')
let $date = $('#date')

let $addTitle = $('#add-title')
let $addDescription = $('#add-description')
let $addDate = $('#add-date')

let $editTitle = $('#edit-title')
let $editDescription = $('#edit-description')
let $editDate = $('#edit-date')

let $app = $('.app')
let $register = $('#register')
let $login = $('#login')
let $add = $('#add')
let $list = $('#list')

show('list')

$buttonRegister.on('click', (event)=>{
    event.preventDefault()
    show('register')
})

$buttonLogin.on('click', (event) =>{
    event.preventDefault()
    show('login')
})