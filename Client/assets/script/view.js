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