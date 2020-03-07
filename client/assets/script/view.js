function show(segment) {
    $app.hide()
    $err.hide()
    login.$form[0].reset()
    register.$form[0].reset()

    switch (segment) {
        case `register`:
            $register.show()
            break;

        case `login`:
            $login.show()
            break;

        case `list`:
            $list.show()
            getTodo(localStorage.getItem(`Token`))
            break;
    }
}

function fail(err) {
    $err.empty()
    $err.show()

    $err.append(`<div>Code: ${err.status_code}</div>`)

    err.status_message.forEach(i => {
        $err.append(`<div>${i}</div>`)
    })
}