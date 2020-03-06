$(document).ready(function(){
    if(localStorage.getItem(`token`)) {
        $(`#todos`).show()
        listShow()
    } else {
        $(`#login`).show()
    }
})

$(`#btn-login`).click(function(){
    $(`#register`).hide()
    $(`#login`).show()
})

$(`#btn-register`).click(function(){
    $(`#login`).hide()
    $(`#register`).show()
})

$(`#btn-cancel-add`).click(function(){
    $(`#add`).hide()
    $(`#todos`).show()
})

$(`#btn-cancel-edit`).click(function(){
    $(`#edit`).hide()
    $(`#todos`).show()
})

$(`#btn-todo`).click(function(){
    $(`#todos`).hide()
    $(`#add`).show()
})

$(`#btn-logout`).click(function(){
    localStorage.removeItem("token")
    $(`#login-form`)[0].reset()
    $(`#todos`).hide()
    $(`#login`).show()
})