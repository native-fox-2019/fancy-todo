function reload() {
    $('#todos-data').empty()
    getData()
}

$('#edit-todos').on('submit', (event) => {
    event.preventDefault()
    updateData()
})
$('#edit-profile').on('click', (event) => {
    event.preventDefault()
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
    $add.hide()
    $register.hide()
    $main.show()
    $edit.hide()
    $login.hide()
    $profile.hide()
    getData()
} else {
    $("#add-page").hide()
    $register.hide()
    $main.hide()
    $edit.hide()
    $login.show()
    $profile.hide()
}
