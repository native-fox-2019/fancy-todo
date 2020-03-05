function show(segment) {
    $app.hide()

    switch (segment) {
        case `register`:
            $register.show()
            break;

        case `login`:
            $login.show()
            break;

        case `list`:
            $list.show()
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