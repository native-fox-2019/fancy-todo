function reload() {
    $('#todos-data').empty()
    getData()
}

$('#edit-todos').on('submit', (event) => {
    event.preventDefault()
    updateData()
})
$('#edit-profile').on('click', (event) => {
    showEditProfile()
})

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
