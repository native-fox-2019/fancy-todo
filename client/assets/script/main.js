$(document).ready(() => {

    // checks whether user has logged in
    if (localStorage.getItem(`Token`)) {
        show(`list`)
    } else {
        show(`login`)
    }

    $btnReg.on(`click`, (event) => {
        $table.empty()
        event.preventDefault()
        show(`register`)
    })

    $btnLogin.on(`click`, (event) => {
        $table.empty()
        event.preventDefault()
        show(`login`)
    })

    $btnLogout.on(`click`, (event) => {
        $table.empty()
        localStorage.removeItem(`Token`)

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.')
        })

        show(`login`)
    })

    register.$form.on(`submit`, (event) => {
        event.preventDefault()

        registerSubmit({
            email: register.$email.val(),
            password: register.$pass.val()
        })

        register.$email.empty()
        register.$pass.empty()
    })

    login.$form.on(`submit`, (event) => {
        event.preventDefault()

        loginSubmit({
            email: login.$email.val(),
            password: login.$pass.val()
        })

        $err.empty()
        login.$form[0].reset()
    })

    addList.$form.on(`submit`, (event) => {
        event.preventDefault()
        addList.$modal.modal(`toggle`)

        addTodo({
            title: addList.$title.val(),
            description: addList.$descr.val(),
            due_date: addList.$date.val(),
            status: false
        }, localStorage.getItem(`Token`))

        $err.empty()
        addList.$form[0].reset()
    })

    edit.$form.on(`submit`, (event) => {
        event.preventDefault()
        edit.$modal.modal(`toggle`)

        editTodo({
            id: entry.id,
            title: edit.$title.val(),
            description: edit.$descr.val(),
            status: entry.status,
            due_date: edit.$date.val()
        }, localStorage.getItem(`Token`))
    })
})