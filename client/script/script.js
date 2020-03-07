function reload() {
    $('#todos-data').empty()
    getData()
}

$('#edit-todos').on('submit', (event) => {
    event.preventDefault()
    updateData()
})

$('#register-button').on('click', () => {
    event.preventDefault()
    showRegister()
})

// $('#add-todos').on('click', (event) => {
//     showAdd()
// })

if (localStorage.getItem('token')) {
    showMain()
} else {
    showLogin()
}
$('#login').on('submit', () => {
    if (localStorage.token) {
        showMain()
    } else {
        showLogin()
    }
})

function showLogin() {
    $("#add-page").hide()
    $("#register-page").hide()
    $("#main-page").hide()
    $("#edit-page").hide()
    $("#login-page").show()
}
function showRegister() {
    $("#add-page").hide()
    $("#register-page").show()
    $("#main-page").hide()
    $("#edit-page").hide()
    $("#login-page").hide()
}

function showEdit() {
    $("#add-page").hide()
    $("#register-page").hide()
    $("#main-page").hide()
    $("#edit-page").show()
    $("#login-page").hide()
}

function showAdd() {
    $("#add-page").show()
    $("#register-page").hide()
    $("#main-page").hide()
    $("#edit-page").hide()
    $("#login-page").hide()
}

function showMain() {
    $("#add-page").hide()
    $("#register-page").hide()
    $("#main-page").show()
    $("#edit-page").hide()
    $("#login-page").hide()
    getData()
}