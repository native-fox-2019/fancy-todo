function reload() {
    $('#todos-data').empty()
    getData()
}

$('#edit-todos').on('submit', (event) => {
    event.preventDefault()
    updateData()
})
// $('#edit-profile').on('click', (event) => {
//     showEditProfile()
// })

$('#register-button').on('click', () => {
    event.preventDefault()
    showRegister()
})

$('#profile-todos').on('click', (event) => {
    showAdd()
})

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
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#edit-profile-page").hide(300)
    $("#login-page").show(300)
}

function showRegister() {
    $("#add-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
    $("#register-page").show(300)
}

function showEdit() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
    $("#edit-page").show(300)
}

function showAdd() {
    $("#add-page").show(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
}

function showMain() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").show(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").hide(300)
    getData()
}

function showEditProfile() {
    $("#add-page").hide(300)
    $("#register-page").hide(300)
    $("#main-page").hide(300)
    $("#edit-page").hide(300)
    $("#login-page").hide(300)
    $("#edit-profile-page").show(300)
}