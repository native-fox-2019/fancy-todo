$(document).ready(() => {
    if(localStorage.getItem(`Token`)) {
        show(`list`)
    } else {
        show(`login`)
    }

    $btnReg.on(`click`, (event) => {
        event.preventDefault()
        show(`register`)
    })

    $btnLogin.on(`click`, (event) => {
        event.preventDefault()
        show(`login`)
    })

    $btnLogout.on(`click`, (event) => {
        localStorage.removeItem(`Token`)
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

        addTodo({
            title: addList.$title.val(),
            description: addList.$descr.val(),
            due_date: addList.$date.val(),
            status: false
        }, localStorage.getItem(`Token`))

        $err.empty()
        addList.$form[0].reset()
    })
})